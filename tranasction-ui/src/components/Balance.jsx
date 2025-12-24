
import { Card, CardContent, Typography } from "@mui/material";

export default function Balance({ userId, balance }) {
  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          Current Balance ({userId})
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
          ₹{balance.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
