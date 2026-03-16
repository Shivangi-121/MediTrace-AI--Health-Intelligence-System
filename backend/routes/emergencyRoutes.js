const express = require("express");
const router = express.Router();

const { getEmergencyProfile } = require("../controllers/emergencyController");

router.get("/emergency-profile/:patientId", getEmergencyProfile);

module.exports = router;