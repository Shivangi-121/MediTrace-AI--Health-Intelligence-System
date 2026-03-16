const emergencyRoutes = require("./routes/emergencyRoutes");
const healthRoutes = require("./routes/healthRoutes");
const timelineRoutes = require("./routes/timelineRoutes");
const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
  res.send("MedTrace AI Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/test-upload", (req, res) => {
  res.send(`
    <form action="/api/upload-report" method="POST" enctype="multipart/form-data">
      <input type="file" name="report" />
      <button type="submit">Upload</button>
    </form>
  `);
});
const analyzeRoutes = require("./routes/analyzeRoutes");

app.use("/api", analyzeRoutes);
app.use("/api", timelineRoutes);
app.use("/api", healthRoutes);
app.use("/api", emergencyRoutes);