import { useEffect, useState } from "react";
import { Grid, Container, Box, Typography, List, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch all categories
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch products
  useEffect(() => {
    getProducts()
      .then((res) => {
        // If a category is selected, filter products by category
        if (selectedCategory) {
          setProducts(res.data.products.filter(p => p.category === selectedCategory));
        } else {
          setProducts(res.data.products);
        }
      })
      .catch((err) => console.error(err));
  }, [selectedCategory]);

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 12 }}>
        <Grid container spacing={4}>
          
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Box sx={{ border: "1px solid #eee", borderRadius: 2, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Categories
              </Typography>
              <List>
                <ListItemButton
                  selected={!selectedCategory}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </ListItemButton>
                {categories.map((cat) => (
                  <ListItemButton
                    key={cat._id}
                    selected={selectedCategory === cat._id}
                    onClick={() => setSelectedCategory(cat._id)}
                  >
                    {cat.name}
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Grid>

          {/* Product Grid */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <Link
                    to={`/product/${product._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ProductCard product={product} />
                  </Link>
                </Grid>
              ))}
              {products.length === 0 && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  No products found in this category.
                </Typography>
              )}
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </>
  );
};

export default Products;





