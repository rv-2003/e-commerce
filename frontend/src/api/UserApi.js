import API from "./axios";

// User
export const registerUser = (data) => API.post("/users", data);
export const loginUser = (data) => API.post("/users/auth", data);
export const logoutUser = () => API.post("/users/logout");

// Profile
export const getProfile = () => API.get("/users/profile");
export const updateProfile = (data) => API.put("/users/profile", data);

// Admin
export const getAllUsers = () => API.get("/users");
export const getUserById = (id) => API.get(`/users/${id}`);
export const updateUserById = (id, data) => API.put(`/users/${id}`, data);
export const deleteUserById = (id) => API.delete(`/users/${id}`);
