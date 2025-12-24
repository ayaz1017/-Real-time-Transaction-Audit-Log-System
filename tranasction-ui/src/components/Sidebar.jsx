import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
  import SyncAltIcon from "@mui/icons-material/SyncAlt";
import HistoryIcon from "@mui/icons-material/History";

function Sidebar({ activePage, setActivePage, collapsed = false }) {
  const menu = [
    { label: "Dashboard", icon: <DashboardIcon /> },
    { label: "Transfers", icon: <SyncAltIcon /> },
    { label: "History", icon: <HistoryIcon /> },
  ];

  return (
    <List sx={{ mt: 1 }}>
      {menu.map((item) => (
        <ListItemButton
          key={item.label}
          selected={activePage === item.label}
          onClick={() => setActivePage(item.label)}
          sx={{
            borderRadius: 2,
            mx: 1,
            mb: 0.5,
            "&.Mui-selected": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "& .MuiListItemIcon-root": { color: "primary.contrastText" },
            },
            "&:hover": {
              bgcolor: "primary.lighter",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
          {!collapsed && <ListItemText primary={item.label} />}
        </ListItemButton>
      ))}
    </List>
  );
}

export default Sidebar;
