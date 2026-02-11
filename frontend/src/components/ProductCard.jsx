import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Stack,
} from "@mui/material";

const ProductCard = ({ product, isAdmin, onDelete, onUpdate }) => {
  const [qtyInCart, setQtyInCart] = useState(0);

  // Check cart when component loads
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find((i) => i._id === product._id);
    if (item) setQtyInCart(item.qty);
  }, [product._id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      exists.qty += 1;
      setQtyInCart(exists.qty);
    } else {
      cart.push({ ...product, qty: 1 });
      setQtyInCart(1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Handle image (multer + base64 support)
  const imageUrl = product.image?.startsWith("data:")
    ? product.image
    : `http://localhost:5000/uploads/${product.image}`;

  return (
    <Card
      sx={{
        height: isAdmin ? 420 : 380, // extra space for admin buttons
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 4,
        },
      }}
    >
      {/* Image */}
      <Box sx={{ height: 200, overflow: "hidden" }}>
        <img
          src={imageUrl}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <CardContent>
        <Typography variant="h6" noWrap>
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            height: 40,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.description}
        </Typography>

        <Typography variant="h6" sx={{ mt: 1 }}>
          ₹{product.price}
        </Typography>
      </CardContent>

      <CardActions sx={{ flexDirection: "column", gap: 1 }}>
        {/* Add to Cart Button */}
        {!isAdmin && (
          <Button
            fullWidth
            variant={qtyInCart > 0 ? "outlined" : "contained"}
            onClick={handleAddToCart}
          >
            {qtyInCart > 0 ? `Add to Cart (${qtyInCart})` : "Add to Cart"}
          </Button>
        )}

        {/* Admin Buttons */}
        {isAdmin && (
          <Stack direction="row" spacing={1} sx={{ width: "100%", mt: 1 }}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => onUpdate(product)}
            >
              Update
            </Button>
            <Button
              fullWidth
              color="error"
              variant="outlined"
              onClick={() => onDelete(product._id)}
            >
              Delete
            </Button>
          </Stack>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;

