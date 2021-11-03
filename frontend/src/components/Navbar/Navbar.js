import React from "react";
import Help from "@material-ui/icons/HelpOutline";
import "./Navbar.css";

const Navbar = () => {
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
