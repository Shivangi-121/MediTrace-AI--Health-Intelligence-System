exports.getMedicalTimeline = (req, res) => {

  const patientId = req.params.patientId;

  const timeline = [
    {
      year: 2026,
      event: "Blood Test",
      result: "High cholesterol detected"
    },
    {
      year: 2025,
      event: "Diabetes Diagnosis",
      result: "Type 2 Diabetes"
    },
    {
      year: 2024,
      event: "Annual Health Checkup",
      result: "Normal"
    }
  ];

  res.json({
    message: "Medical timeline generated",
    patientId: patientId,
    timeline: timeline
  });

};