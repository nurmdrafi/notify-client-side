import axios from "../api/axios";
import useAuthUserContext from "../context/AuthUserContext";

const useRefreshToken = () => {
  const { setAuthUser } = useAuthUserContext();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      setAuthUser({
        username: response.data.username,
        email: response.data.username,
        accessToken: response.data.accessToken,
      });
      return response.data.accessToken;
    } catch (error) {
      console.log("error refresh token");
    }
  };
  return refresh;
};

export default useRefreshToken;
