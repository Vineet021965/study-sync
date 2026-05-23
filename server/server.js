const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const assignmentRoutes = require("./routes/assignmentRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "https://your-vercel-app.vercel.app",
  credentials: true,
}));
app.use(express.json());

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