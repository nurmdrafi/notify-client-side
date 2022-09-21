import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthUserContext from "../context/AuthUserContext";

const RequireAuth = ({ children }) => {
  const { authUser } = useAuthUserContext();
  const location = useLocation();

  if (authUser?.email) {
    return children;
  } else {
    return setTimeout(() => {
      <Navigate to="/login" state={{ path: location.pathname }}></Navigate>;
    }, 1500);
  }
};

export default RequireAuth;
