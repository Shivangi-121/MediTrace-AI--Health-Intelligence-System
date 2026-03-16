function generateMedicalTimeline(records) {
  const timeline = records.map((r) => ({
    year: (r.reportDate || r.date || new Date().toISOString()).split("-")[0],
    event: (r.diseases && r.diseases.length > 0 ? r.diseases[0] : null) || 
            r.disease || r.test || r.reportType || "Health Checkup",
  }));
  timeline.sort((a, b) => b.year - a.year); // newest first
  return timeline;
}
module.exports = { generateMedicalTimeline };