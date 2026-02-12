import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Divider,
  TextField,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createOrder } from "../api/orderApi";

const Checkout = ({ user: propUser }) => {
  const navigate = useNavigate();

  // User state: from prop or localStorage
  const [user, setUser] = useState(
    propUser || JSON.parse(localStorage.getItem("user")) || null
  );

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Update cart both in state and localStorage
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
      .map((item) => (item._id === id ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0);
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Place order
  const placeOrder = async () => {
    if (!user) {
      alert("⚠️ You must be logged in to place an order!");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const { address, city, postalCode, country } = shippingAddress;
    if (!address || !city || !postalCode || !country) {
      alert("Please fill in your shipping address!");
      return;
    }

    try {
      setLoading(true);

      // Prepare order items for backend
      const orderItems = cart.map((item) => ({
        product: item._id,
        qty: item.qty,
        name: item.name,
        price: item.price,
        image: item.image,
      }));

      const orderData = {
        orderItems,
        shippingAddress,
        paymentMethod,
      };

      await createOrder(orderData);

      alert("🎉 Order placed successfully!");
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/my-orders");
    } catch (error) {
      console.error(error);
      alert(
        "❌ Failed to place order: " +
          (error.response?.data?.error || error.message)
      );
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

              {/* Shipping Address */}
              <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Shipping Address
                </Typography>
                <TextField
                  fullWidth
                  label="Address"
                  value={shippingAddress.address}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      address: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="City"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, city: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Country"
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      country: e.target.value,
                    })
                  }
                  sx={{ mb: 2 }}
                />
              </Paper>

              {/* Payment Method */}
              <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Payment Method
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <MenuItem value="COD">Cash on Delivery</MenuItem>
                </TextField>
              </Paper>
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






