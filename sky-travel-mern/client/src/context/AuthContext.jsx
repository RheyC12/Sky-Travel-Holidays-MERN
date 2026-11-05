import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("sth_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sth_token");
    if (!token) {
      setLoading(false);
      return;
    }
    // Validate the stored token against the API and refresh user data
    api
      .get("/auth/me")
      .then(({ data }) => {
        setUser(data.data);
        localStorage.setItem("sth_user", JSON.stringify(data.data));
      })
      .catch(() => {
        localStorage.removeItem("sth_token");
        localStorage.removeItem("sth_user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    persistSession(data.data);
    return data.data;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    persistSession(data.data);
    return data.data;
  };

  const persistSession = (userData) => {
    const { token, ...rest } = userData;
    localStorage.setItem("sth_token", token);
    localStorage.setItem("sth_user", JSON.stringify(rest));
    setUser(rest);
  };

  const logout = () => {
    localStorage.removeItem("sth_token");
    localStorage.removeItem("sth_user");
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
