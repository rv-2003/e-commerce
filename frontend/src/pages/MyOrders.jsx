import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../api/orderApi";
import Navbar from "../components/Navbar";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then((res) => setOrders(res.data))
      .catch(() => alert("Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 12 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          My Orders
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Paper elevation={4}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Delivered</TableCell>
                  <TableCell></TableCell>
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
                    <TableCell>
                      {order.isPaid ? "✅" : "❌"}
                    </TableCell>
                    <TableCell>
                      {order.isDelivered ? "✅" : "❌"}
                    </TableCell>
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
      </Container>
    </>
  );
};

export default MyOrders;


