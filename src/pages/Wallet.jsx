import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const COLORS = ["#3b82f6", "#ef4444"];

export default function Wallet({ balance }) {
  const data = [
    { name: "Available", value: balance },
    { name: "Locked", value: balance * 0.2 },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5">Wallet Overview</Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography>Available Balance</Typography>
              <Typography variant="h4">₹{balance}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} dataKey="value" outerRadius={100}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
}