// src/pages/Timeline.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Favorite,
  LocalHospital,
  Assessment,
  ShowChart,
} from "@mui/icons-material";

// Sample health data for demonstration
const healthData = [
  { date: "2023-01", bloodPressure: 120, heartRate: 72, cholesterol: 180, weight: 75 },
  { date: "2023-03", bloodPressure: 118, heartRate: 70, cholesterol: 175, weight: 74 },
  { date: "2023-06", bloodPressure: 122, heartRate: 75, cholesterol: 170, weight: 73 },
  { date: "2023-09", bloodPressure: 115, heartRate: 68, cholesterol: 165, weight: 72 },
  { date: "2023-12", bloodPressure: 119, heartRate: 71, cholesterol: 160, weight: 71 },
  { date: "2024-03", bloodPressure: 117, heartRate: 69, cholesterol: 155, weight: 70 },
  { date: "2024-06", bloodPressure: 121, heartRate: 73, cholesterol: 150, weight: 69 },
  { date: "2024-09", bloodPressure: 116, heartRate: 67, cholesterol: 145, weight: 68 },
  { date: "2024-12", bloodPressure: 118, heartRate: 70, cholesterol: 140, weight: 67 },
  { date: "2025-03", bloodPressure: 114, heartRate: 65, cholesterol: 135, weight: 66 },
];

const timelineEvents = [
  {
    id: 1,
    date: "2025-03-15",
    title: "Annual Health Check",
    description: "Complete blood work and physical examination",
    type: "checkup",
    icon: <Assessment />,
    color: "#4caf50",
  },
  {
    id: 2,
    date: "2024-12-10",
    title: "Cholesterol Test",
    description: "LDL: 140 mg/dL - Within normal range",
    type: "lab",
    icon: <ShowChart />,
    color: "#2196f3",
  },
  {
    id: 3,
    date: "2024-09-22",
    title: "Cardiology Consultation",
    description: "Regular follow-up for heart health",
    type: "consultation",
    icon: <Favorite />,
    color: "#ff9800",
  },
  {
    id: 4,
    date: "2024-06-15",
    title: "Blood Pressure Monitoring",
    description: "Average BP: 118/75 mmHg",
    type: "monitoring",
    icon: <TrendingUp />,
    color: "#9c27b0",
  },
  {
    id: 5,
    date: "2024-03-08",
    title: "Weight Management Check",
    description: "Weight: 70kg - On track with goals",
    type: "checkup",
    icon: <LocalHospital />,
    color: "#f44336",
  },
];

const riskData = [
  { name: "Low Risk", value: 65, color: "#4caf50" },
  { name: "Medium Risk", value: 25, color: "#ff9800" },
  { name: "High Risk", value: 10, color: "#f44336" },
];

