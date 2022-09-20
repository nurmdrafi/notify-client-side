import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthUserContext from "../context/AuthUserContext";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const { authUser, logOut } = useAuthUserContext();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (err) {
      toast.error(err.message, {
        id: "logOut error",
      });
    }
  };
  return (
    <div className="navbar lg:px-16 px-12 h-[65px]">
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <div className="flex-1">
        <Link className="text-2xl font-bold text-primary" to="/">
          Notify<span className="text-red-500 text-3xl">.</span>me
        </Link>
      </div>
      <div className="flex items-center">
        {/* logout button */}
        <div className="flex items-center gap-2 text-black">
          {authUser?.email && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full shadow-md bg-primary">
                  {authUser.name && (
                    <span className="text-2xl pt-1 flex justify-center items-center text-white">
                      {authUser.name[0]}
                    </span>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <button
                    className="btn btn-primary text-white"
                    onClick={handleLogOut}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
