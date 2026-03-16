const path = require("path");

// Build absolute path to the ai-module folder (outside backend)
const aiModulePath = path.join(__dirname, "../../ai-module");

// Import AI functions from ai-module
const { detectHealthRisks } = require(path.join(aiModulePath, "riskDetection"));
const { generateHealthInsights } = require(path.join(aiModulePath, "insightsGenerator"));
const { generateMedicalTimeline } = require(path.join(aiModulePath, "timelineGenerator"));
const { calculateHealthScore } = require(path.join(aiModulePath, "healthScore"));
const { generatePatientSummary, formatPatientSummaryForDoctor } = require(path.join(aiModulePath, "patientSummary"));

// Main function to get AI dashboard
async function getAIDashboard(patientData, records) {
  const risks = detectHealthRisks(patientData);
  const insights = generateHealthInsights(risks);
  const timeline = generateMedicalTimeline(records);
  const score = calculateHealthScore(risks);

  // Generate patient summary for doctors
  const patientSummary = records.length > 0 ?
    generatePatientSummary(records[0], timeline, risks, records[0].medicines || []) :
    generatePatientSummary({}, timeline, risks, []);

  const doctorSummary = formatPatientSummaryForDoctor(patientSummary);

  return {
    healthScore: score,
    risksDetected: risks,
    insights,
    medicalTimeline: timeline.map(t => `${t.year} → ${t.event}`),
    patientSummary: doctorSummary,
    extractedData: records.length > 0 ? records[0] : null
  };
}

module.exports = { getAIDashboard };