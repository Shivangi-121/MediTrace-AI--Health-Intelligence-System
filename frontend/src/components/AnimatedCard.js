// src/components/AnimatedCard.js
import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const AnimatedCard = ({ icon, title, gradient }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 15px 25px rgba(0,0,0,0.3)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 3,
          mb: 2,
          borderRadius: 3,
          background: gradient || "linear-gradient(135deg, #6a11cb, #2575fc)",
          color: "#fff",
          cursor: "pointer",
          minHeight: 70,
        }}
      >
        <Box sx={{ mr: 2, fontSize: 30 }}>{icon}</Box>
        <Typography variant="body1">{title}</Typography>
      </Box>
    </motion.div>
  );
};

export default AnimatedCard;