import { createBrowserRouter, Navigate } from "react-router";

import AppLayout from "./layouts/AppLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
import AccountLayout from "./layouts/AccountLayout.jsx"

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import Home from "./pages/buttons/Home.jsx";
import Notification from "./pages/buttons/Notification.jsx";
import Profile from "./pages/buttons/Profile.jsx";
import Settings from "./pages/buttons/Settings.jsx";
import Logout from "./pages/buttons/Logout.jsx"

const router = createBrowserRouter([
    {
        Component: GuestLayout,
        children: [
			{ index: true, Component: Login },     // "index: true" means the default child route, so "/" opens Login.
			{ path: "login", Component: Login },   // means "/login" also opens Login.
			{ path: "sign-up", Component: Signup },   // "/login" optional alias
		],
    },
    {
        Component: AccountLayout,
        children: [
            {path: "recover", Component: ForgetPassword}
        ]
    },
    {
        Component: AppLayout,
        children: [
            { path: "home", Component: Home },   
			{ path: "profile", Component: Profile },   
			{ path: "notifications", Component: Notification },   
            { path: "settings", Component: Settings },   
            { path: "logout", Component: Logout },   
		],
    },
    {
		path: "*",
		element: <Navigate to="/" replace />,      // With replace, the wrong URL is replaced by "/" in history, Without replace, the bad URL stays in history, so the user can keep going back to the broken page.

	},
])

export default router