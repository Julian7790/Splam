import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase/firebase"; // Correct path
import { onAuthStateChanged } from "firebase/auth";

// Create the context
export const AuthContext = createContext();  // Export the AuthContext

// Create the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component that wraps the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
