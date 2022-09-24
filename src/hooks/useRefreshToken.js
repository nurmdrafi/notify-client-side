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
      const res = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      setAuthUser({
        username: res.data.username,
        email: res.data.email,
        role: res.data.role,
        accessToken: res.data.accessToken,
      });
      return res.data.accessToken;
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
