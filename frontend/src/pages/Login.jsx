import React, { useState } from 'react'
import "../style/Login.css"

import { Link, useNavigate } from 'react-router'
import { useForm } from "react-hook-form"

import { useUser } from '../../contexts/AuthProvider.jsx'




const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
    // formState link: "https://www.react-hook-form.com/api/useform/formstate/"
    reset
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const {setUser} = useUser();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/app/api/v1/user/login", {
        // "http://127.0.0.1:4000/app/api/v1/user/login"
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      // console.log(response)  // try to console it
      if(!response.ok){
        throw new Error(`HTTP ERROR: ${response.status}`)
      }
      const result = await response.json();
      // console.log(result)  // see below 1>
      setUser(result.data.user)
      navigate("/home")
    } catch (err) {
      console.error("Request failed while sending user data to backend:", err.message);
      reset();  // it reset all the input fields
    }
  }

  
  const handleClick = () => {
    navigate("/sign-up");
  }


  return (
    <div className='login'>
      <div className='login-form'>
        <h4 className='login-to-whitext'>Login to whitext</h4>
        <form className='form' onSubmit={handleSubmit(onSubmit)} action="/login">
          <input
            type="text"
            placeholder="Email, username or mobile number"
            {...register("email", {
              required: true,
              minLength: 1,
            })}
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 3,
            })}
          />

          <input type="submit" disabled={!isValid || isSubmitting} value={isSubmitting ? "Logging In" : "Login"} className='submit'  />
          {/* disable the submit btn if the form is not valid or is submitting */}
          

        </form>

        <Link>Forgot password?</Link>
        <button onClick={handleClick}>Create New Account</button>
      </div>
    </div>
  )
}

export default Login









/* if console.log(result)
{
	statusCode: 200,
	data: {
		accessToken: "eyJhbGc.eyJfaWQiO.sKlnoTs"
		refreshToken: "eyJhbGc.eyJfaWQiO.sKlnoTs",
		user: {
			createdAt: "2026-07-15T16:30:22.824Z"
			email: "test@mail.com"
			fullName: "test"
			gender: "Undefined"
			updatedAt: "2026-07-28T05:59:31.402Z"
			username: "test"
			__v: 0
			_id: "6a57b59eb0d52edbbca9d8c8"
		}
	},
	message: 'User logged in successfully',
	success: true
}
*/