const express = require("express");

const {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
  getPublicAssignments,
  toggleAssignmentVisibility,
} = require("../controllers/assignmentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create assignment
router.post("/", protect, createAssignment);

// Get logged-in user's assignments
router.get("/", protect,getAssignments);

// Get all public assignments
router.get("/public",getPublicAssignments);

// Update assignment
router.put("/:id", protect, updateAssignment);

// Delete assignment
router.delete("/:id", protect, deleteAssignment);

// Toggle public/private
router.put("/:id/share", protect,toggleAssignmentVisibility);

module.exports = router;