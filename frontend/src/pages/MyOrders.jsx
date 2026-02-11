import { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import Navbar from "../components/Navbar";
import { getMyOrders } from "../api/orderApi";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(res => setOrders(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 12 }}>
        <Typography variant="h4" gutterBottom>📦 My Orders</Typography>

        {orders.map(order => (
          <Paper key={order._id} sx={{ p: 3, mb: 2 }}>
            <Typography>Order ID: {order._id}</Typography>
            <Typography>Total: ₹{order.totalPrice}</Typography>
            <Typography>Status: {order.isPaid ? "Paid" : "Pending"}</Typography>
          </Paper>
        ))}
      </Container>
    </>
  );
};

export default MyOrders;

