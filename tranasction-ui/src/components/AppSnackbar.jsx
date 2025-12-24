import { Snackbar, Alert } from "@mui/material";

export default function AppSnackbar({ open, message, severity, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert severity={severity} onClose={onClose} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
