const express = require('express');
const { body, param, query } = require('express-validator');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getFeaturedProjects
} = require('../controllers/projectController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation middleware
const projectValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be between 1 and 1000 characters'),
  body('techStack')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('techStack.*')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Each technology must be a non-empty string'),
  body('imageUrl')
    .trim()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  body('liveLink')
    .optional({ nullable: true })
    .trim()
    .isURL()
    .withMessage('Live link must be a valid URL'),
  body('githubLink')
    .optional({ nullable: true })
    .trim()
    .isURL()
    .withMessage('GitHub link must be a valid URL'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean value'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Status must be one of: draft, published, archived')
];

const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid project ID format')
];

const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private (Admin only)
router.post('/', authenticateToken, requireAdmin, projectValidation, createProject);

// @route   GET /api/projects
// @desc    Get all projects (public with optional pagination)
// @access  Public
router.get('/', paginationValidation, getProjects);

// @route   GET /api/projects/featured
// @desc    Get featured projects
// @access  Public
router.get('/featured', getFeaturedProjects);

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', idValidation, getProjectById);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Admin only)
router.put('/:id', authenticateToken, requireAdmin, idValidation, projectValidation, updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, idValidation, deleteProject);

module.exports = router;