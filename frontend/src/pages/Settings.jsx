import React from "react";
import "../style/Setting.css";

import { Link } from "react-router";

import { GrNext } from "react-icons/gr";

const Settings = () => {


  return (
    <div className="main-body">
      {" "}
      {/* miscellaneous.css */}
      <div className="setting-mid-page">
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
      <div className="setting-right-page">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus odio neque enim expedita optio, fugiat modi beatae cum ab voluptate. Porro hic reiciendis velit maiores voluptates vero ut quia quasi ullam, vel ex adipisci quisquam provident optio harum illo repellendus inventore ad doloribus earum at commodi beatae magni. Repellendus voluptate rerum vel qui. Hic repudiandae obcaecati, non molestiae, quasi, ipsa tempore doloribus quidem esse dolorem adipisci nesciunt nam earum autem sapiente vitae possimus iusto quae cum? Officia natus sunt blanditiis, quam molestias ad placeat quos. Saepe voluptatibus dignissimos eligendi quod repudiandae deleniti corporis cum cupiditate ad! Sequi incidunt ullam quas voluptatem praesentium asperiores. Voluptas laboriosam repellendus dolorem commodi modi, quis ipsum placeat, iste pariatur ad, nihil molestias amet! Quas ea aliquam dolor molestias.
      </div>
    </div>
  );
};

export default Settings;
