import { TextField, Stack } from "@mui/material";

export default function DateFilter({ from, to, setFrom, setTo }) {
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        type="date"
        size="small"
        label="From"
        InputLabelProps={{ shrink: true }}
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <TextField
        type="date"
        size="small"
        label="To"
        InputLabelProps={{ shrink: true }}
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
    </Stack>
  );
}
