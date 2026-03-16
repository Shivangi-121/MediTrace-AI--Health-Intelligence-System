const fs = require("fs");
const pdfParse = require("pdf-parse");

exports.analyzeReport = async (req, res) => {
  try {

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text.toLowerCase();

    let riskScore = 0;
    let detectedRisks = [];

    if (text.includes("cholesterol")) {
      riskScore += 25;
      detectedRisks.push("High Cholesterol");
    }

    if (text.includes("diabetes") || text.includes("glucose")) {
      riskScore += 30;
      detectedRisks.push("Diabetes Indicators");
    }

    if (text.includes("blood pressure") || text.includes("hypertension")) {
      riskScore += 25;
      detectedRisks.push("Blood Pressure Risk");
    }

    if (text.includes("hemoglobin low") || text.includes("anemia")) {
      riskScore += 20;
      detectedRisks.push("Anemia Risk");
    }

    let riskLevel = "Low";
    if (riskScore >= 30) riskLevel = "Medium";
    if (riskScore >= 60) riskLevel = "High";

    res.json({
      message: "Report analyzed successfully",
      riskScore,
      riskLevel,
      detectedRisks,
      recommendations: [
        "Consult a healthcare professional",
        "Maintain healthy diet",
        "Regular health checkups"
      ]
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};