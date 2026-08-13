import { useUser } from "../../../contexts/AuthProvider.jsx";
import { replace, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner.jsx";

function Logout() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async function () {
      try {
        const data = await fetch("/app/api/v1/user/logout", {
          method: "POST",
          credentials: "include",
        });

        if (!data.ok) throw new Error("Error while logout")

        setUser(null);
        navigate("/login", {replace: true});
      } catch (error) {
        console.error(`LOGOUT_ERROR: ${error.message}`)
      } finally {
        setLoading(false)
      }    
    })()
  }, [])

  if (loading) {
    return <Spinner />
  }
}

export default Logout;