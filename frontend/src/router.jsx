import { createBrowserRouter, Navigate } from "react-router";

import AppLayout from "./layouts/AppLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
import AccountLayout from "./layouts/AccountLayout.jsx"

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
			{ index: true, Component: Login },     // "index: true" means the default child route, so "/" opens Login.
			{ path: "login", Component: Login },   // means "/login" also opens Login.
			{ path: "sign-up", Component: Signup },   // "/login" optional alias
		],
    },
    {
        Component: AccountLayout,
        children: [
            { path: "settings", Component: Settings },   
        ]
    },
    {
        Component: AppLayout,
        children: [
			{ path: "home", Component: Home },   
			{ path: "profile", Component: Profile },   
			{ path: "notifications", Component: Notification },   
		],
    },
    {
		path: "*",
		element: <Navigate to="/" replace />,      // With replace, the wrong URL is replaced by "/" in history, Without replace, the bad URL stays in history, so the user can keep going back to the broken page.

	},
])

export default router