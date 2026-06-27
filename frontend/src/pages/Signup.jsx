import React, { useState } from 'react'
import "../style/Signup.css"
import { useForm } from 'react-hook-form';

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const [formData, setFormData] = useState({});

  const years = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => new Date().getFullYear() - i
  );

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, })
  };


  const onSubmit = (data) => {
    console.log(data)
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
              {...register("full name", {
                required: { value: true, message: "Full name is compulsory field" },
                maxLength: { value: 25, message: "Max length is 25" }
              })}
            />
            {
              errors["full name"]
              &&
              <span className='error'>*{errors["full name"].message}</span>
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
                required: { value: true, message: "Email is compulsory field" },
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
        </form>
      </div>
    </div>
  );
}

export default Signup
