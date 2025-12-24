// src/App.jsx
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { ThemeProvider, CssBaseline, Box, Typography } from "@mui/material";

import { getTheme } from "./theme";
import Layout from "./components/Layout";
import StatsCards from "./components/StatsCards";
import TransactionsTable from "./components/TransactionsTable";
import HistoryTable from "./components/HistoryTable";
import TransferForm from "./components/TransferForm";
import AppSnackbar from "./components/AppSnackbar";
import Balance from "./components/Balance";

const API_BASE = "http://127.0.0.1:8000/api";

export default function App() {
  const [mode, setMode] = useState("dark");
  const [rows, setRows] = useState([]);
  const [balances, setBalances] = useState({});
  const [currentUserId] = useState("USR001"); // current dashboard user
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
  const [loading, setLoading] = useState(false);

  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggleTheme = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  // 1) Load accounts + audit log from backend
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [accountsRes, txnsRes] = await Promise.all([
          axios.get(`${API_BASE}/accounts/`),
          axios.get(`${API_BASE}/audit-log/`, {
            params: { user_id: currentUserId },
          }),
        ]);

        // build balances map: { USR001: 1067, ... }
        const balancesObj = {};
        accountsRes.data.forEach((acc) => {
          balancesObj[acc.user_id] = Number(acc.balance);
        });
        setBalances(balancesObj);

        const txns = txnsRes.data.map((t) => ({
          id: t.id,
          sender: t.sender,
          receiver: t.receiver,
          amount: Number(t.amount),
          status: t.status,
          timestamp: t.created_at,
        }));
        console.log("Loaded txns from API:", txns);
        setRows(txns);
        setLastUpdated(new Date());
      } catch (err) {
        setSnackbar({
          open: true,
          message: "Failed to load data from server.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [currentUserId]);

  // 2) Optional auto‑refresh of timestamp
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => setLastUpdated(new Date()), 5000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // 3) Transfer money via API and update state
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

    // TEMP: disable client-side balance check while wiring things up.
    // Re-enable later if desired.
    /*
    if ((balances[currentUserId] || 0) < amt) {
      setSnackbar({
        open: true,
        message: "Insufficient balance (client check).",
        severity: "error",
      });
      return;
    }
    */

    axios
      .post(`${API_BASE}/transfer/`, {
        sender: currentUserId,
        receiver: receiverId,
        amount: amt,
      })
      .then((res) => {
        const txn = res.data;

        // update balances using server amount
        setBalances((prev) => ({
          ...prev,
          [currentUserId]:
            (prev[currentUserId] || 0) - Number(txn.amount),
          [receiverId]: (prev[receiverId] || 0) + Number(txn.amount),
        }));

        // add new transaction to top
        const uiTxn = {
          id: txn.id,
          sender: txn.sender,
          receiver: txn.receiver,
          amount: Number(txn.amount),
          status: txn.status,
          timestamp: txn.created_at,
        };
        setRows((prev) => [uiTxn, ...prev]);
        setLastInsertedId(uiTxn.id);
        setLastUpdated(new Date());

        setSnackbar({
          open: true,
          message: "Transfer completed and saved.",
          severity: "success",
        });
      })
      .catch((err) => {
        const serverMsg =
          err.response?.data?.detail ||
          err.response?.data?.error ||
          JSON.stringify(err.response?.data || {});
        setSnackbar({
          open: true,
          message: `Transfer failed: ${serverMsg}`,
          severity: "error",
        });
      });
  };

  const handleSnackbarClose = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  // 4) Filter rows for current user + search + status
  const filteredRows = rows.filter((r) => {
    const matchesUser =
      r.sender === currentUserId || r.receiver === currentUserId;

    const matchesSearch =
      !search.trim() ||
      r.sender.toLowerCase().includes(search.toLowerCase()) ||
      r.receiver.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ? true : r.status === statusFilter;

    const matchesDate = true; // TODO: hook dateRange into filter

    return matchesUser && matchesSearch && matchesStatus && matchesDate;
  });

  const successVolume = filteredRows
    .filter((r) => r.status === "SUCCESS")
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const failedCount = filteredRows.filter((r) => r.status === "FAILED").length;
  const pendingCount = filteredRows.filter((r) => r.status === "PENDING").length;
  const currentBalance = balances[currentUserId] || 0;

  const pageBackground = (theme) =>
    theme.palette.mode === "dark"
      ? "radial-gradient(circle at top, #1f2937 0, #020617 45%, #020617 100%)"
      : "radial-gradient(circle at top, #e5edff 0, #f8fafc 45%, #f8fafc 100%)";

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
        {/* DASHBOARD */}
        {activePage === "Dashboard" && (
          <Box
            sx={{
              p: 3,
              pl: 4,
              minHeight: "100vh",
              background: pageBackground(theme),
            }}
          >
            <Box sx={{ maxWidth: 1200 }}>
              <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 600 }}>
                Overview
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, opacity: 0.8 }}
              >
                Dashboard • Realtime account performance
              </Typography>

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
                  loading={loading}
                />
              </Box>
            </Box>
          </Box>
        )}

        {/* TRANSFERS */}
        {activePage === "Transfers" && (
          <Box
            sx={{
              p: 3,
              pl: 4,
              minHeight: "100vh",
              background: pageBackground(theme),
            }}
          >
            <Box sx={{ maxWidth: 700 }}>
              <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 600 }}>
                Transfers
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, opacity: 0.8 }}
              >
                Send money instantly between users
              </Typography>

              <TransferForm onSubmit={handleTransferSubmit} />
            </Box>
          </Box>
        )}

        {/* HISTORY */}
        {activePage === "History" && (
          <Box
            sx={{
              p: 3,
              pl: 4,
              minHeight: "100vh",
              background: pageBackground(theme),
            }}
          >
            <Box sx={{ maxWidth: 1200 }}>
              <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 600 }}>
                History
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, opacity: 0.8 }}
              >
                Detailed log of your past transactions
              </Typography>

              <HistoryTable rows={filteredRows} loading={loading} />
            </Box>
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
