import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <>
    <header className="header">
       
      <ul>
      <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Register</Link>
        </li>
        <li>
          <Link to="/forgotpassword">Forgot Password</Link>
        </li>
        <li>
          <Link to="/editform">Edit Form</Link>
        </li>
      </ul>
     
    </header>
  
    </>
  );
}

export default Header;