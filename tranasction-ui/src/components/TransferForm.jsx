// src/components/TransferForm.jsx

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

export default function TransferForm({ onSubmit }) {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClose = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const handleTransfer = () => {
    if (!receiverId || !amount) {
      setSnackbar({
        open: true,
        message: "Receiver ID and amount are required.",
        severity: "error",
      });
      return;
    }

    if (Number(amount) <= 0) {
      setSnackbar({
        open: true,
        message: "Amount must be positive.",
        severity: "error",
      });
      return;
    }

    if (onSubmit) {
      onSubmit({ receiverId, amount });
      setSnackbar({
        open: true,
        message: "Transfer initiated.",
        severity: "success",
      });
      setAmount("");
      setReceiverId("");
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 480 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Send Money
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="To User ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          fullWidth
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleTransfer} fullWidth>
          Send
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
