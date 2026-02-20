// src/components/layout/Navbar.jsx

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Switch,
  Badge,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Navbar({
  toggleTheme,
  mode,
  onMenuClick,
  notifications = [],
  autoRefresh = false,
  setAutoRefresh = () => {},
}) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: "blur(18px)",
        backgroundColor: "rgba(15,23,42,0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "64px !important",
          px: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* ================= LEFT SIDE ================= */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "1px",
              background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FINTECHOS
          </Typography>

          {/* Menu Button */}
          <IconButton
            onClick={onMenuClick}
            sx={{
              bgcolor: "rgba(255,255,255,0.08)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* ================= RIGHT SIDE ================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Auto Refresh Toggle */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "rgba(255,255,255,0.08)",
              px: 2,
              py: 0.5,
              borderRadius: 2,
            }}
          >
            <Typography variant="caption">Auto</Typography>
            <Switch
              size="small"
              checked={autoRefresh}
              onChange={() =>
                setAutoRefresh((prev) => !prev)
              }
            />
          </Box>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              sx={{
                bgcolor: "rgba(255,255,255,0.08)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              <Badge
                badgeContent={notifications.length}
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Theme Toggle */}
          <Tooltip title="Toggle Theme">
            <IconButton
              onClick={toggleTheme}
              sx={{
                bgcolor: "rgba(255,255,255,0.08)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              {mode === "dark" ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
          </Tooltip>

          {/* Profile */}
          <Tooltip title="Profile">
            <IconButton
              sx={{
                bgcolor: "rgba(255,255,255,0.08)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}