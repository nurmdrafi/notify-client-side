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
  const { setAuthUser, logOut } = useAuthUserContext();

  // request interceptor
  useEffect(() => {
    instance.interceptors.request.use(
      async (config) => {
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
        if (error.response.status === 401 || error.response.status === 403) {
          console.log("error 401/403");
          logOut();
          setAuthUser({});
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [navigate, logOut, setAuthUser]);

  //   response interceptor
  useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
      async (response) => {
        return response;
      },
      async (error) => {
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }
        instance.interceptors.response.eject(responseInterceptor);
        return instance
          .post("/auth/refresh", {
            refreshToken: localStorage.getItem("refreshToken"),
          })
          .then((response) => {
            localStorage.setItem("accessToken", response.data.accessToken);
            error.response.config.headers["Authorization"] =
              "Bearer " + response.data.accessToken;
            console.log(response);
            return instance(error.response.config);
          })
          .catch((error) => {
            logOut();
            setAuthUser({});
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login");
            return Promise.reject(error);
          });
      }
    );
  }, [navigate, logOut, setAuthUser]);
  return children;
}

export default instance;
