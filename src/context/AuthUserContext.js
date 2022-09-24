import React, { useEffect, useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";

const AuthUserContext = createContext();

export const AuthUserContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // regenerate new token onMount
  useEffect(() => {
    const refresh = async () => {
      try {
        await axios
          .get("/auth/refresh", {
            withCredentials: true,
          })
          .then((res) => {
            setAuthUser({
              username: res.data.username,
              email: res.data.email,
              role: res.data.role,
              accessToken: res.data.accessToken,
            });
            navigate("/home");
          });
      } catch (err) {
        await axios.get("/auth/logout").then(() => {
          setAuthUser(null);
          navigate("/login");
        });
      }
    };
    refresh();
  }, []);
  return (
    <AuthUserContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

const useAuthUserContext = () => {
  const context = useContext(AuthUserContext);
  if (!context) {
    throw Error(
      "useAuthUserContext must be used within a AuthUserContextProvider"
    );
  }
  return context;
};
export default useAuthUserContext;
