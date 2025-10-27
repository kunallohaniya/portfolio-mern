const express = require('express');
const { body } = require('express-validator');
const {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
  getContactById
} = require('../controllers/contactController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation middleware
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Subject must be between 5 and 100 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
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
