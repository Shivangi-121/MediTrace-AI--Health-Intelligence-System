const express = require("express")
const router = express.Router()

const { getHealthDashboard } = require("../controllers/dashboardController")

router.get("/health-dashboard/:patientId", getHealthDashboard)

module.exports = router