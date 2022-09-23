import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuthUserContext from "../context/AuthUserContext";

const logout = async () => {
  const res = await axios.get("/auth/logout");
  return res.data;
};

const useRefreshToken = () => {
  const { setAuthUser } = useAuthUserContext();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      setAuthUser({
        username: response.data.username,
        email: response.data.username,
        role: response.data.role,
        accessToken: response.data.accessToken,
      });
      return response.data.accessToken;
    } catch (error) {
      await logout().then(() => {
        setAuthUser(null);
        navigate("/login");
      });
    }
  };
  return refresh;
};

export default useRefreshToken;
