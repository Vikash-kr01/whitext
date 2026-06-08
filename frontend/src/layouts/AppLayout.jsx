import { Outlet } from "react-router";
// import Navbar from "../Components/Navbar";
import Navbar from "../components/Navbar.jsx";

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      {/* <main style={{ padding: "20px" }}> */}
        <Outlet />
      {/* </main> */}
    </div>
  );
}