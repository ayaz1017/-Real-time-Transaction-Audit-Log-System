import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#2563eb",
        lighter: mode === "dark" ? "rgba(37, 99, 235, 0.1)" : "rgba(37, 99, 235, 0.05)",
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
      h4: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 600,
      },
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
            textTransform: "none", // Avoid all-caps for a cleaner UI
            fontWeight: 600,
            padding: "8px 20px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none", 
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#1e293b" : "#ffffff",
            color: mode === "dark" ? "#f8fafc" : "#0f172a",
          },
        },
      },
    },
  });