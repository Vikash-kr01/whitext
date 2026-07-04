import React from 'react'
import "../style/ForgetPassword.css"



const ForgetPassword = () => {
	return (
		<div className="forget-page">
			<div className='forget-password-page'>
				<form action="" className='forget-password-form send-otp'>
					<label>
						Find User
					</label>
					<input type="text"
						placeholder='Mobile number or email or username'
					/>
					<input type="submit" className='forget-submit-btn' value={"Send Otp"} />
				</form>
				<form action="" className='forget-password-form confirm-otp'>
					<input type="text"
						placeholder='Enter your sent otp'
					/>
					<input type="submit" className='forget-submit-btn' value={"Confirm OTP"} />
				</form>
			</div>
		</div>
	)
}

export default ForgetPassword