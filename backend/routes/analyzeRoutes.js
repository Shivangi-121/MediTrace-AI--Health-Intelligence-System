const express = require("express");
const router = express.Router();
const multer = require("multer");

const { analyzeReport } = require("../controllers/analyzeController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/analyze-report", upload.single("report"), analyzeReport);

module.exports = router;