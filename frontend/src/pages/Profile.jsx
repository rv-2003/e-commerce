import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Avatar,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { getProfile, updateProfile } from "../api/UserApi";
import API from "../api/axios"; // your axios instance
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "" });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Load profile + orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getProfile();
        setUser(profileRes.data);

        const orderRes = await API.get("/orders/mine", { withCredentials: true });
        setOrders(orderRes.data);
      } catch (err) {
        alert("Failed to load profile or orders");
        console.error(err);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateProfile(user);
      alert("Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 12, maxWidth: "md" }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          {/* ================= PROFILE SECTION ================= */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar sx={{ width: 80, height: 80, mb: 1 }}>
              {user.name?.charAt(0)}
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              My Profile
            </Typography>
          </Box>

          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            value={user.name}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={user.email}
            disabled
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>

          {/* ================= ORDER HISTORY ================= */}
          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            My Orders
          </Typography>

          {ordersLoading ? (
            <Box textAlign="center" mt={2}>
              <CircularProgress />
            </Box>
          ) : orders.length === 0 ? (
            <Typography color="text.secondary">No orders found.</Typography>
          ) : (
            <Paper sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Delivered</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id.slice(0, 8)}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>₹{order.totalPrice}</TableCell>
                      <TableCell>{order.isPaid ? "✅" : "❌"}</TableCell>
                      <TableCell>{order.isDelivered ? "✅" : "❌"}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => navigate(`/order/${order._id}`)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Profile;


