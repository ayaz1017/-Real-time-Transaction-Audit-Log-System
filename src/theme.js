// src/theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#3b82f6" },
      background: {
        default: mode === "dark" ? "#0f172a" : "#f8fafc",
        paper: mode === "dark" ? "#1e293b" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "Inter, sans-serif",
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      subtitle2: { fontWeight: 500 },
    },
    shape: {
      borderRadius: 16,
    },
  });