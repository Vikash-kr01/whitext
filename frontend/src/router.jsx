import { createBrowserRouter, Navigate } from "react-router";

import AppLayout from "./layouts/AppLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";

import Home from "./pages/Home.jsx";
import Notification from "./pages/Notification.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
    {
        Component: GuestLayout,
        children: [
			{ index: true, Component: Login },     // "/"
			{ path: "login", Component: Login },   // "/login" optional alias
			{ path: "sign-up", Component: Signup },   // "/login" optional alias
		],
    },
    {
        Component: AppLayout,
        children: [
			{ path: "home", Component: Home },   
			{ path: "settings", Component: Settings },   
			{ path: "profile", Component: Profile },   
			{ path: "notifications", Component: Notification },   
		],
    }
])

export default router