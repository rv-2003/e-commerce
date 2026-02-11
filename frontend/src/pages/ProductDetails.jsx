import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { getProductById } from "../api/productApi";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qtyInCart, setQtyInCart] = useState(0);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Check cart AFTER product loads
  useEffect(() => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find((i) => i._id === product._id);

    if (item) setQtyInCart(item.qty);
    else setQtyInCart(0);
  }, [product]);

  // Update cart helper
  const updateCart = (newQty) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (i) => i._id === product._id
    );

    if (existingIndex > -1) {
      if (newQty === 0) {
        cart.splice(existingIndex, 1);
      } else {
        cart[existingIndex].qty = newQty;
      }
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQtyInCart(newQty);
  };

  const handleAdd = () => {
    updateCart(qtyInCart + 1);
  };

  const handleMinus = () => {
    if (qtyInCart > 0) {
      updateCart(qtyInCart - 1);
    }
  };

  if (!product) return null;

  const imageUrl = product.image?.startsWith("data:")
    ? product.image
    : `http://localhost:5000/uploads/${product.image}`;

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 12 }}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Grid container spacing={5}>
            
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  height: 400,
                  overflow: "hidden",
                  borderRadius: 3,
                }}
              >
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
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={600}>
                {product.name}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ my: 3 }}
              >
                {product.description}
              </Typography>

              <Typography variant="h5" sx={{ mb: 3 }}>
                ₹{product.price}
              </Typography>

              {/* Quantity Controls */}
              {qtyInCart === 0 ? (
                <Button
                  size="large"
                  variant="contained"
                  onClick={handleAdd}
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Button variant="outlined" onClick={handleMinus}>
                    -
                  </Button>

                  <Typography variant="h6">
                    {qtyInCart}
                  </Typography>

                  <Button variant="outlined" onClick={handleAdd}>
                    +
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default ProductDetails;

