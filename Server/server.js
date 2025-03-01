require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB on localhost:27017 (DLWHealth database)
mongoose
  .connect("mongodb://localhost:27017/DLWHealth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected to DLWHealth"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Schema for `healthdatas` collection
const healthSchema = new mongoose.Schema({
  heartbeat: Number,
  bloodPressure: String,
  stepCount: Number,
  pulse: Number,
  oxygenLevel: Number,
  sleep: Number, // Constant per day
  lastUpdated: { type: Date, default: Date.now },
  lastReset: { type: Date, default: Date.now }, // Tracks daily reset time
});

// ✅ Use `healthdatas` collection
const HealthData = mongoose.model("healthdatas", healthSchema);

// ✅ Function to Generate Health Data
const generateHealthData = (stepCount, sleep) => ({
  heartbeat: Math.floor(Math.random() * (120 - 60 + 1)) + 60, // 60-120 bpm
  bloodPressure: `${Math.floor(Math.random() * (140 - 90 + 1)) + 90}/${
    Math.floor(Math.random() * (90 - 60 + 1)) + 60
  }`,
  stepCount,
  pulse: Math.floor(Math.random() * (100 - 50 + 1)) + 50, // 50-100 bpm
  oxygenLevel: Math.floor(Math.random() * (100 - 80 + 1)) + 80, // 80-100%
  sleep, // Keep sleep constant per day
  lastUpdated: new Date(),
});

// ✅ Function to Continuously Update Data Every 10 Seconds
const updateHealthData = async () => {
  let existingData = await HealthData.findOne();

  const now = new Date();
  const lastResetDate = new Date(existingData?.lastReset || now);

  // ✅ Check if a new day has started (Step count & Sleep reset daily)
  const isNewDay = now.getDate() !== lastResetDate.getDate();

  if (!existingData) {
    console.log("📥 No data found. Creating initial health record...");
    existingData = new HealthData({
      ...generateHealthData(0, Math.floor(Math.random() * (10 - 4 + 1)) + 4), // Start fresh
      lastReset: now,
    });
    await existingData.save();
  } else {
    console.log("🔄 Updating health data...");

    let newSleep = existingData.sleep;
    let newStepCount = existingData.stepCount;

    if (isNewDay) {
      newSleep = Math.floor(Math.random() * (10 - 4 + 1)) + 4; // Reset sleep (4-10 hours)
      newStepCount = 0; // Reset step count
      existingData.lastReset = now;
    } else {
      newStepCount += Math.floor(Math.random() * (50 - 10 + 1)) + 10; // Increment step count
    }

    existingData.set(generateHealthData(newStepCount, newSleep));
    await existingData.save();
  }

  console.log("✅ Health Data Updated:", existingData);
};

// ✅ API Endpoint to Fetch Latest Data
app.get("/api/health", async (req, res) => {
  try {
    const healthData = await HealthData.findOne();
    res.json(healthData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching health data" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await updateHealthData(); // Populate if empty
  setInterval(updateHealthData, 10 * 1000); // Update every 10 seconds
});
