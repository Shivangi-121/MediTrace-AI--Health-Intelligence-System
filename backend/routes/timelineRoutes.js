const express = require("express");
const router = express.Router();

const { getMedicalTimeline } = require("../controllers/timelineController");

router.get("/medical-timeline/:patientId", getMedicalTimeline);

module.exports = router;