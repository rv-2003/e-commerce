import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#111827", // dark slate
    },
    secondary: {
      main: "#6366f1", // indigo
    },
    background: {
      default: "#f9fafb",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 14,
  },
});

export default theme;
