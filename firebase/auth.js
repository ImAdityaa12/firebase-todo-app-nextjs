import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./firebase";

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setisLoading(false);
  };

  const authStateChanged = async (user) => {
    setisLoading(true);
    if (!user) {
      clear();
      return;
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
      username: user.displayName,
    });
    setisLoading(false);
  };
  const signOut = () => {
    authSignOut(auth).then(() => {
      clear();
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe;
  }, []);
  return {
    authUser,
    isLoading,
    setAuthUser,
    signOut,
  };
}

export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
