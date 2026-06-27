import React, { useState } from 'react'
import "../style/Login.css"

import { Link } from 'react-router'
import { useForm } from "react-hook-form"




const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
    // formState link: "https://www.react-hook-form.com/api/useform/formstate/"
  } = useForm({
    mode: "onChange",
  });

  const delay = async (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }

  const onSubmit = async (data) => {
    await delay(2)
    console.log(data)
    return 
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
      </div>
    </div>
  )
}

export default Login
