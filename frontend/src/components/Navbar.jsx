import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import "../style/Navbar.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>
      <NavLink to={"/home"}>Home</NavLink>
      <NavLink to={"/notifications"}>Notification</NavLink>
      <NavLink to={"/profile"}>Profile</NavLink>
    </nav>
  );
};

export default Navbar;
