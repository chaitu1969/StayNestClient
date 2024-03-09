import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");

    setRedirect("/");
    setUser(null);
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"}></Navigate>;
  }

  if (redirect) {
    return <Navigate to={redirect}></Navigate>;
  }

  return (
    <div>
      <AccountNav />

      {subpage === "profile" && user && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br></br>
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage></PlacesPage>}
    </div>
  );
}
