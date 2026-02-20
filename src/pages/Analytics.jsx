import { Box, Typography } from "@mui/material";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { day: "Mon", value: 1000 },
  { day: "Tue", value: 2000 },
  { day: "Wed", value: 1500 },
  { day: "Thu", value: 2500 },
  { day: "Fri", value: 3000 },
];

export default function Analytics() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5">Analytics</Typography>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}