const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Import AI modules
const { extractMedicalData, extractPatientMetrics } = require("../../ai-module/documentReader");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving file to:", uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const filename = `${timestamp}-report${path.extname(file.originalname)}`;
    console.log("Generated filename:", filename);
    cb(null, filename);
  },
});

// File filter to allow PDF and image formats
const fileFilter = (req, file, cb) => {
  console.log("File type:", file.mimetype, "Original name:", file.originalname);
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/tiff'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and image files are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// POST /api/upload-report
router.post("/upload-report", (req, res, next) => {
  console.log("Upload route called");
  upload.single("report")(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, async (req, res) => {
  console.log("Upload request received");
  console.log("File:", req.file);
  console.log("Body:", req.body);

  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const filePath = path.join(uploadDir, req.file.filename);
    console.log("Processing file:", filePath);

    // Extract medical data using AI document reader
    const extractedData = extractMedicalData(filePath);
    console.log("Extracted medical data:", extractedData);

    // Extract patient metrics for risk analysis
    const patientMetrics = extractPatientMetrics(extractedData);
    console.log("Extracted patient metrics:", patientMetrics);

    // Get AI dashboard with processed data
    const { getAIDashboard } = require("../controllers/aiDashboardController");
    const aiResult = await getAIDashboard(patientMetrics, [extractedData]);

    // Add extracted data to response
    const response = {
      ...aiResult,
      extractedData: {
        diseases: extractedData.diseases,
        medicines: extractedData.medicines,
        labResults: extractedData.labResults,
        doctorName: extractedData.doctorName,
        reportDate: extractedData.reportDate,
        patientName: extractedData.patientName,
        reportType: extractedData.reportType,
        fileName: req.file.filename
      }
    };

    console.log("Final response:", response);
    res.json(response);

  } catch (err) {
    console.error("Processing error:", err);
    res.status(500).json({
      error: "Failed to process medical report",
      details: err.message
    });
  }
});

module.exports = router;