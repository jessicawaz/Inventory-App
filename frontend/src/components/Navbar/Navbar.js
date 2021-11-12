import React, { useState } from "react";
import Help from "@material-ui/icons/HelpOutline";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState("");

  axios
    .get("http://localhost:5000/user", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
    .then(() => {
      setUser(true);
    });

  return (
    <div>
      <div className="navbar" id="navbar">
        <a href="/home" className="logo" id="logo">
          Logo
        </a>
        <div className="navbar-rt" id="navbar-rt">
          <a href="/home" className="active">
            Home
          </a>

          <a href="/help">
            <Help />
          </a>

          {user ? (
            <span>
              {/* <h6>Welcome back, {user.name}!</h6> */}
              <a href="/logout">Log Out</a>
            </span>
          ) : (
            <span>
              <a href="/login">Log In</a>

              <a href="/register">Register</a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
