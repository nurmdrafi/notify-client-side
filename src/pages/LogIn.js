import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useAuthUserContext from "../context/AuthUserContext";
const Login = () => {
  const { logIn } = useAuthUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = async (data) => {
    try {
      await logIn(data.email, data.password);
    } catch (err) {
      toast.error(err.message, {
        id: "logIn error",
      });
    }
    reset();
  };
  return (
    <div className=" flex min-h-[calc(100vh-65px)] items-center justify-center">
      <div>
        <Toaster />
      </div>
      <div className="card  w-96 bg-base-100 drop-shadow-lg">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-primary">Login</h2>
          {/* Form Start */}
          <form
            onSubmit={handleSubmit(handleLogin)}
            className=" flex flex-col gap-3 text-gray-800"
          >
            {/* Email */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1 ">Email</label>
              <input
                type="text"
                className={`input input-bordered w-full bg-secondary ${
                  errors.email && "input-error"
                }`}
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Please provide a valid email",
                  },
                })}
              />
              {/* Error Message */}
              <p className="pt-2 text-left text-error">
                {errors?.email?.message}
              </p>
            </div>

            {/* Password */}
            <div className="form-control min-w-[350px]">
              <label className="text-left pb-1 ">Password</label>
              <input
                type="password"
                className={`input input-bordered w-full bg-secondary ${
                  errors.password && "input-error"
                }`}
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 8,
                    message: "Your pass must have 8 characters",
                  },
                  validate: {
                    whitespace: (v) =>
                      /^\S*$/.test(v) ||
                      "Your password must not contain whitespace",
                    oneUpperCase: (v) =>
                      /^(?=.*[A-Z]).*$/.test(v) ||
                      "Your password must have at least one uppercase character",
                    oneLowerCase: (v) =>
                      /^(?=.*[a-z]).*$/.test(v) ||
                      "Your password must have at least one lowercase character",
                    oneDigit: (v) =>
                      /^(?=.*[0-9]).*$/.test(v) ||
                      "Your password must have at least one digit",
                    oneSymbol: (v) =>
                      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(
                        v
                      ) ||
                      "Your password must have at least one special symbol",
                  },
                })}
              />
              {/* Error Message */}
              <p className="pt-2 text-left text-error">
                {errors?.password?.message}
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-active btn-primary text-white uppercase min-w-[350px]"
            >
              Login
            </button>
          </form>
          {/* Form End */}
          <p className="text-black">
            New to Notify?{" "}
            <Link to="/register" className="text-primary">
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
