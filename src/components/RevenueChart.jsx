// src/components/RevenueChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";

const data = [
  { name: "Mon", revenue: 4000 },
  { name: "Tue", revenue: 3000 },
  { name: "Wed", revenue: 5000 },
  { name: "Thu", revenue: 2780 },
  { name: "Fri", revenue: 1890 },
];

export default function RevenueChart() {
  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 4,
        backdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.05)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Weekly Revenue
      </Typography>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}