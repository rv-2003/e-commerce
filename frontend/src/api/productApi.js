import API from "./axios";

// Products
export const getProducts = () => API.get("/products");
export const getAllProducts = () => API.get("/products/allproducts");
export const getProductById = (id) => API.get(`/products/${id}`);

// Admin
export const createProduct = (formData) =>
  API.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProduct = (id, formData) =>
  API.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Reviews
export const addReview = (id, data) =>
  API.post(`/products/${id}/reviews`, data);

// Special
export const getTopProducts = () => API.get("/products/top");
export const getNewProducts = () => API.get("/products/new");
export const filterProducts = (data) =>
  API.post("/products/filtered-products", data);
