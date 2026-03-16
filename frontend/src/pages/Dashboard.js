// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Paper, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import { FaUpload, FaChartLine, FaUserMd, FaHeartbeat } from "react-icons/fa";
import DashboardCard from "../components/DashboardCard";

const Dashboard = ({ onUploadClick, onNavigate }) => {
  // Example data
  const [totalRecords, setTotalRecords] = useState(0);
  const [healthAlerts, setHealthAlerts] = useState(0);
  const [lastReport, setLastReport] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setTotalRecords(8);
      setHealthAlerts(1);
      setLastReport("2 days ago");
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    {
      icon: <FaUpload />,
      label: "Upload Report",
      color: "#2196f3",
      onClick: onUploadClick,
    },
    {
      icon: <FaHeartbeat />,
      label: "Health Insights",
      color: "#9c27b0",
      onClick: () => onNavigate("Health Insights"),
    },
    {
      icon: <FaChartLine />,
      label: "View Timeline",
      color: "#4caf50",
      onClick: () => onNavigate("Medical Timeline"),
    },
    {
      icon: <FaUserMd />,
      label: "Emergency Profile",
      color: "#f44336",
      onClick: () => onNavigate("Emergency Profile"),
    },
  ];

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome, Patient
        </Typography>
      </motion.div>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Loading your health data...
            </Typography>
            <LinearProgress />
          </Paper>
        </motion.div>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <DashboardCard
              title="Total Records"
              value={isLoading ? "..." : totalRecords}
              gradient="linear-gradient(135deg, #4caf50, #81c784)"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <DashboardCard
              title="Health Alerts"
              value={isLoading ? "..." : healthAlerts}
              gradient="linear-gradient(135deg, #f44336, #e57373)"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <DashboardCard
              title="Last Report"
              value={isLoading ? "..." : lastReport}
              gradient="linear-gradient(135deg, #2196f3, #64b5f6)"
            />
          </motion.div>
        </Grid>
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${action.color}20, ${action.color}10)`,
                    border: `1px solid ${action.color}30`,
                    "&:hover": {
                      boxShadow: `0 8px 25px ${action.color}30`,
                      transform: "translateY(-2px)",
                      transition: "all 0.3s ease",
                    },
                  }}
                  onClick={action.onClick}
                >
                  <Box
                    sx={{
                      fontSize: 40,
                      color: action.color,
                      mb: 1,
                    }}
                  >
                    {action.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {action.label}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Dashboard;