import React from "react";
import { Link } from "react-router";

import MiddlePage from "../components/MiddlePage.jsx";
import RightPage from "../components/RightPage.jsx";
import "../style/Notification.css";

const Notification = () => {
  return (
    <div className="main-body">
      <div className="main">
        <div className="mid-page">
          <div className="your-notifications">Your Notifications</div>
          <div className="notifications">
            <div className="notification">
              <div className="notification-left-part">
                <img
                  className="profile-pic"
                  src="./images/girl_dummy.jpg"
                  alt="profile-pic"
                />
              </div>
              <div className="notification-right-part">
                <div className="notification-details">
                  <Link className="username">Vikash</Link>
                  <p>has liked your post</p>
                </div>
                <div className="time-stamp">4h</div>
              </div>
            </div>
            <div className="notification">
              <div className="notification-left-part">
                <img
                  className="profile-pic"
                  src="./images/girl_dummy.jpg"
                  alt="profile-pic"
                />
              </div>
              <div className="notification-right-part">
                <div className="notification-details">
                  <Link className="username">Vikash</Link>
                  <p>has liked your post</p>
                </div>
                <div className="time-stamp">4h</div>
              </div>
            </div>
            <div className="notification">
              <div className="notification-left-part">
                <img
                  className="profile-pic"
                  src="./images/girl_dummy.jpg"
                  alt="profile-pic"
                />
              </div>
              <div className="notification-right-part">
                <div className="notification-details">
                  <Link className="username">Vikash</Link>
                  <p>has liked your post</p>
                </div>
                <div className="time-stamp">4h</div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-page"></div>
      </div>
    </div>
  );
};

export default Notification;
