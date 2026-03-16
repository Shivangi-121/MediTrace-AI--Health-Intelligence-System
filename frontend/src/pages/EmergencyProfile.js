// src/pages/EmergencyProfile.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import {
  LocalHospital,
  Phone,
  Warning,
  Bloodtype,
  Person,
  QrCode,
  Edit,
  Download,
  Share,
} from "@mui/icons-material";

const EmergencyProfile = ({ aiData }) => {
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Emergency profile data
  const [emergencyData, setEmergencyData] = useState({
    name: "John Doe",
    bloodGroup: "B+",
    allergies: ["Penicillin", "Sulfa drugs"],
    chronicConditions: ["Asthma", "Hypertension"],
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "987XXXXXX",
      email: "jane.doe@email.com"
    },
    medications: ["Albuterol inhaler", "Lisinopril 10mg"],
    doctorInfo: {
      primaryPhysician: "Dr. Sarah Johnson",
      hospital: "City General Hospital",
      phone: "+1-555-0123"
    },
    insurance: {
      provider: "HealthCare Plus",
      policyNumber: "HC123456789",
      emergencyNumber: "1-800-HEALTH"
    }
  });

  const qrData = JSON.stringify({
    name: emergencyData.name,
    bloodGroup: emergencyData.bloodGroup,
    allergies: emergencyData.allergies.join(", "),
    chronicConditions: emergencyData.chronicConditions.join(", "),
    emergencyContact: emergencyData.emergencyContact,
    medications: emergencyData.medications.join(", "),
    doctorInfo: emergencyData.doctorInfo,
    insurance: emergencyData.insurance
  });

  const handleDownloadQR = () => {
    const canvas = document.getElementById("emergency-qr");
    const link = document.createElement("a");
    link.download = "emergency-qr.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleShareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Emergency Health Card",
          text: "My emergency health information",
          url: window.location.href
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
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
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Emergency Medical Profile
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => setIsEditing(!isEditing)}
            sx={{ borderRadius: 3 }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Critical Information Card */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold", color: "#d32f2f" }}>
                  🚨 Critical Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, background: "linear-gradient(135deg, #e3f2fd, #bbdefb)" }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Bloodtype sx={{ color: "#d32f2f", mr: 1 }} />
                        <Typography variant="subtitle2" color="text.secondary">
                          Blood Group
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
                        {emergencyData.bloodGroup}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, background: "linear-gradient(135deg, #ffebee, #ffcdd2)" }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Warning sx={{ color: "#f57c00", mr: 1 }} />
                        <Typography variant="subtitle2" color="text.secondary">
                          Allergies
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {emergencyData.allergies.map((allergy, index) => (
                          <Chip
                            key={index}
                            label={allergy}
                            size="small"
                            sx={{ backgroundColor: "#ffebee", color: "#d32f2f" }}
                          />
                        ))}
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, background: "linear-gradient(135deg, #f3e5f5, #e1bee7)" }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <LocalHospital sx={{ color: "#7b1fa2", mr: 1 }} />
                        <Typography variant="subtitle2" color="text.secondary">
                          Chronic Conditions
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {emergencyData.chronicConditions.map((condition, index) => (
                          <Chip
                            key={index}
                            label={condition}
                            size="small"
                            sx={{ backgroundColor: "#f3e5f5", color: "#7b1fa2" }}
                          />
                        ))}
                      </Box>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, background: "linear-gradient(135deg, #e8f5e8, #c8e6c9)" }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Phone sx={{ color: "#2e7d32", mr: 1 }} />
                        <Typography variant="subtitle2" color="text.secondary">
                          Emergency Contact
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {emergencyData.emergencyContact.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {emergencyData.emergencyContact.relationship}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                        {emergencyData.emergencyContact.phone}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* QR Code Generator */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  🆔 Emergency QR Card
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <QRCodeCanvas
                    id="emergency-qr"
                    value={qrData}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Scan to view critical health information
                </Typography>

                <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    startIcon={<Download />}
                    onClick={handleDownloadQR}
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    Download
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Share />}
                    onClick={handleShareQR}
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    Share
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Additional Information */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      💊 Current Medications
                    </Typography>
                    {emergencyData.medications.map((med, index) => (
                      <Chip
                        key={index}
                        label={med}
                        sx={{ m: 0.5, backgroundColor: "#e3f2fd" }}
                      />
                    ))}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      👨‍⚕️ Healthcare Provider
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Primary Physician:</strong> {emergencyData.doctorInfo.primaryPhysician}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Hospital:</strong> {emergencyData.doctorInfo.hospital}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Phone:</strong> {emergencyData.doctorInfo.phone}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        </Grid>

        {/* Medical Timeline */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                  📅 Medical Timeline
                </Typography>

                <Box sx={{ position: "relative" }}>
                  {[
                    { year: "2025", event: "Diabetes test - HbA1c: 6.2%", type: "lab" },
                    { year: "2024", event: "Blood pressure report - 140/85 mmHg", type: "checkup" },
                    { year: "2023", event: "Allergy diagnosis - Penicillin allergy confirmed", type: "diagnosis" },
                    { year: "2023", event: "Asthma management plan established", type: "treatment" },
                    { year: "2022", event: "Hypertension diagnosis", type: "diagnosis" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                        }}
                      >
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: item.type === "lab" ? "#2196f3" :
                                           item.type === "diagnosis" ? "#f44336" :
                                           item.type === "treatment" ? "#4caf50" : "#ff9800",
                            mr: 2,
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body1" sx={{ fontWeight: "bold", mr: 2 }}>
                          {item.year} →
                        </Typography>
                        <Typography variant="body1">{item.event}</Typography>
                      </Box>
                      {index < 4 && (
                        <Box
                          sx={{
                            width: 2,
                            height: 20,
                            backgroundColor: "#e0e0e0",
                            ml: 0.5,
                            mb: 1,
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* QR Code Dialog */}
      <Dialog
        open={showQRDialog}
        onClose={() => setShowQRDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Emergency QR Health Card</DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 3 }}>
          <QRCodeCanvas value={qrData} size={300} level="H" />
          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            Scan this QR code in emergencies to access critical health information
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDownloadQR} startIcon={<Download />}>
            Download QR
          </Button>
          <Button onClick={() => setShowQRDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmergencyProfile;