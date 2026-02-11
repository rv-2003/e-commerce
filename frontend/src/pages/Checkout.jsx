import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createOrder } from "../api/orderApi";

const Checkout = ({ user }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage
  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Place order using backend
  const placeOrder = async () => {
    if (!user) {
      alert("⚠️ You must be logged in to place an order!");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);
      const orderItems = cart.map((item) => ({
        product: item._id,
        name: item.name,
        qty: item.qty,
        price: item.price,
        image: item.image,
      }));

      const orderData = {
        orderItems,
        totalPrice: total,
      };

      await createOrder(orderData);

      alert("🎉 Order placed successfully!");
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/orders"); // Redirect to order history
    } catch (error) {
      console.error(error);
      alert("❌ Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 12, mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        {cart.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              {cart.map((item) => (
                <Paper
                  key={item._id}
                  sx={{
                    p: 3,
                    mb: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography fontWeight={600}>{item.name}</Typography>
                    <Typography color="text.secondary">₹{item.price}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Button onClick={() => decreaseQty(item._id)}>-</Button>
                    <Typography>{item.qty}</Typography>
                    <Button onClick={() => increaseQty(item._id)}>+</Button>
                    <Button color="error" onClick={() => removeItem(item._id)}>
                      Remove
                    </Button>
                  </Box>

                  <Typography fontWeight={600}>₹{item.price * item.qty}</Typography>
                </Paper>
              ))}
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6">Order Summary</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography>Total Items: {cart.length}</Typography>
                <Typography sx={{ my: 2 }} fontWeight={600}>
                  Total: ₹{total}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={placeOrder}
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Checkout;

