// src/components/StatsCards.jsx
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import CountUp from "react-countup";

export default function StatsCards({
  totalTransactions,
  successVolume,
  failedCount,
  pendingCount,
}) {
  const theme = useTheme();

  const stats = [
    { label: "Today's Volume", value: successVolume },
    { label: "Total Transactions", value: totalTransactions },
    { label: "Failed", value: failedCount },
    { label: "Pending", value: pendingCount },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.label}>
          <Card
            sx={{
              backdropFilter: "blur(20px)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 4,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-6px)",
              },
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="gray">
                {item.label}
              </Typography>

              <Typography variant="h4" sx={{ mt: 1 }}>
                <CountUp end={item.value} duration={1.2} separator="," />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}