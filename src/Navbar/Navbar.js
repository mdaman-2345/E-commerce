import React ,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
const Navbar = () => {

    const isloggedin=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();

   const signout=()=>{
          dispatch({
            type:"LOGOUT",
          })
          navigate('/login');
   }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">E-commerce</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <Link to='/product'><li className="nav-item nav-link"> Product</li></Link>
          <Link to='/'><li className="nav-item nav-link">Signup </li></Link>
          {!isloggedin ? 
         <Link to='/login'> <li className="nav-item nav-link">Signin </li></Link>
          : 
          <li className="nav-item nav-link" onClick={signout}>Signout </li>
          }
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar