import {
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import Navbar from "../../components/Navbar"; // <-- import Navbar
import { countOrders, totalSales } from "../../api/orderApi";

const AdminDashboard = () => {
  const [ordersCount, setOrdersCount] = useState(0);
  const [sales, setSales] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: orderData } = await countOrders();
      const { data: salesData } = await totalSales();

      setOrdersCount(orderData?.totalOrders || 0);
      setSales(salesData?.totalSales || 0);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 14 }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 4,
            background: "linear-gradient(145deg, #ffffff, #f3f4f6)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header */}
          <Box mb={5}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}
            >
              Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage store operations, products, categories, and monitor sales.
            </Typography>
          </Box>

          {/* Stats Section */}
          <Grid container spacing={3} mb={5}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                }}
              >
                <ShoppingCartOutlinedIcon
                  sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
                />
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h4" fontWeight={700}>
                  {ordersCount}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                }}
              >
                <MonetizationOnOutlinedIcon
                  sx={{ fontSize: 40, color: "success.main", mb: 1 }}
                />
                <Typography variant="h6">Total Sales</Typography>
                <Typography variant="h4" fontWeight={700}>
                  ₹ {sales}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Actions */}
          <Stack spacing={3}>
            <Button
              variant="contained"
              startIcon={<Inventory2OutlinedIcon />}
              component={Link}
              to="/admin/products"
              sx={{
                py: 1.5,
                fontWeight: 600,
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                boxShadow: "0 8px 20px rgba(99,102,241,0.3)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 25px rgba(99,102,241,0.4)",
                },
              }}
            >
              Manage Products
            </Button>

            <Button
              variant="contained"
              component={Link}
              to="/admin/categories"
            >
              Manage Categories
            </Button>

            <Button
              variant="outlined"
              startIcon={<AddBoxOutlinedIcon />}
              component={Link}
              to="/admin/add-product"
              sx={{
                py: 1.5,
                fontWeight: 600,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                  backgroundColor: "#eef2ff",
                },
              }}
            >
              Add New Product
            </Button>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<ShoppingCartOutlinedIcon />}
              component={Link}
              to="/admin/orders"
            >
              Manage Orders
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default AdminDashboard;

