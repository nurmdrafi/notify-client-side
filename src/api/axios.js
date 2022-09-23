import axios from "axios";
const BASE_URL = "http://localhost:5000";
// https://aqueous-sea-71666.herokuapp.com
// http://localhost:5000

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
