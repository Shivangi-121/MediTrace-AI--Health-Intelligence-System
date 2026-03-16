function generateHealthInsights(risks) {
  const insights = [];
  for (const risk of risks) {
    if (risk === "Diabetes Risk")
      insights.push("High glucose detected → Possible risk of diabetes");
    if (risk === "Hypertension Risk")
      insights.push("High blood pressure detected → Possible risk of hypertension");
    if (risk === "Heart Disease Risk")
      insights.push("High cholesterol detected → Possible risk of heart disease");
  }
  insights.push("Regular monitoring and lifestyle adjustments recommended");
  return insights;
}
module.exports = { generateHealthInsights };