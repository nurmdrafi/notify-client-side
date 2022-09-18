import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthUserContext from "../context/AuthUserContext";

const RequireAuth = ({ children }) => {
  const { authUser } = useAuthUserContext();
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  if (authUser.user && token) {
    return children;
  } else {
    return (
      <Navigate to="/login" state={{ path: location.pathname }}></Navigate>
    );
  }
};

export default RequireAuth;
