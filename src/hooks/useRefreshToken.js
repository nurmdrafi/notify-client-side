import axios from "../api/axios";
import useAuthUserContext from "../context/AuthUserContext";

const useRefreshToken = () => {
  const { setAuthUser } = useAuthUserContext();

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    setAuthUser((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
