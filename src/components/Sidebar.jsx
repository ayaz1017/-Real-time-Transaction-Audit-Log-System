import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import HistoryIcon from "@mui/icons-material/History";

function Sidebar({ collapsed }) {
  const menu = [
    { label: "Dashboard", icon: <DashboardIcon /> },
    { label: "Transfers", icon: <SyncAltIcon /> },
    { label: "History", icon: <HistoryIcon /> },
  ];

  return (
    <List>
      {menu.map((item) => (
        <ListItemButton
          key={item.label}
          sx={{
            justifyContent: collapsed ? "center" : "flex-start",
            px: collapsed ? 2 : 3,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: collapsed ? 0 : 2,
              justifyContent: "center",
            }}
          >
            {item.icon}
          </ListItemIcon>

          {!collapsed && <ListItemText primary={item.label} />}
        </ListItemButton>
      ))}
    </List>
  );
}

export default Sidebar;
