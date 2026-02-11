import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/categoryApi.js";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      if (editingId) {
        await updateCategory(editingId, { name });
        setEditingId(null);
      } else {
        await createCategory({ name });
      }

      setName("");
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditingId(category._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 12 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Category Management
        </Typography>
        <Typography color="text.secondary">
          Create and manage product categories
        </Typography>
      </Box>

      {/* Add / Update Card */}
      <Card
        sx={{
          mb: 4,
          p: 3,
          backdropFilter: "blur(10px)",
          border: "1px solid #e5e7eb",
        }}
      >
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            {editingId ? "Update" : "Add"}
          </Button>
        </Stack>
      </Card>

      <Divider sx={{ mb: 3 }} />

      {/* Category List */}
      {categories.length === 0 ? (
        <Typography color="text.secondary">
          No categories found.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {categories.map((cat) => (
            <Card
              key={cat._id}
              sx={{
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 4,
                },
              }}
            >
             <CardContent>
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
  >
    <Box>
      <Typography variant="h6">
        {cat.name}
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ wordBreak: "break-all" }}
      >
        ID: {cat._id}
      </Typography>
    </Box>

    <Box>
      <IconButton onClick={() => handleEdit(cat)}>
        <EditIcon />
      </IconButton>

      <IconButton
        color="error"
        onClick={() => handleDelete(cat._id)}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  </Stack>
</CardContent>

            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default AdminCategories;
