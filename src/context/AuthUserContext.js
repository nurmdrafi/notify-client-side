import React, { useEffect, useState, useContext, createContext } from "react";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../firebase.init";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const AuthUserContext = createContext();

export const AuthUserContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function signUp(name, email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() =>
        updateProfile(auth.currentUser, { displayName: name }).then(() =>
          setAuthUser({ name: name, email: email })
        )
      )
      .catch(() => {
        setAuthUser(null);
      });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
    // after login setAuthUser will set by onAuthStateChanged method
  }

  function logOut() {
    return signOut(auth).then(() => {
      setAuthUser(null);
    });
  }

  // keep connected with firebase auth provider, onMount track auth user exist or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        function getToken() {
          axios
            .get("/auth/refresh", {
              withCredentials: true,
            })
            .then((res) => {
              setAuthUser({
                name: currentUser.displayName,
                email: currentUser.email,
                accessToken: res?.data?.accessToken,
              });
              navigate("/home");
            });
        }
        getToken();
      } else {
        setAuthUser(null);
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
