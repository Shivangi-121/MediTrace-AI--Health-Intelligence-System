const { getAIDashboard } = require("./aiDashboardController");

exports.chatWithUser = async (req, res) => {
  try {
    const { patientId, message } = req.body;

    // ====== 1️⃣ Fetch patient data ======
    // Replace with real DB/OCR data in production
    const patientData = { glucose: 142, systolic_bp: 145, cholesterol: 220 };
    const records = [
      { date: "2026-03-10", test: "Blood Test" },
      { date: "2025-04-12", disease: "Diabetes" },
    ];

    // ====== 2️⃣ Get AI Dashboard ======
    const dashboard = await getAIDashboard(patientData, records);

    const msg = message.toLowerCase();
    let reply = "";

    // ====== 3️⃣ Smart summary for general queries ======
    const summaryTriggers = ["summary", "overall", "health status", "dashboard"];
    if (summaryTriggers.some((t) => msg.includes(t))) {
      reply = `💡 Health Summary for Patient ${patientId}:\n`;
      reply += `- Health Score: ${dashboard.healthScore}/100\n`;
      reply += `- Risks Detected: ${
        dashboard.risksDetected.length
          ? dashboard.risksDetected.join(", ")
          : "None"
      }\n`;
      reply += `- Recommendations: ${dashboard.insights.join(" ")}\n`;
      reply += `- Medical Timeline: ${dashboard.medicalTimeline
        .map((e) => `${e.year}: ${e.event}`)
        .join("; ")}`;
    }
    // ====== 4️⃣ Specific queries fallback ======
    else if (msg.includes("cholesterol")) {
      reply = dashboard.risksDetected.includes("Heart Disease Risk")
        ? "Your cholesterol is a bit high. Reduce fatty foods, exercise, and do follow-up tests."
        : "Your cholesterol levels are normal. Great job!";
    } else if (msg.includes("diabetes")) {
      reply = dashboard.risksDetected.includes("Diabetes Risk")
        ? "You have a possible diabetes risk. Monitor glucose and maintain a healthy diet."
        : "No diabetes risk detected. Keep up healthy habits!";
    } else if (msg.includes("risk level")) {
      reply = `Overall risk level: ${
        dashboard.risksDetected.length ? "Medium/High" : "Low"
      }`;
    } else if (msg.includes("recommendations")) {
      reply = `Tips for you: ${dashboard.insights.join(" ")}`;
    } else if (msg.includes("timeline") || msg.includes("history")) {
      reply = `Medical history: ${dashboard.medicalTimeline
        .map((e) => `${e.year}: ${e.event}`)
        .join("; ")}`;
    } else {
      reply = "You can ask me about your overall health summary, risks, recommendations, or medical history.";
    }

    res.json({ patientId, userMessage: message, botReply: reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong in chatbot API." });
  }
};