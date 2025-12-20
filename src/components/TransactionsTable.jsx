
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip, Button, Typography, Stack } from "@mui/material";
import StatusFilter from "./StatusFilter";
import DateFilter from "./DateFilter";

export default function TransactionsTable({
  rows,
  lastUpdated,
  statusFilter,
  setStatusFilter,
  lastInsertedId,
}) {
  const exportCSV = () => {
    const header = "ID,Sender,Receiver,Amount,Status\n";
    const body = rows
      .map(
        (r) =>
          `${r.id},${r.sender},${r.receiver},${r.amount},${r.status}`
      )
      .join("\n");
    const csv = header + body;

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  const columns = [
    { field: "id", headerName: "Txn ID", width: 90 },
    { field: "sender", headerName: "Sender", flex: 1 },
    { field: "receiver", headerName: "Receiver", flex: 1 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      valueFormatter: (params) => `₹${params.value}`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const value = params.value;
        let color = "default";
        if (value === "SUCCESS") color = "success";
        else if (value === "FAILED") color = "error";
        else if (value === "PENDING") color = "warning";

        return <Chip label={value} color={color} size="small" />;
      },
    },
  ];

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recent Transactions
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
          <DateFilter value={null} onChange={() => {}} />
          <Button variant="outlined" size="small" onClick={exportCSV}>
            Export CSV
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ height: 420 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          getRowClassName={(params) =>
            params.id === lastInsertedId ? "row-new" : ""
          }
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
