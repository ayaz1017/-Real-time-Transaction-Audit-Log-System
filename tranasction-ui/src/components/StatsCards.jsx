// src/components/StatsCards.jsx
import { Grid, Card, CardContent, Typography, Box, Chip } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import PaymentsIcon from "@mui/icons-material/Payments";

const ICONS = {
  "Today's Volume": <PaymentsIcon />,
  "Total Transactions": <TrendingUpIcon />,
  "Failed Transactions": <TrendingDownIcon />,
  "Pending Transactions": <HourglassTopIcon />,
};

export default function StatsCards({
  totalTransactions,
  successVolume,
  failedCount,
  pendingCount,
}) {
  const stats = [
    {
      label: "Today's Volume",
      value: `₹${successVolume.toLocaleString()}`,
      trend: 12.5,
      color: "success",
    },
    {
      label: "Total Transactions",
      value: totalTransactions.toString(),
      trend: 5.2,
      color: "primary",
    },
    {
      label: "Failed Transactions",
      value: failedCount.toString(),
      trend: -2.4,
      color: "error",
    },
    {
      label: "Pending Transactions",
      value: pendingCount.toString(),
      trend: 1.1,
      color: "warning",
    },
  ];

  return (
    <Grid container spacing={2}>
      {stats.map((item) => {
        const isPositive = item.trend >= 0;
        const trendLabel = `${isPositive ? "▲" : "▼"} ${Math.abs(
          item.trend
        )}%`;

        return (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Card
              sx={(theme) => ({
                height: "100%",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(148,163,184,0.15), rgba(15,23,42,0.9))"
                    : "linear-gradient(135deg, #e5e7eb, #cbd5f5)",
                backdropFilter: "blur(10px)",
                boxShadow: 4,
              })}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={(theme) => ({
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: `${item.color}.lighter`,
                      color: `${item.color}.main`,
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 0 0 1px rgba(15,23,42,0.7)"
                          : "0 0 0 1px rgba(148,163,184,0.4)",
                    })}
                  >
                    {ICONS[item.label]}
                  </Box>

                  <Chip
                    size="small"
                    label={trendLabel}
                    color={isPositive ? "success" : "error"}
                    variant="filled"
                    sx={(theme) => ({
                      fontWeight: 600,
                      ...(theme.palette.mode === "light" && {
                        bgcolor: isPositive
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                        color: theme.palette.common.white,
                      }),
                    })}
                  />
                </Box>

                <Typography variant="subtitle2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ mt: 0.5, fontWeight: 700, letterSpacing: 0.3 }}
                >
                  {item.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  vs yesterday
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
