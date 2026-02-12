import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Loaded user from localStorage:", storedUser);
    setUser(storedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("token"); // if you store token separately
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: "black",
        borderBottom: "1px solid #eee",
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto" }}>
        {/* Logo */}
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: "none", color: "black" }}
        >
          ShopEase
        </Typography>

        <Box display="flex" alignItems="center">
          {/* ================= REGULAR USER BUTTONS ================= */}
          {user && !user.isAdmin && (
            <>
              <Button component={Link} to="/products">
                Products
              </Button>

              <Button component={Link} to="/cart">
                Cart
              </Button>
            </>
          )}

          {/* ================= USER LOGIC ================= */}
          {user ? (
            <>
              {/* Admin Dashboard */}
              {user.isAdmin && (
                <Button
                  component={Link}
                  to="/admin"
                  sx={{ ml: 2 }}
                >
                  Admin
                </Button>
              )}

              {/* Non-Admin Profile */}
              {!user.isAdmin && (
                <IconButton
                  component={Link}
                  to="/profile"
                  sx={{ ml: 1 }}
                >
                  <AccountCircleIcon />
                </IconButton>
              )}

              {/* Logout */}
              <Button sx={{ ml: 2 }} onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Not Logged In */}
              <Button component={Link} to="/login">
                Login
              </Button>

              <Button
                variant="contained"
                component={Link}
                to="/register"
                sx={{ ml: 2 }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

