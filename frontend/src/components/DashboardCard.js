// src/components/DashboardCard.js
import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const DashboardCard = ({ title, value, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px rgba(0,0,0,0.3)" }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 120 }}
  >
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        background: gradient,
        color: "#fff",
        cursor: "pointer",
      }}
    >
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {value}
      </Typography>
    </Card>
  </motion.div>
);

export default DashboardCard;