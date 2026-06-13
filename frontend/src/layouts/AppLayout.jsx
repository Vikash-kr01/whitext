import { Outlet } from "react-router";
import Navbar from "../components/Navbar.jsx";
import "../style/AppLayout.css";

export default function AppLayout() {
  return (
    <div className="layout">
      <Navbar />
      <main >
        <Outlet />
      </main>
    </div>
  );
}