// src/components/Layout.jsx

import { useState } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const drawerWidth = 240;

export default function Layout({
  children,
  toggleTheme,
  mode,
  notifications = [],
  autoRefresh,
  setAutoRefresh,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Transfers", icon: <SwapHorizIcon />, path: "/transfers" },
    { label: "History", icon: <HistoryIcon />, path: "/history" },
    { label: "Analytics", icon: <AnalyticsIcon />, path: "/analytics" },
    { label: "Wallet", icon: <AccountBalanceWalletIcon />, path: "/wallet" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* ================= NAVBAR ================= */}
      <Navbar
        toggleTheme={toggleTheme}
        mode={mode}
        notifications={notifications}
        onMenuClick={() => setDrawerOpen(true)}
        autoRefresh={autoRefresh}
        setAutoRefresh={setAutoRefresh}
      />

      {/* ================= SIDEBAR ================= */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#0f172a",
            color: "#fff",
          },
        }}
      >
        <Toolbar />
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                "&.Mui-selected": {
                  background:
                    "linear-gradient(90deg, rgba(59,130,246,0.2), transparent)",
                  boxShadow: "0 0 12px rgba(59,130,246,0.4)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          p: 4,
          background: `
            radial-gradient(circle at 10% 20%, #1e293b 0%, transparent 40%),
            radial-gradient(circle at 80% 30%, #0f172a 0%, transparent 40%),
            linear-gradient(135deg, #0f172a, #1e293b)
          `,
        }}
      >
        {/* Spacer for fixed Navbar */}
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}