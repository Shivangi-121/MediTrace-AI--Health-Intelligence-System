// ai-module/documentReader.js
const fs = require('fs');
const path = require('path');

// Mock AI document reader - in production, this would use OCR + NLP models
function extractMedicalData(filePath) {
  // Simulate AI extraction from medical documents
  // In a real implementation, this would use:
  // - OCR for scanned documents
  // - NLP for text analysis
  // - Medical entity recognition
  // - Template matching for common report formats

  const fileName = path.basename(filePath).toLowerCase();

  // Mock extraction based on filename patterns
  const extractedData = {
    diseases: [],
    medicines: [],
    labResults: {},
    doctorName: '',
    reportDate: '',
    patientName: '',
    reportType: ''
  };

  // Simulate different types of medical reports
  if (fileName.includes('diabetes') || fileName.includes('glucose')) {
    extractedData.diseases.push('Diabetes');
    extractedData.medicines.push('Metformin 500mg');
    extractedData.labResults = {
      'Fasting Glucose': '142 mg/dL',
      'HbA1c': '7.2%',
      'Postprandial Glucose': '180 mg/dL'
    };
    extractedData.doctorName = 'Dr. Sarah Johnson';
    extractedData.reportDate = '2024-03-15';
    extractedData.reportType = 'Diabetes Test Report';
  } else if (fileName.includes('blood') || fileName.includes('pressure') || fileName.includes('bp')) {
    extractedData.diseases.push('Hypertension');
    extractedData.medicines.push('Amlodipine 5mg');
    extractedData.labResults = {
      'Systolic BP': '150 mmHg',
      'Diastolic BP': '95 mmHg',
      'Heart Rate': '78 bpm'
    };
    extractedData.doctorName = 'Dr. Michael Chen';
    extractedData.reportDate = '2024-02-20';
    extractedData.reportType = 'Blood Pressure Report';
  } else if (fileName.includes('cholesterol') || fileName.includes('lipid')) {
    extractedData.diseases.push('High Cholesterol');
    extractedData.medicines.push('Atorvastatin 10mg');
    extractedData.labResults = {
      'Total Cholesterol': '230 mg/dL',
      'LDL': '150 mg/dL',
      'HDL': '35 mg/dL',
      'Triglycerides': '180 mg/dL'
    };
    extractedData.doctorName = 'Dr. Emily Davis';
    extractedData.reportDate = '2024-01-10';
    extractedData.reportType = 'Lipid Profile Report';
  } else if (fileName.includes('allergy')) {
    extractedData.diseases.push('Allergic Rhinitis');
    extractedData.medicines.push('Cetirizine 10mg', 'Fluticasone Nasal Spray');
    extractedData.labResults = {
      'IgE Level': '450 IU/mL',
      'Dust Mite Allergy': 'Positive',
      'Pollen Allergy': 'Positive'
    };
    extractedData.doctorName = 'Dr. Robert Wilson';
    extractedData.reportDate = '2023-11-05';
    extractedData.reportType = 'Allergy Test Report';
  } else {
    // Generic health checkup
    extractedData.labResults = {
      'Hemoglobin': '14.2 g/dL',
      'WBC Count': '7.8 × 10³/µL',
      'Platelets': '2.5 × 10⁵/µL'
    };
    extractedData.doctorName = 'Dr. Lisa Anderson';
    extractedData.reportDate = new Date().toISOString().split('T')[0];
    extractedData.reportType = 'General Health Checkup';
  }

  // Extract patient name from filename or use default
  if (fileName.includes('john') || fileName.includes('doe')) {
    extractedData.patientName = 'John Doe';
  } else {
    extractedData.patientName = 'Patient';
  }

  return extractedData;
}

// Extract structured patient data for risk analysis
function extractPatientMetrics(extractedData) {
  const metrics = {};

  // Extract numerical values from lab results
  Object.entries(extractedData.labResults).forEach(([test, value]) => {
    const numValue = parseFloat(value.replace(/[^\d.]/g, ''));
    if (!isNaN(numValue)) {
      if (test.toLowerCase().includes('glucose') || test.toLowerCase().includes('sugar')) {
        metrics.glucose = numValue;
      } else if (test.toLowerCase().includes('systolic') || test.toLowerCase().includes('bp') && test.toLowerCase().includes('sys')) {
        metrics.systolic_bp = numValue;
      } else if (test.toLowerCase().includes('diastolic') && test.toLowerCase().includes('bp')) {
        metrics.diastolic_bp = numValue;
      } else if (test.toLowerCase().includes('cholesterol') && !test.toLowerCase().includes('ldl') && !test.toLowerCase().includes('hdl')) {
        metrics.cholesterol = numValue;
      } else if (test.toLowerCase().includes('ldl')) {
        metrics.ldl = numValue;
      } else if (test.toLowerCase().includes('hdl')) {
        metrics.hdl = numValue;
      } else if (test.toLowerCase().includes('triglycerides')) {
        metrics.triglycerides = numValue;
      } else if (test.toLowerCase().includes('hba1c') || test.toLowerCase().includes('hb a1c')) {
        metrics.hba1c = numValue;
      }
    }
  });

  return metrics;
}

module.exports = { extractMedicalData, extractPatientMetrics };