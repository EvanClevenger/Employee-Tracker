import axios from "axios";

const API_URL = "http://localhost:8001/api";
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application.json" },
}); //axios instance

//add token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer: ${token}`;
    return config;
  }
  (error) => {
    return Promise.reject(error);
  };
});

//Handle response errors
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // If token expired or invalid - logout user
    if (error.res?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  }
);

// Auth endpoints
const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (userData) => api.post("/auth/register", userData),
  getCurrentUser: () => api.get("/auth/me"),
};
// Employee endpoints export
const employeeAPI = {
  getMyStats: () => api.get("/employee/my-stats"),
  getAllEmployees: () => api.get("/employees"),
  getEmployeeByLastName: (lastName) => api.get(`/employees/${lastName}`),
};
export default api;
