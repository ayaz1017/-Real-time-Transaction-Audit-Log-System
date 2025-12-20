
import { Switch, Tooltip, Box, Typography } from "@mui/material";

export default function AutoRefresh({ enabled, onToggle, lastUpdated }) {
  return (
    <Tooltip
      title={
        lastUpdated
          ? `Last updated at ${lastUpdated.toLocaleTimeString()}`
          : "Auto refresh"
      }
      arrow
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="caption" sx={{ mr: 1 }}>
          Auto
        </Typography>
        <Switch size="small" checked={enabled} onChange={onToggle} />
      </Box>
    </Tooltip>
  );
}
