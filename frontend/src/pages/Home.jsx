import React from 'react'
import "../style/Home.css"

const Home = () => {
  return (
    <div className='home'>
      <div className="mid-page">
        <div className="for-you-following">
          <div className="for-you">
            For You
          </div>
          <div className="following">
            Following
          </div>
        </div>
        <div className="blur-line">as</div>
      </div>
      <div className="right-page">Middle page</div>
    </div>
  )
}

export default Home
