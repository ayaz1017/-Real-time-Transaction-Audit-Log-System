import { Box } from "@mui/material";
import TransferForm from "../components/TransferForm";

export default function Transfers({ onSubmit }) {
  return (
    <Box sx={{ p: 3, maxWidth: 600 }}>
      <TransferForm onSubmit={onSubmit} />
    </Box>
  );
}