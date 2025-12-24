// src/theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#2563eb",
        lighter:
          mode === "dark"
            ? "rgba(37, 99, 235, 0.1)"
            : "rgba(37, 99, 235, 0.05)",
      },
      secondary: {
        main: "#7c3aed",
      },
      background: {
        default: mode === "dark" ? "#0f172a" : "#f8fafc",
        paper: mode === "dark" ? "#1e293b" : "#ffffff",
      },
      success: {
        main: "#10b981",
        lighter: "rgba(16, 185, 129, 0.1)",
      },
      error: {
        main: "#ef4444",
        lighter: "rgba(239, 68, 68, 0.1)",
      },
      warning: {
        main: "#f59e0b",
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', sans-serif",
      h4: { fontWeight: 700 },
      h6: { fontWeight: 600 },
      subtitle2: {
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            padding: "8px 20px",
            borderRadius: 999,
            transition: "all 0.15s ease-out",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 8px 16px rgba(15,23,42,0.35)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 16,
            transition: "transform 0.18s ease-out, box-shadow 0.18s ease-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 18px 35px rgba(15,23,42,0.45)",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "dark" ? "#020617cc" : "#ffffffcc",
            color: mode === "dark" ? "#f8fafc" : "#0f172a",
            backdropFilter: "blur(12px)",
            boxShadow: "0 1px 0 rgba(15,23,42,0.7)",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            marginInline: 8,
            marginBlock: 2,
            transition: "background-color 0.15s ease-out, transform 0.1s ease-out",
            "&:hover": {
              transform: "translateX(2px)",
            },
          },
        },
      },
    },
  });
