import React, { useState, useEffect } from "react";
import "../style/Navbar.css";

import { NavLink } from "react-router";

import { useUser } from "../../contexts/AuthProvider.jsx";
import Logout from "../pages/buttons/Logout.jsx";

import { MdHome } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";

const Navbar = () => {
  const handleIsActive = (e) => {
    return e.isActive ? "bold" : "";
  };

  const { user } = useUser();

  return (
    <nav>
      <ul>
        <li>
          <NavLink className={handleIsActive} to={"/home"}>
            <div className="nav-btn">
              <MdHome className="icon" />
              <h6 className="tag-name">Home</h6>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink className={handleIsActive} to={"/notifications"}>
            <div className="nav-btn">
              <IoMdNotifications className="icon" />
              <h6 className="tag-name">Notifications</h6>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink className={handleIsActive} to={"/settings"}>
            <div className="nav-btn">
              <IoMdSettings className="icon" />
              <h6 className="tag-name">Settings</h6>
            </div>
          </NavLink>
        </li>
      </ul>

      <div className="bottom-nav">
        <NavLink className={handleIsActive} to={"/logout"}>
          <div className="nav-btn">
            <RiLogoutBoxFill className="icon" />
            <h6 className="tag-name">
              <Logout />
            </h6>
          </div>
        </NavLink>
        <NavLink className={`${handleIsActive} nav-profile-link`} to={"/profile"}>
          <div className="nav-btn nav-profile-btn">
            <div className="nav-profile-btn-img">
              <img src="/images/mufasa.jpg" alt="profile-pic" />
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
