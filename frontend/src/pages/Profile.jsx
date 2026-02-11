import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { getProfile, updateProfile } from "../api/userApi";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile()
      .then((res) => setUser(res.data))
      .catch(() => alert("Failed to load profile"));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateProfile(user);
      alert("Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 12, maxWidth: "sm" }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar sx={{ width: 80, height: 80, mb: 1 }}>
              {user.name?.charAt(0)}
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              My Profile
            </Typography>
          </Box>

          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            value={user.name}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={user.email}
            disabled
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default Profile;
