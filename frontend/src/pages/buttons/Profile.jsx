import React, { useEffect, useState } from "react";
import "../../style/Profile.css";
import Post from "../../components/Post.jsx";
import Spinner from "../../components/Spinner.jsx";

import { Link, useParams } from "react-router";

import { IoMdArrowBack } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

const Profile = () => {

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const { username } = useParams();

  console.log(username)

  useEffect(() => {
    (async function () {
      try {
        const data = await fetch(`/app/api/v1/user/user-details/${username}`, {
          method: "get",
          credentials: "include"
        })

        if (!data.ok) throw new Error("Can't able to fetch user from backend")

        const result = await data.json();

        console.log(result)

        setUser(result.data)

      } catch (error) {
        console.error(`ERROR: while fethcing user for profile page: ${error.message}`)
      } finally {
        setLoading(false)
      }
    })()
  }, [username])

  function convertMonth(time) {
    let months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const strTime = time.toString();
    const dateInArray = strTime.split("T")[0].split("-")
    const year = dateInArray[0]
    const month = Number(dateInArray[1])

    return `${months[month - 1]} ${year}`
  }


  const links = ["posts", "comments", "likes"];

  if (loading) return <Spinner />

  return (
    <div className="main-body">
      <div className="mid-page">
        <div className="user-details-nd-imgs">
          <div className="top-bar">
            <button className="back-btn">
              <IoMdArrowBack />
            </button>
            <div className="userName-postCount">
              <h4 className="fullname">{user?.fullName}</h4>
              <div className="post-count dim-gray-text">48 posts</div>
            </div>
          </div>
          <div className="imgs-nd-editBtn">
            <div className="cover">
              <img
                className="cover-img"
                src={user?.coverImage}
                alt="cover"
              />
            </div>
            <div className="profile-nd-editBtn">
              <div className="profile">
                <img
                  className="profile-pic"
                  src={user?.profilePicture}
                  alt="profile  "
                />
              </div>
              <button className="edit-btn">Edit Profile</button>
            </div>
          </div>
          <div className="text-details">
            <div className="user-details">
              <div className="fullname">{user?.fullName}</div>
              <div className="username dim-gray-text">@{user?.username}</div>
            </div>
            <div className="bio">#Explorer #Patriotic</div>
            <div className="location-nd-joinDate dim-gray-text">
              <div className="location">
                <IoLocationOutline />
                <p>Bharat</p>
              </div>
              <div className="join-date">
                <FaRegCalendarDays />
                <p>joined {convertMonth(user?.createdAt)}</p>
              </div>
            </div>
            <div className="following-nd-follower">
              <div className="following-profile">
                <span>{user?.followingCount} </span>
                <span className="dim-gray-text">following</span>
              </div>
              <div className="follower-profile">
                <span>{user?.followersCount} </span>
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
