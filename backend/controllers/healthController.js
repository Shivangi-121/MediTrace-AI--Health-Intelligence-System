exports.getHealthInsights = (req, res) => {

  const patientId = req.params.patientId;

  const insights = {
    patientId: patientId,
    healthScore: 82,
    risks: [
      "Mild hypertension risk",
      "Low hemoglobin level"
    ],
    recommendations: [
      "Monitor blood pressure regularly",
      "Increase iron rich foods",
      "Regular physical activity"
    ]
  };

  res.json({
    message: "Health insights generated successfully",
    data: insights
  });

};