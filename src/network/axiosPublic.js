import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosPublic.interceptors.request.use(
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
    return Promise.reject(error);
  }
);

export default axiosPublic;
