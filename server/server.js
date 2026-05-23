const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const assignmentRoutes = require("./routes/assignmentRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//cors
const cors = require("cors");

//Routes
app.use("/api/auth", authRoutes);

//Assignments
app.use("/api/assignments", assignmentRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});