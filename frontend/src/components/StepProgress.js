// src/components/StepProgress.js
import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const steps = ["Upload", "Processing", "Results"];

const StepProgress = ({ currentStep }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.1 }}
          >
            <Box
              sx={{
                padding: 2,
                borderRadius: "50%",
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isActive
                  ? "linear-gradient(135deg, #ff6f61, #ff9a8b)"
                  : isCompleted
                  ? "#4caf50"
                  : "#ccc",
                color: "#fff",
                boxShadow: isActive ? "0 0 15px #ff6f61" : "none",
              }}
            >
              {index + 1}
            </Box>
            <Typography textAlign="center" sx={{ mt: 1, fontWeight: "bold" }}>
              {step}
            </Typography>
          </motion.div>
        );
      })}
    </Box>
  );
};

export default StepProgress;