import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgotPassword } from "../api/authApi";

export default function ForgotPassword() {
  const navigate = useNavigate(); // ✅ missing
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");
      const res = await forgotPassword(email);
      setMsg(res.data.message);
    } catch (err) {
      setMsg("");
      setError(err.response?.data?.message || "Error sending reset link");
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
      <Paper elevation={6} sx={{ p: 4, width: 360, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
          Forgot Password
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Enter your registered email address and we’ll send you a reset link.
        </Typography>

        {/* SUCCESS / ERROR MESSAGE */}
        {msg && <Alert severity="success" sx={{ mb: 2 }}>{msg}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="Email Address"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} // ✅ connected
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleSubmit} // ✅ connected
        >
          Send Reset Link
        </Button>

        <Typography variant="body2" textAlign="center" mt={2}>
          Remembered your password?{" "}
          <Link
            component="button"
            onClick={() => navigate("/login")}
            underline="none"
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
