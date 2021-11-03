import React from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Help from "@material-ui/icons/HelpOutline";
import AccountIcon from "@material-ui/icons/AccountCircle";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <div className="navbar" id="navbar">
        <a href="#default" className="logo" id="logo">
          Logo
        </a>
        <div className="navbar-rt" id="navbar-rt">
          <a href="#home" className="active">
            Home
          </a>
          <a href="#settings">
            <SettingsIcon />
          </a>
          <a href="#account">
            <AccountIcon />
          </a>
          <a href="#help">
            <Help />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
