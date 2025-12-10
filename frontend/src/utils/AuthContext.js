import React, { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "./api";

//create context
const AuthContext = createContext(null);

//custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

//Auth Provider Component export
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //check if user is logged in on mount

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  //Login function
  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;
      //save to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      //update state
      setUser(user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

  //logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  //register
  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setUser(user);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Could not register",
      };
    }
  };
  const value = {
    user,
    login,
    logout,
    register,
    loading,
    isAuthenticated: !!user,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
