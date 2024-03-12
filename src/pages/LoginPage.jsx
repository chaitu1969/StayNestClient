import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../userContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data.isUserExist);

      localStorage.setItem("Token", data.token);
      alert("login successfull");
      setRedirect(true);
    } catch (e) {
      alert("login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-3xl text-center mb-4">Login </h1>
        <form className="mt-1 max-w-md mx-auto " onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder={"youremail@gmail.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500 ">
            Don't have account yet?{"  "}
            <Link to={"/register"} className="underline text-black">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
