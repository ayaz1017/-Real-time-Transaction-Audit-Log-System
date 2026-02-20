import { Box } from "@mui/material";
import HistoryTable from "../components/HistoryTable";

export default function History({ rows }) {
  return (
    <Box sx={{ p: 3 }}>
      <HistoryTable rows={rows} />
    </Box>
  );
}