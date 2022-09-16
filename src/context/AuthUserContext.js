import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthUserContext = createContext();

export const AuthUserContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({
    name: null,
    email: null,
  });
  function LogIn(name, email, password) {
    setAuthUser({
      name: name,
      email: email,
    });
  }
  function LogOut() {
    setAuthUser({
      name: null,
      email: null,
    });
  }
  return (
    <AuthUserContext.Provider value={{ authUser, LogIn, LogOut }}>
      {children}
    </AuthUserContext.Provider>
  );
};

const useAuthUserContext = () => {
  const context = useContext(AuthUserContext);
  if (!context) {
    throw Error(
      "useAuthUserContext must be used within a AuthUserContextProvider"
    );
  }
  return context;
};
export default useAuthUserContext;
