import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
	return (
		<nav>
			<NavLink to={"/home"} >Home</NavLink>
			<NavLink to={"/notifications"} >Notification</NavLink>
			<NavLink to={"/profile"} >Profile</NavLink>
		</nav>
	)
}

export default Navbar
