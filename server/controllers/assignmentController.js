const Assignment = require("../models/Assignment");

// Create Assignment
const createAssignment = async (req, res) => {
  try {
    const { title, subject, deadline, priority, isPublic } = req.body;

    const assignmentData = {
      title,
      subject,
      deadline,
      priority,
      sharedBy: req.user?.id || req.user?._id,
    };

    if (typeof isPublic !== "undefined") {
      assignmentData.isPublic = isPublic;
    }

    const assignment = await Assignment.create(assignmentData);

    res.status(201).json(assignment);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Assignments
const getAssignments = async (req, res) => {
  try {

    const assignments = await Assignment.find({
        sharedBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(assignments);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Update Assignment
const updateAssignment = async (req, res) => {
  try {

    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Ownership Check
    if (
      assignment.sharedBy.toString() !== req.user.id
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedAssignment);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete Assignment
const deleteAssignment = async (req, res) => {
  try {

    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Ownership Check
    if (
      assignment.sharedBy.toString() !== req.user.id
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await assignment.deleteOne();

    res.status(200).json({
      message: "Assignment deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get Public Assignments
const getPublicAssignments = async (req, res) => {
  try {

    const filter = {
      isPublic: true,
    };

    // Search by subject
    if (req.query.subject) {
      filter.subject = req.query.subject;
    }

    const assignments = await Assignment.find(filter)
      .populate("sharedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(assignments);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Toggle Public/Private Assignment
const toggleAssignmentVisibility = async (req, res) => {
  try {

    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Ownership Check
    if (
      assignment.sharedBy.toString() !== req.user.id
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    assignment.isPublic = !assignment.isPublic;

    const updatedAssignment = await assignment.save();

    res.status(200).json(updatedAssignment);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
  getPublicAssignments,
  toggleAssignmentVisibility,
};