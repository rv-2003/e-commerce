import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import {
  getTopProducts,
  getNewProducts,
} from "../api/productApi";

const Home = () => {
  const [top, setTop] = useState([]);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    getTopProducts().then((res) => setTop(res.data));
    getNewProducts().then((res) => setLatest(res.data));
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <Box
        sx={{
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "#fff",
          textAlign: "center",
          px: 2,
        }}
      >
        <Box>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Discover Your Style
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Premium products. Best prices. New arrivals every day.
          </Typography>
        </Box>
      </Box>

      <Container sx={{ mt: 10, mb: 10 }}>
        {/* TOP PRODUCTS */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          🔥 Top Products
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Best-selling products loved by our customers
        </Typography>

        <Grid container spacing={4} mb={8}>
          {top.map((p) => (
            <Grid item xs={12} sm={6} md={3} key={p._id}>
              <Box
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                <ProductCard product={p} />
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 6 }} />

        {/* NEW ARRIVALS */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          🆕 New Arrivals
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Fresh collections just dropped
        </Typography>

        <Grid container spacing={4}>
          {latest.map((p) => (
            <Grid item xs={12} sm={6} md={3} key={p._id}>
              <Box
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                  },
                }}
              >
                <ProductCard product={p} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;


