import React from "react";
import "../../style/Profile.css";
import Post from "../../components/Post.jsx"

import { Link } from "react-router";

import { IoMdArrowBack } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

const Profile = () => {
  const links = ["posts", "comments", "likes"];

  return (
    <div className="main-body">
      <div className="mid-page">
        <div className="user-details-nd-imgs">
          <div className="top-bar">
            <button className="back-btn">
              <IoMdArrowBack />
            </button>
            <div className="userName-postCount">
              <h4 className="fullname">Anuradha Satsangi</h4>
              <div className="post-count dim-gray-text">48 posts</div>
            </div>
          </div>
          <div className="imgs-nd-editBtn">
            <div className="cover">
              <img
                className="cover-img"
                src="/images/girl_dummy.jpg"
                alt="cover"
              />
            </div>
            <div className="profile-nd-editBtn">
              <div className="profile">
                <img
                  className="profile-pic"
                  src="/images/girl_two.jpg"
                  alt="profile  "
                />
              </div>
              <button className="edit-btn">Edit Profile</button>
            </div>
          </div>
          <div className="text-details">
            <div className="user-details">
              <div className="fullname">Anuradha Satsangi</div>
              <div className="username dim-gray-text">@Anuradhasatsangi</div>
            </div>
            <div className="bio">#Explorer #Patriotic</div>
            <div className="location-nd-joinDate dim-gray-text">
              <div className="location">
                <IoLocationOutline />
                <p>Bharat</p>
              </div>
              <div className="join-date ">joined september 2017</div>
            </div>
            <div className="following-nd-follower">
              <div className="following-profile">
                <span>43 </span>
                <span className="dim-gray-text">following</span>
              </div>
              <div className="follower-profile">
                <span>980k </span>
                <span className="dim-gray-text">follower</span>
              </div>
            </div>
          </div>
        </div>
        <div className="posts-comments-likes">
          {/* <Link className="link dim-gray-text">
            <div className="link-name">Posts</div>
          </Link> */}
          {links.map((link, index) => {
            return (
              <Link key={index} className="link dim-gray-text">
                <div className="link-name">{link}</div>
              </Link>
            );
          })}
        </div>
        <div className="posts">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      <div className="right-page">right page</div>
    </div>
  );
};

export default Profile;
