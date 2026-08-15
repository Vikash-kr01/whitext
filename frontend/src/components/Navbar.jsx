import React, { useState, useEffect } from "react";
import "../style/Navbar.css";

import { NavLink, useNavigate } from "react-router";

import { useUser } from "../../contexts/AuthProvider.jsx";

import { MdHome } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";


const Navbar = () => {

  const handleNavClasses = (baseClass="") => ({isActive}) => {
    return `${baseClass} ${isActive ? "bold": ""}`
  }

  const { user } = useUser();

  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li>
          <NavLink className={handleNavClasses("navbar-btn")} to={"/home"}>
            <div className="nav-btn">
              <MdHome className="icon" />
              <h6 className="tag-name">Home</h6>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink className={handleNavClasses("navbar-btn")} to={"/notifications"}>
            <div className="nav-btn">
              <IoMdNotifications className="icon" />
              <h6 className="tag-name">Notifications</h6>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink className={handleNavClasses("navbar-btn")} to={"/settings"}>
            <div className="nav-btn">
              <IoMdSettings className="icon" />
              <h6 className="tag-name">Settings</h6>
            </div>
          </NavLink>
        </li>
      </ul>

      <div className="bottom-nav">
        <button className={"navbar-btn logoutBtn"} onClick={()=>navigate("/logout")}>
          <div className="nav-btn">
            <RiLogoutBoxFill className="icon" />
            <h6 className="tag-name">
              logout
            </h6>
          </div>
        </button>
        <NavLink className={handleNavClasses("nav-profile-link navbar-btn")} to={`/profile/${user?.username}`}>
          <div className="nav-btn nav-profile-btn">
            <div className="nav-profile-btn-img">
              <img src={user?.profilePicture} alt="profile-pic" />
            </div>
            <div className="name-username">
              <h4 className="name">{user?.fullName}</h4>
              <h4 className="username">@{user?.username}</h4>
            </div>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
