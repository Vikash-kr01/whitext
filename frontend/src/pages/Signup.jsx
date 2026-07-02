import React, { useState } from 'react'
import "../style/Signup.css"

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/")
  }

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:4000/app/api/v1/user/registeruser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      // console.log(response)  // try to console it
      if(!response.ok){
        throw new Error(`HTTP ERROR: ${response.status}`)
      }
      const result = await response.json();
      reset();
    } catch (err) {
      console.error("Request failed while sending user data to backend:", err.message);
      reset();  // it reset all the input fields
    }
  }

  return (
    <div className="sign-page">
      <div className="form-card">
        <h2>Register User</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("fullName", {
                required: { value: true, message: "Full name is compulsory field" },
                maxLength: { value: 25, message: "Max length is 25" }
              })}
            />
            {
              errors["fullName"]
              &&
              <span className='error'>*{errors["fullName"].message}</span>
            }
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              {...register("email", {
                required: { value: true, message: "Email is compulsory field" },
              })}
            />
            {
              errors.email
              &&
              <span className='error'>*{errors.email.message}</span>
            }
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              {...register("username", {
                required: { value: true, message: "Username is compulsory field" },
              })}
            />
            {
              errors.username
              &&
              <span className='error'>*{errors.username.message}</span>
            }
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              {...register("password", {
                required: { value: true, message: "Password is compulsory field" },
              })}
            />
            {
              errors.password
              &&
              <span className='error'>*{errors.password.message}</span>
            }
          </div>


          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button onClick={handleClick} className="submit-bt">
            I Already Have An Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup
