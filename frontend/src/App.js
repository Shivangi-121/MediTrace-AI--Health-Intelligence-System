import React, { useMemo, useState } from "react";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TimelineIcon from "@mui/icons-material/Timeline";
import InsightsIcon from "@mui/icons-material/Insights";
import EmergencyIcon from "@mui/icons-material/LocalHospital";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ReportUpload from "./components/ReportUpload";
import Timeline from "./pages/Timeline";
import HealthInsights from "./pages/HealthInsights";
import EmergencyProfile from "./pages/EmergencyProfile";
import Login from "./pages/Login";

const mobileNavItems = [
  { label: "Dashboard", value: "Dashboard", icon: <DashboardIcon /> },
  { label: "Upload", value: "Upload Report", icon: <UploadFileIcon /> },
  { label: "Timeline", value: "Medical Timeline", icon: <TimelineIcon /> },
  { label: "Insights", value: "Health Insights", icon: <InsightsIcon /> },
  { label: "Profile", value: "Emergency Profile", icon: <EmergencyIcon /> },
];

function App() {
  const [selectedPage, setSelectedPage] = useState("Login");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [aiData, setAiData] = useState({
    healthScore: 85,
    risksDetected: ["High cholesterol detected", "Elevated blood pressure"],
    insights: [
      "High cholesterol detected -> Possible risk of heart disease",
      "Elevated blood pressure detected -> Possible risk of hypertension",
      "Regular monitoring and lifestyle adjustments recommended",
    ],
    medicalTimeline: [
      "2025 -> Cholesterol test",
      "2024 -> Blood pressure report",
      "2023 -> Annual health check",
    ],
  });

  const events = [
    "2025 -> Diabetes test",
    "2024 -> Blood pressure report",
  ];

  const isAuthenticated = selectedPage !== "Login";
  const pageTitle = useMemo(() => {
    const match = mobileNavItems.find((item) => item.value === selectedPage);
    return match?.label || selectedPage;
  }, [selectedPage]);

  const handleSelectPage = (page) => {
    setSelectedPage(page);
    setMobileDrawerOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f0f2f5" }}>
      {isAuthenticated && !isMobile && (
        <Sidebar onSelect={handleSelectPage} currentPage={selectedPage} />
      )}

      {isAuthenticated && isMobile && (
        <>
          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              background: "rgba(30, 30, 47, 0.94)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Toolbar sx={{ minHeight: 72 }}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setMobileDrawerOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  MediTrace AI
                </Typography>
                <Typography variant="h6" noWrap sx={{ fontWeight: 700 }}>
                  {pageTitle}
                </Typography>
              </Box>
            </Toolbar>
          </AppBar>

          <Drawer
            anchor="left"
            open={mobileDrawerOpen}
            onClose={() => setMobileDrawerOpen(false)}
            PaperProps={{
              sx: {
                width: "85vw",
                maxWidth: 320,
                background: "transparent",
                boxShadow: "none",
              },
            }}
          >
            <Sidebar
              onSelect={handleSelectPage}
              currentPage={selectedPage}
              onClose={() => setMobileDrawerOpen(false)}
              compact
            />
          </Drawer>
        </>
      )}

      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          background: "#f0f2f5",
          pt: isAuthenticated && isMobile ? "72px" : 0,
          pb: isAuthenticated && isMobile ? "72px" : 0,
        }}
      >
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
                  setAiData(data);
                  setSelectedPage("Health Insights");
                }}
              />
            )}

            {selectedPage === "Medical Timeline" && (
              <Timeline
                events={aiData.medicalTimeline.length ? aiData.medicalTimeline : events}
                aiData={aiData}
              />
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

      {isAuthenticated && isMobile && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            borderTop: "1px solid rgba(0,0,0,0.08)",
            backgroundColor: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(10px)",
          }}
        >
          <BottomNavigation
            value={selectedPage}
            onChange={(event, value) => handleSelectPage(value)}
            showLabels
          >
            {mobileNavItems.map((item) => (
              <BottomNavigationAction
                key={item.value}
                label={item.label}
                value={item.value}
                icon={item.icon}
              />
            ))}
          </BottomNavigation>
        </Box>
      )}
    </Box>
  );
}

export default App;
