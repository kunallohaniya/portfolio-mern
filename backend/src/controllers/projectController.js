const Project = require('../models/Project');
const { validationResult } = require('express-validator');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin only)
const createProject = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const project = new Project(req.body);
  await project.save();

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: {
      project
    }
  });
});

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Only fetch published projects for public access
  const projects = await Project.find({ status: 'published' })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-__v');

  const total = await Project.countDocuments({ status: 'published' });

  res.status(200).json({
    success: true,
    data: {
      projects,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalProjects: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    }
  });
});

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ 
    status: 'published',
    featured: true 
  })
    .sort({ createdAt: -1 })
    .limit(6)
    .select('-__v');

  res.status(200).json({
    success: true,
    data: {
      projects
    }
  });
});

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    status: 'published'
  }).select('-__v');

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      project
    }
  });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin only)
const updateProject = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    data: {
      project
    }
  });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully'
  });
});

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getFeaturedProjects
};