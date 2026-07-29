import { Outlet } from "react-router";
import Navbar from "../components/Navbar.jsx";
import "../style/AppLayout.css";
import { AuthProvider } from "../../contexts/AuthProvider.jsx";

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