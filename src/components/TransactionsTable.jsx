// src/components/TransactionsTable.jsx
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TransactionsTable({ rows }) {
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "Txn ID", width: 90 },

    { field: "sender", headerName: "Sender", flex: 1 },

    { field: "receiver", headerName: "Receiver", flex: 1 },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      valueFormatter: (params) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(params.value),
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const riskScore = params.row.riskScore;

        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label={params.value}
              size="small"
              color={
                params.value === "SUCCESS"
                  ? "success"
                  : params.value === "FAILED"
                  ? "error"
                  : "warning"
              }
            />

            {riskScore > 75 && (
              <Chip
                label="HIGH RISK"
                color="error"
                size="small"
              />
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 500 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        onRowClick={(params) =>
          navigate(`/transactions/${params.id}`)
        }
      />
    </Box>
  );
}