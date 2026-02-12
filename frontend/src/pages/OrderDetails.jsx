import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { getOrderById } from "../api/orderApi";

const OrderDetail = () => {
  const { id } = useParams(); // order id from URL
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 12, textAlign: "center" }}>
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 12 }}>
          <Typography variant="h6">Order not found</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 12, mb: 5 }}>
        <Button variant="outlined" sx={{ mb: 2 }} onClick={() => navigate("/orders")}>
          ← Back to Orders
        </Button>

        <Typography variant="h5" fontWeight="bold" mb={2}>
          Order Details
        </Typography>

        {/* Shipping Info */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">Shipping Information</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>
            <strong>Name:</strong> {order.user?.username}
          </Typography>
          <Typography>
            <strong>Email:</strong> {order.user?.email}
          </Typography>
          <Typography>
            <strong>Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </Typography>
          <Typography>
            <strong>Delivered:</strong> {order.isDelivered ? "✅ Yes" : "❌ No"}
          </Typography>
        </Paper>

        {/* Payment Info */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">Payment Method</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>
            <strong>Method:</strong> {order.paymentMethod}
          </Typography>
          <Typography>
            <strong>Paid:</strong> {order.isPaid ? "✅ Yes" : "❌ No"}
          </Typography>
        </Paper>

        {/* Ordered Items */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Ordered Items</Typography>
          <Divider sx={{ my: 1 }} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orderItems.map((item) => (
                <TableRow key={item.product}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>₹{item.price * item.qty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Typography variant="h6">
              Total: ₹{order.totalPrice}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default OrderDetail;
