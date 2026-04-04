import React from "react";
import { Card, Typography } from "@mui/material";
import { motion } from "framer-motion";

const DashboardCard = ({ title, value, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.03, boxShadow: "0px 15px 25px rgba(0,0,0,0.18)" }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 120 }}
  >
    <Card
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: 3,
        background: gradient,
        color: "#fff",
        cursor: "pointer",
      }}
    >
      <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: { xs: "1.9rem", sm: "2.125rem" } }}>
        {value}
      </Typography>
    </Card>
  </motion.div>
);

export default DashboardCard;
