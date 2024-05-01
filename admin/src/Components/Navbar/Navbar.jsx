import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/img/web3.png";
import navprofileIcon from "../../assets/img/subhro.jpeg";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} className="nav-logo" alt="" />
      <img src={navprofileIcon} className="nav-profile" alt="" />
    </div>
  );
};

export default Navbar;
