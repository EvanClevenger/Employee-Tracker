import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {" "}
        <div className="text-xl">Loading...</div>{" "}
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

// Whatever you wrap inside <ProtectedRoute> ... </ProtectedRoute> becomes children. Dashboard === children
// All this function does is authenticate the user

export default ProtectedRoute;
