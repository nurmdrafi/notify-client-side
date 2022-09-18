import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../firebase.init";
import { useNavigate } from "react-router-dom";

const AuthUserContext = createContext();

export const AuthUserContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({ user: {} });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function signUp(name, email, password) {
    await createUserWithEmailAndPassword(auth, email, password).then(() =>
      updateProfile(auth.currentUser, { displayName: name })
    );
    setAuthUser({
      user: {
        name: name,
        email: email,
      },
    });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth).then(() => setAuthUser({}));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setAuthUser({
          user: {
            name: currentUser.displayName,
            email: currentUser.email,
          },
        });
        navigate("/home");
      } else {
        setAuthUser({});
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthUserContext.Provider
      value={{
        authUser,
        setAuthUser,
        isLoading,
        setIsLoading,
        signUp,
        logIn,
        logOut,
        error,
        setError,
      }}
    >
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
