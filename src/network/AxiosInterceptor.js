import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUserContext from "../context/AuthUserContext";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export function AxiosInterceptor({ children }) {
  const navigate = useNavigate();
  const { logOut } = useAuthUserContext();
  useEffect(() => {
    instance.interceptors.request.use(
      async (config) => {
        // do something before request is sent
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${token}`,
          };
        }
        return config;
      },
      async (error) => {
        // do something with request error
        if (error.response.status === 401 || error.response.status === 403) {
          logOut();
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]);
  return children;
}

export default instance;
