import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Loaded user from localStorage:", storedUser);
    setUser(storedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user"); // Remove user
    localStorage.removeItem("cart"); // Optional: clear cart
    setUser(null); // Update state
    navigate("/login"); // Navigate to login
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
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: "none", color: "black" }}
        >
          ShopEase
        </Typography>

        <Box>
          <Button component={Link} to="/products">
            Products
          </Button>

          <Button component={Link} to="/cart">
            Cart
          </Button>

          {user ? (
            <Button sx={{ ml: 2 }} onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
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
