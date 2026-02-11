import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/UserApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ INSIDE component

  const handleLogin = async () => {
  try {
    const res = await loginUser({ email, password });
    const user = res.data;
    console.log("Logged in user:", user);

    // Save in auth context
    login(user);

    // 🔹 Save to localStorage for persistence
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", user.token); // assuming backend returns token

    // Role-based redirect
    if (user.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};



  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: 350, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Login
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box sx={{ textAlign: "right", mt: 1 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/forgot-password")}
            sx={{ textDecoration: "none" }}
          >
            Forgot password?
          </Link>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography textAlign="center" mt={2}>
          Don’t have an account?{" "}
          <Link component="button" onClick={() => navigate("/signup")}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
