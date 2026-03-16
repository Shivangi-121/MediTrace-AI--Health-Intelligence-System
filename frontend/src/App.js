// src/App.js
import React, { useState } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ReportUpload from "./components/ReportUpload";
import Timeline from "./pages/Timeline";
import HealthInsights from "./pages/HealthInsights";
import EmergencyProfile from "./pages/EmergencyProfile";
import Login from "./pages/Login";

function App() {
  const [selectedPage, setSelectedPage] = useState("Login");
  
  // ✅ Store AI extracted data
  const [aiData, setAiData] = useState({
    healthScore: 85,
    risksDetected: ["High cholesterol detected", "Elevated blood pressure"],
    insights: [
      "High cholesterol detected → Possible risk of heart disease",
      "Elevated blood pressure detected → Possible risk of hypertension",
      "Regular monitoring and lifestyle adjustments recommended"
    ],
    medicalTimeline: [
      "2025 → Cholesterol test",
      "2024 → Blood pressure report",
      "2023 → Annual health check"
    ],
  });

  const events = [
    "2025 → Diabetes test",
    "2024 → Blood pressure report",
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {selectedPage !== "Login" && (
        <Sidebar onSelect={setSelectedPage} />
      )}

      <Box sx={{ flexGrow: 1, minHeight: "100vh", background: "#f0f2f5" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            style={{ height: "100%" }}
          >
            {selectedPage === "Login" && (
              <Login onLogin={() => setSelectedPage("Dashboard")} />
            )}

            {selectedPage === "Dashboard" && (
              <Dashboard
                onUploadClick={() => setSelectedPage("Upload Report")}
                onNavigate={setSelectedPage}
              />
            )}

            {selectedPage === "Upload Report" && (
              <ReportUpload
                onDataExtracted={(data) => {
                  console.log("App.js: onDataExtracted called with:", data);
                  setAiData(data); // store AI response
                  console.log("App.js: Setting selectedPage to Health Insights");
                  setSelectedPage("Health Insights"); // go directly to insights
                }}
              />
            )}

            {selectedPage === "Medical Timeline" && (
              <Timeline events={aiData.medicalTimeline.length ? aiData.medicalTimeline : events} aiData={aiData} />
            )}

            {selectedPage === "Health Insights" && (
              <HealthInsights aiData={aiData} />
            )}

            {selectedPage === "Emergency Profile" && (
              <EmergencyProfile aiData={aiData} />
            )}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}

export default App;