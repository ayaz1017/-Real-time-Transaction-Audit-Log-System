
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import GlobalSearch from "./GlobalSearch";
import AutoRefresh from "./AutoRefresh";

const drawerWidth = 240;

export default function Layout({
  children,
  search,
  setSearch,
  autoRefresh,
  setAutoRefresh,
  lastUpdated,
  mode,
  toggleTheme,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Transfers", icon: <SwapHorizIcon />, path: "/transfers" },
    { text: "History", icon: <HistoryIcon />, path: "/history" },
  ];

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            FINTECHOS
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <GlobalSearch value={search} onChange={setSearch} />
            <AutoRefresh
              enabled={autoRefresh}
              onToggle={() => setAutoRefresh((prev) => !prev)}
              lastUpdated={lastUpdated}
            />
            <IconButton color="inherit" onClick={toggleTheme}>
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Typography variant="body2">Admin • Fintech</Typography>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => {
                setActiveItem(item.text);
                handleDrawerClose();
              }}
              selected={activeItem === item.text}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
