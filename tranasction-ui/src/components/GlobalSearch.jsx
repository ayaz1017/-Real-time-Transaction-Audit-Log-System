import { TextField } from "@mui/material";

export default function GlobalSearch({ value, onChange }) {
  return (
    <TextField
      size="small"
      placeholder="Search transactions..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        minWidth: 220,
        bgcolor: "background.paper",
        borderRadius: 2,
      }}
    />
  );
}
