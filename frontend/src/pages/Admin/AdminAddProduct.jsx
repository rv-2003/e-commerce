import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Stack,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { createProduct } from "../../api/productApi";

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    brand: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle normal input fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const { data } = await createProduct(formData);

      alert("✅ Product Added Successfully");

      // Reset form
      setForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
        brand: "",
        category: "",
        image: null,
      });

      setPreview(null);

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Add New Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Product Name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              name="description"
              label="Description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              required
            />

            <TextField
              name="price"
              label="Price"
              type="number"
              value={form.price}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              name="quantity"
              label="Quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              name="brand"
              label="Brand"
              value={form.brand}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              name="category"
              label="Category ID"
              value={form.category}
              onChange={handleChange}
              fullWidth
              required
            />

            {/* Image Upload */}
            <Button
              variant="outlined"
              component="label"
              sx={{ py: 1.2 }}
            >
              Upload Product Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {/* Image Preview */}
            {preview && (
              <Box
                component="img"
                src={preview}
                alt="Preview"
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                  mt: 1,
                }}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminAddProduct;
