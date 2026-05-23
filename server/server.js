const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const assignmentRoutes = require("./routes/assignmentRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();


// Middleware

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://study-sync-gilt-five.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());


// Routes

app.use("/api/auth", authRoutes);

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