import { MenuItem, TextField } from "@mui/material";

export default function StatusFilter({ value, onChange }) {
  return (
    <TextField
      select
      size="small"
      label="Status"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ width: 150 }}
    >
      <MenuItem value="">All</MenuItem>
      <MenuItem value="SUCCESS">Success</MenuItem>
      <MenuItem value="FAILED">Failed</MenuItem>
      <MenuItem value="PENDING">Pending</MenuItem>
    </TextField>
  );
}
