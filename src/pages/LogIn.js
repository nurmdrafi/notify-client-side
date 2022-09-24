import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useAuthUserContext from "../context/AuthUserContext";
import axios from "../api/axios";
import Loading from "../components/Loading";

const Login = () => {
  const { setAuthUser, isLoading, setIsLoading } = useAuthUserContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // login
  const login = async (email, password) => {
    const res = await axios.post("/auth/login", {
      email: email,
      password: password,
    });
    return res.data;
  };

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password)
        .then((res) => {
          setAuthUser({
            username: res.username,
            email: res.email,
            role: res.role,
            accessToken: res.accessToken,
          });
        })
        .then(() => {
          setIsLoading(false);
          navigate("/home");
        });
    } catch (err) {
      setAuthUser(null);
      toast.error(err.response?.data?.message, {
        id: "logIn error",
      });
    } finally {
      reset();
      setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return <Loading />;
  }

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
