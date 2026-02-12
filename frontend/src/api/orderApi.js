import API from "./axios";

// Orders
export const createOrder = (data) => API.post("/orders", data);
export const getMyOrders = () => API.get("/orders/mine");
export const getOrderById = (id) => API.get(`/orders/${id}`);

// Payment & Delivery
export const markOrderAsPaid = (id) => API.put(`/orders/${id}/pay`);
export const markOrderAsDelivered = (id) => API.put(`/orders/${id}/deliver`);

// Admin stats
export const getAllOrders = () => API.get("/orders");
export const countOrders = () => API.get("/orders/total-orders");
export const totalSales = () => API.get("/orders/total-sales");
export const salesByDate = () => API.get("/orders/total-sales-by-date");
