import axios from "axios";

// Automatically detect environment
const API = axios.create({
  baseURL: import.meta.env.PROD
    ? "/api"                     // Production (Vercel)
    : "http://localhost:5000/api", // Local development
  withCredentials: true,
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;


