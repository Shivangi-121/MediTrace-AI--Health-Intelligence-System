function detectHealthRisks(patientData) {
  const risks = [];
  const { glucose, systolic_bp, cholesterol } = patientData;
  if (glucose && glucose > 126) risks.push("Diabetes Risk");
  if (systolic_bp && systolic_bp > 140) risks.push("Hypertension Risk");
  if (cholesterol && cholesterol > 200) risks.push("Heart Disease Risk");
  return risks;
}
module.exports = { detectHealthRisks };