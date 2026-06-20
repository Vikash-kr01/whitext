import React from "react";
import "../style/Post.css";

const Post = () => {
  return (
    <div className="post">
      <div className="left-part-post">
        <img
          className="profile-img"
          src="/images/girl_dummy.jpg"
          alt="profile-pic"
        />
      </div>
      <div className="right-part-post">
        <div className="user-n-post-detail">
          <h5 className="fullname">Vikash Kumar</h5>
          <div className="username">@vikashsatsangi</div>
          <div className="time">• 3d</div>
        </div>
        <div className="post-content">
          <p className="text-post-content">
            Focus on taking one small, intentional step toward your goals today
            rather than worrying about the big picture. Even minor, incremental
            progress adds up to massive results over time. What small victory
            can you claim today?
          </p>
          <div className="media-post-content">
            {/* <img
              className="post-media"
              src="/images/girl_dummy.jpg"
              alt="media"
            /> */}
            <video
              className="post-media"
              typeof="video/mp4"
              controls={true}
            >
                <source src="/videos/practice_video.mp4" type="video/mp4"></source>
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
