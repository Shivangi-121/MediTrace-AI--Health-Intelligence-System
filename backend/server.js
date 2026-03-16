// 1️⃣ Import dependencies
const express = require("express");
const cors = require("cors");

// 2️⃣ Import route files
const uploadRoutes = require("./routes/uploadRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");
const timelineRoutes = require("./routes/timelineRoutes");
const healthRoutes = require("./routes/healthRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const aiDashboardRoutes = require("./routes/aiDashboardRoutes");

// 3️⃣ Create app
const app = express();

// 4️⃣ Middleware
app.use(cors({ origin: "http://localhost:3000" })); // allow frontend to call backend
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse form-data

// 5️⃣ API routes
app.use("/api", uploadRoutes);
app.use("/api", analyzeRoutes);
app.use("/api", timelineRoutes);
app.use("/api", healthRoutes);
app.use("/api", emergencyRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", chatbotRoutes);
app.use("/api", aiDashboardRoutes);

// 6️⃣ Test endpoints
app.get("/", (req, res) => {
  res.send("MediTrace AI Backend Running");
});

app.get("/test-upload", (req, res) => {
  res.send(`
    <form action="/api/upload-report" method="POST" enctype="multipart/form-data">
      <input type="file" name="report" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// 7️⃣ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});