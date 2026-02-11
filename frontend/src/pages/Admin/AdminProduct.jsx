import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { getProducts, deleteProduct } from "../../api/productApi";
import ProductCard from "../../components/ProductCard";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.products);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        console.log("Error deleting product:", error);
      }
    }
  };

  // Update Product (navigate to update page or open modal)
  const handleUpdate = (product) => {
    // For example, navigate to /admin/product/update/:id
    // Or open a modal with prefilled product details
    console.log("Update product:", product);
  };

  return (
    <Container sx={{ mt: 12 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        All Products
      </Typography>

      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard
  product={product}
  isAdmin={true}          // enable admin buttons
  onDelete={handleDelete}
  onUpdate={handleUpdate}
/>

            </Grid>
          ))
        ) : (
          <Typography>No Products Found</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default AdminProducts;



