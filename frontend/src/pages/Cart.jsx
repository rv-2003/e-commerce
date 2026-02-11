import {
  Container,
  Typography,
  Button,
  Paper,
  IconButton,
  Stack,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Update localStorage + state
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
      .filter((item) => item.qty > 0); // remove if 0

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 12 }}>
        <Typography variant="h4" gutterBottom>
          🛒 Cart
        </Typography>

        {cart.length === 0 && (
          <Typography>Your cart is empty</Typography>
        )}

        {cart.map((item) => (
          <Paper
            key={item._id}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Typography fontWeight={600}>
                {item.name}
              </Typography>
              <Typography color="text.secondary">
                ₹{item.price}
              </Typography>
            </div>

            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton onClick={() => decreaseQty(item._id)}>
                <Remove />
              </IconButton>

              <Typography>{item.qty}</Typography>

              <IconButton onClick={() => increaseQty(item._id)}>
                <Add />
              </IconButton>

              <IconButton
                color="error"
                onClick={() => removeItem(item._id)}
              >
                <Delete />
              </IconButton>
            </Stack>

            <Typography fontWeight={600}>
              ₹{item.price * item.qty}
            </Typography>
          </Paper>
        ))}

        {cart.length > 0 && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Total: ₹{total}
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;


