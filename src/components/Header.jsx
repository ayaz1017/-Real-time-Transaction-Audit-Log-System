import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

function Header({ collapsed, setCollapsed }) {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <DashboardIcon sx={{ mr: collapsed ? 0 : 1 }} />
          {!collapsed && (
            <Typography fontWeight="bold">
              FintechAdmin
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
