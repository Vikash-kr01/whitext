import { useUser } from "../../../contexts/AuthProvider.jsx";
import { useNavigate } from "react-router";

function Logout() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const logout = async () => {
    await fetch("/app/api/v1/user/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    navigate("/login");
  };

  return <button onClick={logout}>Logout</button>;
}

export default Logout;