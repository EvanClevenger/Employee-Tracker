import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext"; // must import with {} if not using default export

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const login = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate("./dashboard");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center md-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {" "}
            Employee Tracker
          </h1>
          <p className="text-gray-600 mt-2">
            {" "}
            Sign in to view your performance
          </p>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}{" "}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="md-4">
            <label className="block text-gray-700 text-sm font-bold md-2">
              Work Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="yourname@switch.com"
              required></input>
          </div>
          <div className="md-6">
            <label className="block text-gray-700 text-sm font-bold md-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="*********"
              required></input>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50">
            {" "}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {" "}
            Don't have an account?{""}{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-semibold">
              Register
            </Link>
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Demo credentials: eclevenger@switch.com / password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
