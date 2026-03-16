const express = require("express");
const router = express.Router();

const { getHealthInsights } = require("../controllers/healthController");

router.get("/health-insights/:patientId", getHealthInsights);

module.exports = router;