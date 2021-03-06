import React, {Fragment, useState} from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut, deleteAccount } from '../actions/authActions'
import { Form, FormControl} from 'react-bootstrap'
import logo from '../img/logo.png'

const Navbar = ({auth, signOut, deleteAccount, history}) => {
  let [name, setName]= useState('')

  let authNav = (
    <ul className="navbar-nav">
      <li className="nav-item px-2">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item px-2">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className="nav-item px-2">
        <Link className="nav-link" to="/register">Register</Link>
      </li>
    </ul>
  )
  
  let dashboardNav = (
    <ul className="navbar-nav">
      <li className="nav-item px-2">
        <Link className="nav-link" to="/createPost"><i className="fas fa-edit hide-md"/> Create Post</Link>
      </li>
      <li className="nav-item px-2">
        <Link className="nav-link" to="/dashboard"><i className="fas fa-scroll hide-md"/> Feed</Link>
      </li>
      <li className="nav-item dropdown">
        <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Hi {auth.user && auth.user.name.split(' ')[0]}
        </div>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/myprofile">My Profile</Link>
          <button className="dropdown-item" type="button" onClick={()=> auth.user && deleteAccount(auth.user._id)}>Delete Account</button>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" type="button" onClick={signOut}>Sign out</button>
        </div>
      </li>
    </ul>
  )

  return (
    <nav className="navbar fixed-top-md navbar-expand-md navbar-dark p-1 " style={{background: '#026170', color: "white"}}>
      <Link className="navbar-brand p-0" to="/"><img src={logo} alt='logo'/></Link>
      <button className="navbar-toggler-right navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarId" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarId" >
        <Form onSubmit={(e)=> e.preventDefault()} inline className="mx-auto">
          <FormControl 
            type="text" 
            placeholder="Search for members.." 
            name={name} 
            value={name} 
            onChange={(e)=> setName(e.target.value)}
            className="mr-sm-2"
            onKeyUp={e=> {
              if(e.keyCode ===13) {
                history.push('/profiles', {name: name})
                setName('')
              }
            }}
          />
        </Form>
        {auth.isLoading 
          ? null
          : (
          <Fragment>
            {auth.isAuthenticated ? dashboardNav : authNav}
          </Fragment>)
        }
      </div>
    </nav>
  )
}

const mapStateToProps = (state)=> ({auth: state.auth})

export default connect(mapStateToProps, {signOut, deleteAccount})(withRouter(Navbar))