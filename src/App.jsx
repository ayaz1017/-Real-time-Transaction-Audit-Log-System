// src/App.jsx
import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { getTheme } from "./theme";

import Layout from "./components/Layout";
import StatsCards from "./components/StatsCards";
import TransactionsTable from "./components/TransactionsTable";
import HistoryTable from "./components/HistoryTable";
import TransferForm from "./components/TransferForm";
import AppSnackbar from "./components/AppSnackbar";
import Balance from "./components/Balance";

const initialRows = [
  { id: 1, sender: "USR001", receiver: "USR009", amount: 1200, status: "SUCCESS" },
  { id: 2, sender: "USR004", receiver: "USR002", amount: 500, status: "FAILED" },
  { id: 3, sender: "USR010", receiver: "USR003", amount: 950, status: "PENDING" },
];

const initialBalances = {
  USR001: 5000,
  USR002: 7000,
  USR003: 9000,
  USR004: 4000,
  USR009: 3000,
  USR010: 6000,
};

export default function App() {
  const [mode, setMode] = useState("dark");
  const [rows, setRows] = useState(initialRows);
  const [balances, setBalances] = useState(initialBalances);
  const [currentUserId] = useState("USR001");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateRange, setDateRange] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activePage, setActivePage] = useState("Dashboard");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [lastInsertedId, setLastInsertedId] = useState(null);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleTransferSubmit = ({ receiverId, amount }) => {
    const amt = Number(amount);

    if (!receiverId || !amt || amt <= 0) {
      setSnackbar({
        open: true,
        message: "Please enter a valid receiver and positive amount.",
        severity: "error",
      });
      return;
    }

    if (!balances[currentUserId] || balances[currentUserId] < amt) {
      setSnackbar({
        open: true,
        message: "Insufficient balance.",
        severity: "error",
      });
      return;
    }

    setBalances((prev) => ({
      ...prev,
      [currentUserId]: prev[currentUserId] - amt,
      [receiverId]: (prev[receiverId] || 0) + amt,
    }));

    const newTxn = {
      id: rows.length + 1,
      sender: currentUserId,
      receiver: receiverId,
      amount: amt,
      status: "SUCCESS",
      timestamp: new Date().toISOString(),
    };

    setRows((prev) => [newTxn, ...prev]);
    setLastInsertedId(newTxn.id);
    setLastUpdated(new Date());
    setSnackbar({
      open: true,
      message: "Transfer completed successfully.",
      severity: "success",
    });
  };

  const handleSnackbarClose = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const filteredRows = rows.filter((r) => {
    const matchesUser =
      r.sender === currentUserId || r.receiver === currentUserId;

    const matchesSearch =
      search.trim().length === 0 ||
      r.sender.toLowerCase().includes(search.toLowerCase()) ||
      r.receiver.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ? true : r.status === statusFilter;

    const matchesDate = true;

    return matchesUser && matchesSearch && matchesStatus && matchesDate;
  });

  const successVolume = filteredRows
    .filter((r) => r.status === "SUCCESS")
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);

  const failedCount = filteredRows.filter((r) => r.status === "FAILED").length;
  const pendingCount = filteredRows.filter((r) => r.status === "PENDING").length;

  const currentBalance = balances[currentUserId] || 0;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        search={search}
        setSearch={setSearch}
        autoRefresh={autoRefresh}
        setAutoRefresh={setAutoRefresh}
        lastUpdated={lastUpdated}
        mode={mode}
        toggleTheme={toggleTheme}
        activePage={activePage}
        setActivePage={setActivePage}
      >
        {activePage === "Dashboard" && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Balance userId={currentUserId} balance={currentBalance} />
            </Box>
            <StatsCards
              totalTransactions={filteredRows.length}
              successVolume={successVolume}
              failedCount={failedCount}
              pendingCount={pendingCount}
            />
            <Box sx={{ mt: 3 }}>
              <TransactionsTable
                rows={filteredRows}
                lastUpdated={lastUpdated}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                lastInsertedId={lastInsertedId}
              />
            </Box>
          </Box>
        )}

        {activePage === "Transfers" && (
          <Box sx={{ p: 3, maxWidth: 600 }}>
            <TransferForm onSubmit={handleTransferSubmit} />
          </Box>
        )}

        {activePage === "History" && (
          <Box sx={{ p: 3 }}>
            <HistoryTable rows={filteredRows} />
          </Box>
        )}

        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        />
      </Layout>
    </ThemeProvider>
  );
}
