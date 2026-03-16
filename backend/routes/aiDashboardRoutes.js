const express = require("express");
const router = express.Router();
const { getAIDashboard } = require("../controllers/aiDashboardController");

router.post("/ai-dashboard", async (req, res) => {
  console.log('AI Dashboard route called');
  const { patientData, records } = req.body;
  console.log('Received patientData:', patientData);
  console.log('Received records:', records);
  try {
    const dashboard = await getAIDashboard(patientData, records);
    res.json({ message: "AI Health Dashboard generated", data: dashboard });
  } catch (err) {
    console.error('❌ Dashboard error:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({ error: "Error generating AI dashboard", details: err.message });
  }
});

module.exports = router;