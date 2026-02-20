// src/App.jsx
import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getTheme } from "./theme";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TransactionDetails from "./pages/TransactionDetails";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

const initialRows = [
  {
    id: 1,
    sender: "USR001",
    receiver: "USR009",
    amount: 1200,
    status: "SUCCESS",
    timestamp: new Date().toISOString(),
    riskScore: 82, // 🔥 FORCE TEST HIGH RISK
  },
];

export default function App() {
  const [mode, setMode] = useState("dark");
  const [rows, setRows] = useState(initialRows);
  const [notifications, setNotifications] = useState([]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  // ✅ CORRECT simulation (no dependency bug)
  useEffect(() => {
    const interval = setInterval(() => {
      const riskScore = Math.floor(Math.random() * 100);

      setRows((prev) => {
        const newTxn = {
          id: prev.length + 1,
          sender: "USR00" + Math.floor(Math.random() * 9),
          receiver: "USR00" + Math.floor(Math.random() * 9),
          amount: Math.floor(Math.random() * 5000),
          status: ["SUCCESS", "FAILED", "PENDING"][
            Math.floor(Math.random() * 3)
          ],
          timestamp: new Date().toISOString(),
          riskScore,
        };

        if (riskScore > 75) {
          setNotifications((prevNotif) => [
            {
              id: Date.now(),
              message: `🚨 High Risk Transaction (ID: ${newTxn.id})`,
            },
            ...prevNotif,
          ]);
        }

        return [newTxn, ...prev];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Layout
          toggleTheme={() =>
            setMode((prev) => (prev === "dark" ? "light" : "dark"))
          }
          mode={mode}
          notifications={notifications}
        >
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard rows={rows} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/transactions/:id"
              element={
                <ProtectedRoute>
                  <TransactionDetails rows={rows} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}