const Timeline = ({ events, aiData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Extract health metrics from aiData
  const extractHealthData = () => {
    if (!aiData?.extractedData || !aiData.extractedData.labResults) {
      return healthData;
    }

    const extracted = aiData.extractedData;
    const labs = extracted.labResults;
    
    // Parse lab values
    const parseValue = (str) => {
      if (typeof str !== 'string') return 0;
      const match = str.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    };

    // Create health trend data from extracted lab results
    return [
      {
        date: extracted.reportDate || new Date().toISOString().split('T')[0],
        bloodPressure: parseValue(labs['Systolic BP'] || labs['systolic_bp'] || '120'),
        heartRate: parseValue(labs['Heart Rate'] || labs['heart_rate'] || '70'),
        cholesterol: parseValue(labs['Total Cholesterol'] || labs['Cholesterol'] || '180'),
        weight: 70, // Default value if not in labs
      },
      // Add historical data for context
      ...healthData,
    ];
  };

  // Generate risk assessment data from detected risks
  const generateRiskData = () => {
    if (!aiData?.risksDetected || aiData.risksDetected.length === 0) {
      return riskData;
    }

    const riskCount = aiData.risksDetected.length;
    const lowRisk = Math.max(0, 65 - riskCount * 15);
    const mediumRisk = Math.max(0, 25 + riskCount * 5);
    const highRisk = Math.min(100 - lowRisk - mediumRisk, riskCount * 10);

    return [
      { name: "Low Risk", value: lowRisk, color: "#4caf50" },
      { name: "Medium Risk", value: mediumRisk, color: "#ff9800" },
      { name: "High Risk", value: highRisk, color: "#f44336" },
    ];
  };

  // Generate vital signs summary
  const getVitalSignsSummary = () => {
    if (!aiData?.extractedData || !aiData.extractedData.labResults) {
      return null;
    }

    const labs = aiData.extractedData.labResults;
    return {
      bloodPressure: labs['Systolic BP'] || labs['systolic_bp'] || 'N/A',
      heartRate: labs['Heart Rate'] || labs['heart_rate'] || 'N/A',
      cholesterol: labs['Total Cholesterol'] || labs['Cholesterol'] || 'N/A',
      weight: labs['Weight'] || labs['weight'] || 'N/A',
    };
  };

  const chartData = extractHealthData();
  const riskAssessmentData = generateRiskData();
  const vitalSigns = getVitalSignsSummary();

  // Use AI-generated timeline or fallback to default events
  const medicalEvents = aiData?.medicalTimeline?.length
    ? aiData.medicalTimeline.map((event, index) => {
        const [year, eventText] = event.split(' → ');
        return {
          id: index + 1,
          date: `${year}-01-01`, // Default date for the year
          title: eventText || 'Medical Event',
          description: `Health event recorded in ${year}`,
          type: eventText.toLowerCase().includes('test') ? 'lab' :
                eventText.toLowerCase().includes('diagnosis') ? 'diagnosis' :
                eventText.toLowerCase().includes('check') ? 'checkup' : 'event',
          icon: <Assessment />,
          color: eventText.toLowerCase().includes('diabetes') ? '#f44336' :
                 eventText.toLowerCase().includes('blood') ? '#2196f3' :
                 eventText.toLowerCase().includes('cholesterol') ? '#ff9800' : '#4caf50',
          year: year
        };
      }).sort((a, b) => b.year - a.year) // Sort by year descending
    : timelineEvents;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Box sx={{ p: 4, background: "#f0f2f5", minHeight: "100vh" }}>
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
            textAlign: "center",
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Medical Timeline & Analytics
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {/* Timeline Section */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                Health Events Timeline
              </Typography>

              <Box sx={{ position: "relative" }}>
                {medicalEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 3,
                        cursor: "pointer",
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: selectedEvent?.id === event.id ? "rgba(102, 126, 234, 0.1)" : "transparent",
                        "&:hover": {
                          backgroundColor: "rgba(102, 126, 234, 0.05)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: event.color,
                          mr: 2,
                          mt: 0.5,
                          boxShadow: `0 0 0 3px ${event.color}20`,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: event.color }}>
                          {event.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {event.year || event.date}
                        </Typography>
                        <Typography variant="body2">{event.description}</Typography>
                      </Box>
                    </Box>
                    {index < medicalEvents.length - 1 && (
                      <Box
                        sx={{
                          width: 2,
                          height: 30,
                          backgroundColor: "#e0e0e0",
                          ml: 0.5,
                          mb: 1,
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  mb: 3,
                  "& .MuiTab-root": {
                    minHeight: 48,
                    textTransform: "none",
                    fontWeight: "bold",
                  },
                }}
              >
                <Tab label="Health Trends" />
                <Tab label="Vital Signs" />
                <Tab label="Risk Analysis" />
              </Tabs>

              <Box sx={{ height: 400 }}>
                {activeTab === 0 && (
                  <motion.div
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Box>
                      <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
                        {aiData?.extractedData?.reportDate 
                          ? `Latest report: ${aiData.extractedData.reportDate}`
                          : 'No report uploaded yet - Showing sample data'}
                      </Typography>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="cholesterol"
                            stackId="1"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}
                            name="Cholesterol (mg/dL)"
                          />
                          <Area
                            type="monotone"
                            dataKey="bloodPressure"
                            stackId="1"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            fillOpacity={0.6}
                            name="Blood Pressure (mmHg)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Box>
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Box>
                      {vitalSigns && (
                        <Box sx={{ 
                          mb: 3, 
                          p: 2, 
                          backgroundColor: "rgba(102, 126, 234, 0.08)",
                          borderRadius: 2
                        }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                            Latest Vital Signs:
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="body2" color="text.secondary">Blood Pressure</Typography>
                              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#2196f3" }}>
                                {vitalSigns.bloodPressure}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="body2" color="text.secondary">Heart Rate</Typography>
                              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#ff7300" }}>
                                {vitalSigns.heartRate}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="body2" color="text.secondary">Cholesterol</Typography>
                              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#8884d8" }}>
                                {vitalSigns.cholesterol}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Typography variant="body2" color="text.secondary">Weight</Typography>
                              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#387908" }}>
                                {vitalSigns.weight}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                      <ResponsiveContainer width="100%" height={aiData?.extractedData ? 250 : 400}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="heartRate"
                            stroke="#ff7300"
                            strokeWidth={3}
                            dot={{ fill: "#ff7300", strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8 }}
                            name="Heart Rate (bpm)"
                          />
                          <Line
                            type="monotone"
                            dataKey="weight"
                            stroke="#387908"
                            strokeWidth={3}
                            dot={{ fill: "#387908", strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8 }}
                            name="Weight (kg)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: "100%" }}>
                      <Box sx={{ width: 300, height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={riskAssessmentData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {riskAssessmentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>

                      <Box sx={{ ml: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                          Risk Assessment
                        </Typography>
                        {riskAssessmentData.map((risk, index) => (
                          <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                backgroundColor: risk.color,
                                mr: 2,
                              }}
                            />
                            <Typography variant="body2">
                              {risk.name}: {risk.value.toFixed(0)}%
                            </Typography>
                          </Box>
                        ))}
                        {aiData?.risksDetected && aiData.risksDetected.length > 0 && (
                          <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid #e0e0e0" }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                              Detected Risks:
                            </Typography>
                            {aiData.risksDetected.map((risk, index) => (
                              <Typography key={index} variant="body2" sx={{ color: "#f44336", mb: 0.5 }}>
                                • {risk}
                              </Typography>
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </motion.div>
                )}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Event Details Modal/Card */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <Card sx={{ minWidth: 400, maxWidth: 500 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box sx={{ color: selectedEvent.color, mr: 2, fontSize: 24 }}>
                  {selectedEvent.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {selectedEvent.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {selectedEvent.date}
              </Typography>
              <Typography variant="body1">{selectedEvent.description}</Typography>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Chip
                  label={selectedEvent.type}
                  sx={{
                    backgroundColor: selectedEvent.color,
                    color: "white",
                    textTransform: "capitalize",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Overlay for modal */}
      {selectedEvent && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setSelectedEvent(null)}
        />
      )}
    </Box>
  );
};

export default Timeline;