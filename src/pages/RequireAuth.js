import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthUserContext from "../context/AuthUserContext";

const RequireAuth = ({ children }) => {
  const { authUser } = useAuthUserContext();
  const location = useLocation();

  if (authUser?.email) {
    return children;
  } else {
    return (
      <Navigate to="/login" state={{ path: location.pathname }}></Navigate>
    );
  }
};

export default RequireAuth;
