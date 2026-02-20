// src/pages/TransactionDetails.jsx
import { useParams } from "react-router-dom";
import { Box, Typography, Chip } from "@mui/material";

export default function TransactionDetails({ rows }) {
  const { id } = useParams();
  const txn = rows.find((r) => r.id === Number(id));

  if (!txn) return <Typography>Not Found</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5">
        Transaction #{txn.id}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Sender: {txn.sender}
      </Typography>

      <Typography>
        Receiver: {txn.receiver}
      </Typography>

      <Typography>
        Amount: ₹{txn.amount}
      </Typography>

      <Typography>
        Risk Score: {txn.riskScore}
      </Typography>

      {txn.riskScore > 75 && (
        <Chip
          label="HIGH RISK"
          color="error"
          sx={{ mt: 2 }}
        />
      )}
    </Box>
  );
}