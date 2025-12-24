import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import AutoRefresh from "./AutoRefresh";
import Sidebar from "./Sidebar";

const drawerWidth = 240;

export default function Layout({
  children,
  search,          // kept in props but unused now
  setSearch,       // kept in props but unused now
  autoRefresh,
  setAutoRefresh,
  lastUpdated,
  mode,
  toggleTheme,
  activePage,
  setActivePage,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top bar with FINTECHOS + hamburger */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "background.paper",
          color: "text.primary",
          backdropFilter: "blur(12px)",
          boxShadow: "0 1px 0 rgba(15,23,42,0.7)",
        }}
      >
        <Toolbar>
          {/* FINTECHOS + menu icon */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
              FINTECHOS
            </Typography>
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              sx={{
                ml: 1,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "&:hover": { bgcolor: "primary.dark" },
              }}
              size="small"
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AutoRefresh
              autoRefresh={autoRefresh}
              onToggle={() => setAutoRefresh((prev) => !prev)}
              lastUpdated={lastUpdated}
            />

            <IconButton color="inherit" onClick={toggleTheme}>
              {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>

            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side drawer only opens from the FINTECHOS menu icon now */}
      <Drawer
        variant="temporary"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "background.default",
            borderRight: "1px solid rgba(148,163,184,0.4)",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <Sidebar
          activePage={activePage}
          setActivePage={(page) => {
            setActivePage(page);
            handleDrawerClose();
          }}
          collapsed={false}
        />
      </Drawer>

      {/* Main content full‑width (no permanent sidebar) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          mt: 8,
          ml: 0,
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
