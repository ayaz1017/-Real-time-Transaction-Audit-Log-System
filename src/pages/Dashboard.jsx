// src/pages/Dashboard.jsx
import { Box, Typography } from "@mui/material";
import TransactionsTable from "../components/TransactionsTable";

export default function Dashboard({ rows }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <TransactionsTable rows={rows} />
    </Box>
  );
}