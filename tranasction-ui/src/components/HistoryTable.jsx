
import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Tabs,
  Tab,
  TextField,
  Box,
  Skeleton,
  TableSortLabel,
  Typography,
} from "@mui/material";

function sortRows(rows, orderBy, order) {
  return [...rows].sort((a, b) => {
    const aVal = a[orderBy];
    const bVal = b[orderBy];

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
}

export default function HistoryTable({ rows }) {
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(field);
      setOrder("asc");
    }
  };

  const filtered = rows.filter((r) => {
    const matchesStatus = status === "ALL" || r.status === status;
    const matchesSearch =
      search.trim().length === 0 ||
      r.sender.includes(search) ||
      r.receiver.includes(search);
    return matchesStatus && matchesSearch;
  });

  const sortedRows = sortRows(filtered, orderBy, order);

  return (
    <Paper sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Transaction History
          </Typography>
          <Tabs
            value={status}
            onChange={(_, v) => setStatus(v)}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
          >
            <Tab label="All" value="ALL" />
            <Tab label="Success" value="SUCCESS" />
            <Tab label="Failed" value="FAILED" />
            <Tab label="Pending" value="PENDING" />
          </Tabs>
        </Box>

        <TextField
          size="small"
          label="Search by user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {loading ? (
        <Box>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height={40} sx={{ mb: 1 }} />
          ))}
        </Box>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              {[
                { key: "id", label: "Txn ID" },
                { key: "sender", label: "Sender" },
                { key: "receiver", label: "Receiver" },
                { key: "amount", label: "Amount" },
                { key: "status", label: "Status" },
              ].map((h) => (
                <TableCell key={h.key}>
                  <TableSortLabel
                    active={orderBy === h.key}
                    direction={orderBy === h.key ? order : "asc"}
                    onClick={() => handleSort(h.key)}
                  >
                    {h.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.sender}</TableCell>
                <TableCell>{r.receiver}</TableCell>
                <TableCell>₹{r.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={r.status}
                    size="small"
                    color={
                      r.status === "SUCCESS"
                        ? "success"
                        : r.status === "FAILED"
                        ? "error"
                        : "warning"
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
