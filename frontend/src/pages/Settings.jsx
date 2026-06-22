import React from "react";
import "../style/Setting.css";

import { Link } from "react-router";

import { GrNext } from "react-icons/gr";

const Settings = () => {


  return (
    <div className="main-body">
      {" "}
      {/* miscellaneous.css */}
      <div className="setting-container">
        <Link className="setting-link">
          <div className="setting-box">
            <div className="setting-link-name">Change Password</div>
            <GrNext />
          </div>
        </Link>
        <Link className="setting-link">
          <div className="setting-box">
            <div className="setting-link-name">Delete Account</div>
            <GrNext />
          </div>
        </Link>
        <Link className="setting-link">
          <div className="setting-box">
            <div className="setting-link-name">Change Email</div>
            <GrNext />
          </div>
        </Link>
        <Link className="setting-link">
          <div className="setting-box">
            <div className="setting-link-name">Change Username</div>
            <GrNext />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
