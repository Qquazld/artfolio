import { createContext, useState, useContext } from "react";
import { getCurrentUser, logout as apiLogout } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage via getCurrentUser — persists session on refresh
  const [user, setUser] = useState(getCurrentUser());

  const login = (userData) => setUser(userData);
  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAdmin: user?.role === "admin", login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
