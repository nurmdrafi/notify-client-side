import React from "react";
import { Link } from "react-router-dom";
import useAuthUserContext from "../context/AuthUserContext";
const LandingPage = () => {
  const { authUser } = useAuthUserContext();
  return (
    <div className=" flex min-h-[calc(100vh-65px)] items-center justify-center">
      <div>
        <h1 className="text-primary font-bold text-center text-7xl">
          You can note anything...
        </h1>
        {!authUser?.accessToken ? (
          <div className="flex justify-center gap-5 mt-5">
            <Link to="/login">
              <button className="btn btn-primary btn-outline ">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-primary btn-outline">Register</button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-5">
            <Link to="/home">
              <button className="btn btn-primary btn-outline">
                Go To Home Page
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
