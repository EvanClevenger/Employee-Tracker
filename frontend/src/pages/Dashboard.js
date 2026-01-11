import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { employeeAPI } from "../utils/api";
import StatCard from "../components/StatCard";
import ErrorChart from "../components/ErrorChart";
import {
  UserIcon,
  BriefcaseIcon,
  ClockIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  LogOutIcon,
} from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      //fetch user's performance stats
      const statResponse = await employeeAPI.getMyStats();
      setStats(statResponse.data);

      //fetch department of employees
      const employeeResponse = await employeeAPI.getAllEmployees();
      setEmployees(employeeResponse.data);

      setError(null);
    } catch (error) {
      setError("failed to get data from api");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto">
          <p className="mt-4 text-gray-600"> Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <img
              src={user.profilePicture}
              alt={user.firstName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome {user.firstName}
              </h1>
              <p className="text-gray-600">
                {user.title} - {user.department}
              </p>
            </div>
          </div>
          <button
            onClick={() => logout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200">
            <LogOutIcon className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8"></main>
    </>
  );
};

export default Dashboard;
