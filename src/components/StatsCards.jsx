
import { Grid, Card, CardContent, Typography, useTheme, Box } from "@mui/material";

export default function StatsCards({
  totalTransactions,
  successVolume,
  failedCount,
  pendingCount,
}) {
  const theme = useTheme();

  const stats = [
    { label: "Today's Volume", value: `₹${successVolume.toLocaleString()}`, trend: 12.5 },
    { label: "Total Transactions", value: totalTransactions.toString(), trend: 5.2 },
    { label: "Failed Transactions", value: failedCount.toString(), trend: -2.4 },
    { label: "Pending Transactions", value: pendingCount.toString(), trend: 1.1 },
  ];

  return (
    <Grid container spacing={2}>
      {stats.map((item) => {
        const isPositive = item.trend >= 0;
        return (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <Card
              sx={{
                height: "100%",
                transition: "all 0.15s ease-out",
                "&:hover": { boxShadow: 4, transform: "translateY(-2px)" },
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
                  {item.value}
                </Typography>
                <Box
                  sx={{
                    mt: 0.5,
                    fontSize: 12,
                    color: isPositive
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                  }}
                >
                  {isPositive ? `▲ ${item.trend}%` : `▼ ${Math.abs(item.trend)}%`} from yesterday
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
