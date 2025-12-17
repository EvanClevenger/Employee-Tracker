import React, { createContext, useState, useContext, useEffect } from "react";
import authAPI from "./api";

//create context, React gives you AuthContext.Provider and AuthContext.Consumer
// Provider provides data to children, its a shared box of data
const AuthContext = createContext(null); // this is what we want to share

//custom hook to use AuthContext
// A custom hook is just a function that starts with use and wraps other hooks.
// will have to call useAuth() in child component to get data
export const useAuth = () => {
  const context = useContext(AuthContext); //Consumer
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

//Auth Provider Component export
export const AuthProvider = () => {
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
  // collects all state and functions into 1 obj
  const value = {
    user,
    login,
    logout,
    register,
    loading,
    isAuthenticated: !!user,
  };
  //AuthContext is the context obj of the custom hook (useAuth)
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
  // {!loading && children} is a conditional render, if loading false --> render children
};

export default AuthProvider;
