import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const AnimatedCard = ({ icon, title, gradient }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4, boxShadow: "0px 15px 25px rgba(0,0,0,0.18)" }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: { xs: 2, sm: 3 },
          mb: 2,
          borderRadius: 3,
          background: gradient || "linear-gradient(135deg, #6a11cb, #2575fc)",
          color: "#fff",
          cursor: "pointer",
          minHeight: 70,
          gap: 1.5,
        }}
      >
        <Box sx={{ fontSize: { xs: 24, sm: 30 }, display: "flex", alignItems: "center" }}>{icon}</Box>
        <Typography variant="body1" sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}>
          {title}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default AnimatedCard;
