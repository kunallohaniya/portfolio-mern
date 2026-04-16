const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
  getContactById
} = require('../controllers/contactController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

// Validation middleware
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Subject must be between 3 and 200 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 5, max: 2000 })
    .withMessage('Message must be between 5 and 2000 characters'),
  // recaptchaToken is optional in validation but checked in controller
  body('recaptchaToken')
    .optional()
    .notEmpty()
    .withMessage('reCAPTCHA token cannot be empty if provided')
];

router.post('/', contactValidation, submitContact);

// @route   GET /api/contact
// @desc    Get all contact messages (admin only)
// @access  Private (Admin)
router.get('/', authenticateToken, requireAdmin, getContacts);

// @route   GET /api/contact/:id
// @desc    Get contact by ID (admin only)
// @access  Private (Admin)
router.get('/:id', authenticateToken, requireAdmin, getContactById);

// @route   PUT /api/contact/:id
// @desc    Update contact status (admin only)
// @access  Private (Admin)
router.put('/:id', authenticateToken, requireAdmin, updateContactStatus);

// @route   DELETE /api/contact/:id
// @desc    Delete contact message (admin only)
// @access  Private (Admin)
router.delete('/:id', authenticateToken, requireAdmin, deleteContact);

module.exports = router;
