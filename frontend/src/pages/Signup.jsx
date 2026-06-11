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
        <h2>User Information</h2>

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
            <label>Date of Birth</label>

            <div className="dob-row">
              <select
                {...register("day", {
                  required: { value: true, message: "Choose a day" },
                })}
              >
                <option value="">Day</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              {errors.day && <span className='error'>*{errors.day.message}</span>}

              <select
                {...register("month", {
                  required: { value: true, message: "Choose a month" },
                })}
              >
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              {errors.month && <span className='error'>*{errors.month.message}</span>}

              <select
                {...register("year", { required: { value: true, message: "Choose a year" }, })}
              >
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.year && <div className='error'>*{errors.year.message}</div>}

            </div>
          </div>

          <div className="form-group">
            <label>Gender</label>

            <select
              {...register("gender", { required: { value: true, message: "Choose a gender" }, })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">
                Prefer not to say
              </option>
            </select>
            {errors.gender && <span className='error'>*{errors.gender.message}</span>}

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
