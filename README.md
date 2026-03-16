# MediTrace AI – Health Intelligence System

MediTrace AI is an AI-powered healthcare intelligence platform that helps users analyze medical reports, detect potential health risks, and access critical medical information quickly.

## 🚀 Key Features

• AI-based medical report analysis
• Health risk scoring system
• Medical history timeline generation
• Emergency health profile access
• Intelligent health insights and recommendations

---

# 🧠 Backend APIs

The backend is built using **Node.js, Express.js, and AI-based analysis logic**.

Base URL:

```
http://localhost:5000/api
```

---

## 1️⃣ Analyze Medical Report

**Endpoint**

```
POST /analyze-report
```

**Description**

Uploads a medical report (PDF) and analyzes it using AI logic to detect health risks and generate insights.

**Request**

Body → `form-data`

| Key    | Type | Description        |
| ------ | ---- | ------------------ |
| report | File | Medical report PDF |

**Response Example**

```
{
  "message": "Report analyzed successfully",
  "riskScore": 55,
  "riskLevel": "Medium",
  "detectedRisks": [
    "High Cholesterol",
    "Diabetes Indicators"
  ],
  "recommendations": [
    "Consult a healthcare professional",
    "Maintain healthy diet",
    "Regular health checkups"
  ]
}
```

---

## 2️⃣ Health Insights API

**Endpoint**

```
GET /health-insights/:patientId
```

**Description**

Generates health insights and recommendations for a patient.

**Example**

```
GET /health-insights/101
```

**Response Example**

```
{
 "patientId": "101",
 "healthScore": 72,
 "riskAlerts": [
   "High cholesterol risk"
 ],
 "recommendations": [
   "Reduce saturated fat intake",
   "Exercise regularly"
 ]
}
```

---

## 3️⃣ Medical Timeline API

**Endpoint**

```
GET /medical-timeline/:patientId
```

**Description**

Returns a chronological timeline of the patient’s medical history.

**Response Example**

```
[
 { "year": 2026, "event": "Blood Test" },
 { "year": 2025, "event": "Diabetes Diagnosis" }
]
```

---

## 4️⃣ Emergency Health Profile

**Endpoint**

```
GET /emergency-profile/:patientId
```

**Description**

Returns critical health data that can be used during medical emergencies.

**Response Example**

```
{
 "patientId": "101",
 "bloodGroup": "O+",
 "allergies": ["Penicillin"],
 "chronicDiseases": ["Diabetes"],
 "emergencyContact": {
   "name": "Anita Sharma",
   "relation": "Mother",
   "phone": "9876543210"
 }
}
```

---

# 🛠 Tech Stack

Backend
• Node.js
• Express.js

AI Processing
• PDF Text Extraction (`pdf-parse`)
• Keyword-based Health Risk Analysis

Database (Planned Integration)
• MongoDB

---

# 📌 Project Vision

MediTrace AI aims to simplify healthcare data management by allowing patients and healthcare providers to quickly analyze medical reports, track health history, and access emergency medical information through an intelligent AI-driven system.

---

# 👩‍💻 Contributors

• Shivangi – AI Backend & Intelligence Layer
• Team Members – Frontend & Core Infrastructure

# 📂 Project Structure

```
MediTrace-AI
│
├── backend
│   ├── controllers
│   │   ├── analyzeController.js
│   │   ├── healthController.js
│   │   ├── timelineController.js
│   │   └── emergencyController.js
│   │
│   ├── routes
│   │   ├── analyzeRoutes.js
│   │   ├── healthRoutes.js
│   │   ├── timelineRoutes.js
│   │   └── emergencyRoutes.js
│   │
│   ├── uploads
│   │
│   ├── server.js
│   └── package.json
│
├── frontend
│
├── ai-module
│
└── README.md
```

---

# ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Shivangi-121/MediTrace-AI--Health-Intelligence-System.git
```

---

### 2️⃣ Navigate to backend

```
cd MediTrace-AI--Health-Intelligence-System/backend
```

---

### 3️⃣ Install dependencies

```
npm install
```

---

### 4️⃣ Start the backend server

```
node server.js
```

Server will run on:

```
http://localhost:5000
```

---

# 🧪 Testing APIs

Use **Postman** to test endpoints.

Example request:

```
POST http://localhost:5000/api/analyze-report
```

Body → form-data

```
Key: report
Type: File
```

Upload a medical report PDF to analyze.

---

# 🌟 Future Improvements

• Integration with MongoDB database
• Advanced AI health prediction models
• OCR-based medical report reading
• Real-time health monitoring dashboard

---

# 💡 Vision

MediTrace AI aims to become an intelligent healthcare assistant that simplifies medical data analysis, enabling faster diagnosis support and better health tracking.

# 🏗 System Architecture

MediTrace AI follows a modular architecture where the frontend interacts with backend APIs, which process medical reports using AI logic.

```
 id="sysarch1"
          ┌─────────────────────┐
          │     React Frontend  │
          │  (User Interface)   │
          └──────────┬──────────┘
                     │
                     │ API Requests
                     ▼
          ┌─────────────────────┐
          │   Node.js Backend   │
          │   Express Server    │
          └──────────┬──────────┘
                     │
        ┌────────────┼─────────────┐
        ▼            ▼             ▼
 ┌────────────┐ ┌────────────┐ ┌──────────────┐
 │ AI Analysis│ │ Health APIs│ │ Emergency API│
 │ (Reports)  │ │ Insights   │ │ Critical Data│
 └────────────┘ └────────────┘ └──────────────┘
                     │
                     ▼
          ┌─────────────────────┐
          │   Medical Insights  │
          │ Risk Score + Alerts │
          └─────────────────────┘
```

---

# 🔄 System Workflow

```
 id="sysflow1"
User uploads medical report
          ↓
Backend extracts report text
          ↓
AI analyzes medical data
          ↓
Health risk score generated
          ↓
Insights + recommendations returned
          ↓
Displayed on user dashboard
```


