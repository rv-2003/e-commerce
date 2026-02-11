import API from "./axios";

// Category
export const getCategories = () => API.get("/category");

export const getCategoryById = (id) => API.get(`/category/${id}`);

// Admin
export const createCategory = (data) => API.post("/category", data);
export const updateCategory = (id, data) =>
  API.put(`/category/${id}`, data);
export const deleteCategory = (id) =>
  API.delete(`/category/${id}`);
