import { Outlet, Navigate } from "react-router";
import Navbar from "../components/Navbar.jsx";
import "../style/AppLayout.css";
import { useUser } from "../../contexts/AuthProvider.jsx";
import Spinner from "../components/Spinner.jsx";


export default function AppLayout() {

  const {loading, user} = useUser();

  if (loading) return <Spinner />

  if(!user) return <Navigate to="/" />

  return (


    <div className="layout">
      <Navbar />
      <main >
        <Outlet />
      </main>
    </div>
  );
}