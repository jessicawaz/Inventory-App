import React, { useState } from "react";
import Help from "@material-ui/icons/HelpOutline";
import axios from "axios";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [userAuth, setUserAuth] = useState(false);
  const [user, setUser] = useState("");

  axios
    .get("http://localhost:5000/user", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      setUser(localStorage.getItem("user"));
      setUserAuth(true);
    });

  const logOut = () => {
    localStorage.clear();
    setUserAuth(false);
  };

  return (
    <div>
      <div className="navbar" id="navbar">
        <a href="/home" className="logo" id="logo">
          Logo
        </a>

        <div className="navbar-rt" id="navbar-rt">
          <a href="/home" className="btn btn-outline-primary">
            Home
          </a>

          {userAuth ? (
            <a
              href="/home"
              className="btn btn-outline-secondary"
              onClick={logOut}
            >
              Log Out
            </a>
          ) : (
            // <a href="/home">Log Out {user}</a>
            <span>
              <a className="btn btn-outline-secondary" href="/login">
                Log In
              </a>

              <a className="btn btn-outline-secondary" href="/register">
                Register
              </a>
            </span>
          )}

          <a href="/help">
            <Help />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
