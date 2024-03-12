import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const token = localStorage.getItem("Token");
 useEffect(() => {
    if (token) {
      axios
        .get("/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch((error) => {
          // Handle error, for example by resetting user state
          console.error("Error fetching user profile:", error);
          setUser(null);
          setReady(false);
        });
    } else {
      // No token available, ensure user is set to null
      setUser(null);
      setReady(false);
    }
  }, [token]);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
