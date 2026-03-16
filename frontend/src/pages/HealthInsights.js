import React, { useState } from "react";
import { Box, Typography, Chip, Paper, Grid, Card, CardContent, Divider, Button } from "@mui/material";
import { motion } from "framer-motion";
import AnimatedCard from "../components/AnimatedCard";
import { Info, Warning, CheckCircle, Assignment, Science, LocalHospital, Person } from "@mui/icons-material";

const HealthInsights = ({ aiData }) => {
  console.log("HealthInsights: Received aiData:", aiData);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showPatientSummary, setShowPatientSummary] = useState(false);

  const insights = aiData.insights && aiData.insights.length
    ? aiData.insights.map((insight, index) => ({
        text: insight,
        category: index % 3 === 0 ? "risk" : index % 3 === 1 ? "positive" : "info",
        priority: index % 2 === 0 ? "high" : "normal",
      }))
    : [
        { text: "Upload a report to see insights", category: "info", priority: "normal" },
      ];

  const categories = [
    { key: "all", label: "All Insights", color: "primary" },
    { key: "risk", label: "Risk Factors", color: "error" },
    { key: "positive", label: "Positive Trends", color: "success" },
    { key: "info", label: "General Info", color: "info" },
  ];

  const filteredInsights = selectedCategory === "all"
    ? insights
    : insights.filter(insight => insight.category === selectedCategory);

  const getIcon = (category) => {
    switch (category) {
      case "risk": return <Warning />;
      case "positive": return <CheckCircle />;
      default: return <Info />;
    }
  };

  const getGradient = (category) => {
    switch (category) {
      case "risk": return "linear-gradient(135deg, #f44336, #ff7961)";
      case "positive": return "linear-gradient(135deg, #4caf50, #81c784)";
      default: return "linear-gradient(135deg, #2196f3, #64b5f6)";
    }
  };

  return (
    <Box sx={{ p: 4, background: "#f0f2f5", minHeight: "100vh" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textShadow: "1px 1px #ccc",
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Health Insights
          </Typography>

          {aiData.patientSummary && (
            <Button
              variant="contained"
              startIcon={<Assignment />}
              onClick={() => setShowPatientSummary(!showPatientSummary)}
              sx={{ borderRadius: 3 }}
            >
              {showPatientSummary ? "Hide" : "Show"} Doctor Summary
            </Button>
          )}
        </Box>
      </motion.div>

      {/* Health Score Display */}
      {aiData.healthScore !== undefined && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3, textAlign: "center", background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", color: "white", mb: 1 }}>
              {aiData.healthScore}/100
            </Typography>
            <Typography variant="h6" sx={{ color: "white" }}>
              Health Score
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 1 }}>
              {aiData.healthScore >= 80 ? "Excellent health status" :
               aiData.healthScore >= 60 ? "Good health with some monitoring needed" :
               "Requires medical attention and lifestyle changes"}
            </Typography>
          </Paper>
        </motion.div>
      )}

      {/* Doctor-Friendly Patient Summary */}
      {showPatientSummary && aiData.patientSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#1976d2" }}>
                👨‍⚕️ Doctor-Friendly Patient Summary
              </Typography>
              <Box sx={{
                backgroundColor: "#f8f9fa",
                p: 2,
                borderRadius: 2,
                fontFamily: "monospace",
                whiteSpace: "pre-line",
                border: "1px solid #e0e0e0"
              }}>
                {aiData.patientSummary}
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Extracted Medical Data */}
      {aiData.extractedData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", display: "flex", alignItems: "center" }}>
                    <Science sx={{ mr: 1, color: "#2196f3" }} />
                    Extracted Lab Results
                  </Typography>
                  {Object.entries(aiData.extractedData.labResults || {}).map(([test, value]) => (
                    <Box key={test} sx={{ mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {test}:
                      </Typography>
                      <Typography variant="body1" color="primary">
                        {value}
                      </Typography>
                      <Divider sx={{ mt: 1 }} />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", display: "flex", alignItems: "center" }}>
                    <LocalHospital sx={{ mr: 1, color: "#4caf50" }} />
                    Report Details
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Report Type:
                    </Typography>
                    <Typography variant="body1">
                      {aiData.extractedData.reportType || "Medical Report"}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Doctor:
                    </Typography>
                    <Typography variant="body1">
                      {aiData.extractedData.doctorName || "Not specified"}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Date:
                    </Typography>
                    <Typography variant="body1">
                      {aiData.extractedData.reportDate || "Not specified"}
                    </Typography>
                  </Box>
                  {aiData.extractedData.diseases && aiData.extractedData.diseases.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Detected Conditions:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                        {aiData.extractedData.diseases.map((disease, index) => (
                          <Chip key={index} label={disease} size="small" color="error" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                  )}
                  {aiData.extractedData.medicines && aiData.extractedData.medicines.length > 0 && (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Prescribed Medicines:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                        {aiData.extractedData.medicines.map((medicine, index) => (
                          <Chip key={index} label={medicine} size="small" color="primary" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
      )}

      {/* Risk Detection */}
      {aiData.risksDetected && aiData.risksDetected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#f44336", display: "flex", alignItems: "center" }}>
                <Warning sx={{ mr: 1 }} />
                AI Risk Detection
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {aiData.risksDetected.map((risk, index) => (
                  <Chip
                    key={index}
                    label={risk}
                    color="error"
                    variant="filled"
                    sx={{ fontWeight: "bold" }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filter Insights by Category
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <motion.div
                key={cat.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Chip
                  label={cat.label}
                  color={selectedCategory === cat.key ? cat.color : "default"}
                  variant={selectedCategory === cat.key ? "filled" : "outlined"}
                  onClick={() => setSelectedCategory(cat.key)}
                  sx={{ cursor: "pointer" }}
                />
              </motion.div>
            ))}
          </Box>
        </Paper>
      </motion.div>

      <Grid container spacing={2}>
        {filteredInsights.map((insight, i) => (
          <Grid item xs={12} md={6} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <AnimatedCard
                icon={getIcon(insight.category)}
                title={insight.text}
                gradient={getGradient(insight.category)}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {filteredInsights.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
            <Typography variant="h6" color="text.secondary">
              No insights found for the selected category
            </Typography>
          </Paper>
        </motion.div>
      )}
    </Box>
  );
};

export default HealthInsights;