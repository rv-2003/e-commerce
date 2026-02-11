import {
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const AdminDashboard = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 14 }}>
      <Paper
        elevation={0}
        sx={{
          p: 6,
          borderRadius: 4,
          background: "linear-gradient(145deg, #ffffff, #f3f4f6)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
        }}
      >
        <Box mb={4}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              mb: 1,
            }}
          >
            Admin Dashboard
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Manage products, monitor inventory, and control store content.
          </Typography>
        </Box>

        <Stack spacing={3}>
          <Button
            variant="contained"
            startIcon={<Inventory2OutlinedIcon />}
            component={Link}
            to="/admin/products"
            sx={{
              py: 1.5,
              fontWeight: 600,
              background:
                "linear-gradient(135deg, #6366f1, #4f46e5)",
              boxShadow: "0 8px 20px rgba(99,102,241,0.3)",
              transition: "0.3s",
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
        </Stack>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;

