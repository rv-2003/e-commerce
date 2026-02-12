// AdminOrdersDashboard.jsx
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Stack,
  Modal,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import {
  getAllOrders,
  countOrders,
  totalSales as fetchTotalSales,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../../api/orderApi";


const AdminOrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalOrders: 0, totalSales: 0 });
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchOrders();
  }, []);

  const fetchStats = async () => {
    try {
      const ordersRes = await countOrders();
      const salesRes = await fetchTotalSales();
      setStats({ totalOrders: ordersRes.data.totalOrders, totalSales: salesRes.data.totalSales });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (id) => {
    try {
      await markOrderAsPaid(id, {
        id: "PAYMENT123",
        status: "COMPLETED",
        update_time: new Date().toISOString(),
        payer: { email_address: "customer@example.com" },
      });
      fetchOrders();
    } catch (err) {
      alert("Failed to mark as paid");
    }
  };

  const handleMarkDelivered = async (id) => {
    try {
      await markOrderAsDelivered(id);
      fetchOrders();
    } catch (err) {
      alert("Failed to mark as delivered");
    }
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 12 }}>
        <Typography variant="h4" fontWeight={700} mb={4}>
          Admin Orders Dashboard
        </Typography>

        {/* Stats */}
        <Grid container spacing={3} mb={5}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Total Orders</Typography>
              <Typography variant="h4">{stats.totalOrders}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4">₹ {stats.totalSales}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Orders Table */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Delivered</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.user?.username || order.user?.name}</TableCell>
                    <TableCell>₹{order.totalPrice}</TableCell>
                    <TableCell>{order.isPaid ? "✅" : "❌"}</TableCell>
                    <TableCell>{order.isDelivered ? "✅" : "❌"}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {!order.isPaid && (
                          <Button onClick={() => handleMarkPaid(order._id)} size="small" variant="outlined">
                            Mark Paid
                          </Button>
                        )}
                        {!order.isDelivered && (
                          <Button onClick={() => handleMarkDelivered(order._id)} size="small" variant="outlined">
                            Mark Delivered
                          </Button>
                        )}
                        <Button size="small" variant="contained" onClick={() => setSelectedOrder(order)}>
                          Details
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* Order Details Modal */}
        <Modal
          open={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              width: 400,
            }}
          >
            {selectedOrder && (
              <>
                <Typography variant="h6" mb={2}>
                  Order #{selectedOrder._id.slice(0, 8)}
                </Typography>
                <Typography>User: {selectedOrder.user?.username || selectedOrder.user?.name}</Typography>
                <Typography>Total: ₹{selectedOrder.totalPrice}</Typography>
                <Typography>Paid: {selectedOrder.isPaid ? "Yes" : "No"}</Typography>
                <Typography>Delivered: {selectedOrder.isDelivered ? "Yes" : "No"}</Typography>
                <Typography mt={2}>Items:</Typography>
                {selectedOrder.orderItems.map((item) => (
                  <Typography key={item.product}>
                    {item.name} x {item.qty}
                  </Typography>
                ))}
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default AdminOrdersDashboard;

