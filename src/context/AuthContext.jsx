import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Persist session
  useEffect(() => {
    const storedUser = localStorage.getItem("fintech_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = ({ username, role }) => {
    const userData = {
      id: username,
      role, // "admin" or "user"
    };

    setUser(userData);
    localStorage.setItem("fintech_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fintech_user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook (clean usage)
export function useAuth() {
  return useContext(AuthContext);
}