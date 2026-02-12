import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : "http://localhost:5000/api",
  withCredentials: true, // ✅ send cookies
});

// REMOVE Authorization header since backend uses cookies
// API.interceptors.request.use(...)  <-- remove this block

export default API;




