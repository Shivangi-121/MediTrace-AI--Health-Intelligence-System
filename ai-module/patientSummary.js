// ai-module/patientSummary.js
function generatePatientSummary(patientData, medicalHistory, risks, currentMedications) {
  const summary = {
    overview: '',
    keyConditions: [],
    currentMedications: [],
    recentLabs: [],
    recommendations: [],
    riskFactors: []
  };

  // Generate overview
  const conditions = patientData.diseases || [];
  const age = patientData.age || 'Unknown age';
  const gender = patientData.gender || 'Patient';

  if (conditions.length > 0) {
    summary.overview = `${gender} diagnosed with ${conditions.join(', ')}`;
  } else {
    summary.overview = `${gender} with regular health monitoring`;
  }

  // Key conditions
  summary.keyConditions = conditions.map(condition => {
    const diagnosisYear = medicalHistory.find(h =>
      h.event.toLowerCase().includes(condition.toLowerCase())
    )?.year || 'Recent';
    return `${condition} (diagnosed ${diagnosisYear})`;
  });

  // Current medications
  summary.currentMedications = currentMedications || [];

  // Recent lab results
  if (patientData.labResults) {
    Object.entries(patientData.labResults).slice(0, 3).forEach(([test, value]) => {
      summary.recentLabs.push(`${test}: ${value}`);
    });
  }

  // Risk factors
  summary.riskFactors = risks || [];

  // Generate recommendations based on conditions and risks
  if (risks.includes('Diabetes Risk') || conditions.includes('Diabetes')) {
    summary.recommendations.push('Regular blood glucose monitoring');
    summary.recommendations.push('Dietary modifications and exercise');
    summary.recommendations.push('Quarterly HbA1c testing');
  }

  if (risks.includes('Hypertension Risk') || conditions.includes('Hypertension')) {
    summary.recommendations.push('Daily blood pressure monitoring');
    summary.recommendations.push('Low sodium diet');
    summary.recommendations.push('Regular cardiovascular exercise');
  }

  if (risks.includes('Heart Disease Risk') || conditions.includes('High Cholesterol')) {
    summary.recommendations.push('Lipid profile monitoring every 6 months');
    summary.recommendations.push('Heart-healthy diet (Mediterranean diet)');
    summary.recommendations.push('Regular aerobic exercise');
  }

  if (summary.recommendations.length === 0) {
    summary.recommendations.push('Continue regular health checkups');
    summary.recommendations.push('Maintain healthy lifestyle habits');
  }

  return summary;
}

function formatPatientSummaryForDoctor(summary) {
  let formattedSummary = `📋 PATIENT SUMMARY\n\n`;
  formattedSummary += `👤 Overview: ${summary.overview}\n\n`;

  if (summary.keyConditions.length > 0) {
    formattedSummary += `🏥 Key Conditions:\n`;
    summary.keyConditions.forEach(condition => {
      formattedSummary += `• ${condition}\n`;
    });
    formattedSummary += `\n`;
  }

  if (summary.currentMedications.length > 0) {
    formattedSummary += `💊 Current Medications:\n`;
    summary.currentMedications.forEach(med => {
      formattedSummary += `• ${med}\n`;
    });
    formattedSummary += `\n`;
  }

  if (summary.recentLabs.length > 0) {
    formattedSummary += `🧪 Recent Lab Results:\n`;
    summary.recentLabs.forEach(lab => {
      formattedSummary += `• ${lab}\n`;
    });
    formattedSummary += `\n`;
  }

  if (summary.riskFactors.length > 0) {
    formattedSummary += `⚠️ Risk Factors:\n`;
    summary.riskFactors.forEach(risk => {
      formattedSummary += `• ${risk}\n`;
    });
    formattedSummary += `\n`;
  }

  formattedSummary += `📝 Recommendations:\n`;
  summary.recommendations.forEach(rec => {
    formattedSummary += `• ${rec}\n`;
  });

  return formattedSummary;
}

module.exports = { generatePatientSummary, formatPatientSummaryForDoctor };