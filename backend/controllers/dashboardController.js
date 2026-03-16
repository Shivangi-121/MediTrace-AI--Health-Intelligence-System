exports.getHealthDashboardData = async (patientId) => {
  // Replace this with your actual DB or AI logic
  return {
    patientId: patientId,
    healthScore: 72,
    riskLevel: "Medium",
    detectedRisks: ["High Cholesterol", "Diabetes"],
    recommendations: [
      "Exercise regularly",
      "Reduce fatty food intake",
      "Regular health checkups"
    ],
    medicalTimeline: [
      { year: 2026, event: "Blood Test" },
      { year: 2025, event: "Diabetes Diagnosis" }
    ],
    emergencyProfile: {
      bloodGroup: "O+",
      allergies: ["Penicillin"],
      chronicDiseases: ["Diabetes"],
      emergencyContact: {
        name: "Anita Sharma",
        relation: "Mother",
        phone: "9876543210"
      }
    }
  };
};

// Existing API route for health-dashboard can still use res.json
exports.getHealthDashboard = async (req, res) => {
  const patientId = req.params.patientId;
  const dashboardData = await exports.getHealthDashboardData(patientId);
  res.json({ message: "Health dashboard generated", data: dashboardData });
};