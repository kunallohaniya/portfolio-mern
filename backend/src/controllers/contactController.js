const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { verifyRecaptcha } = require('../middleware/recaptchaMiddleware');
const { asyncHandler } = require('../middleware/errorMiddleware');
const { sendContactNotification } = require('../utils/mailer');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = asyncHandler(async (req, res) => {
  // Verify reCAPTCHA first
  await new Promise((resolve, reject) => {
    verifyRecaptcha(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { name, email, subject, message } = req.body;

  // Check if database is connected
  if (!mongoose.connection.readyState) {
    console.log('Database not connected, storing contact in memory/log');
    // Log the contact submission
    console.log('Contact submission:', { name, email, subject, message, timestamp: new Date() });
    
    return res.status(200).json({
      success: true,
      message: 'Message received! (Database offline - logged for review)',
      data: {
        name,
        email,
        subject,
        timestamp: new Date()
      }
    });
  }

  // Create new contact entry
  const contact = new Contact({
    name,
    email,
    subject,
    message
  });

  await contact.save();

  // Send email notification (optional - won't fail if email not configured)
  try {
    await sendContactNotification({ name, email, subject, message });
  } catch (emailError) {
    console.error('Email sending failed:', emailError);
    // Don't fail the request if email fails
  }

  res.status(201).json({
    success: true,
    message: 'Message sent successfully!',
    data: {
      id: contact._id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      createdAt: contact.createdAt
    }
  });
});

// @desc    Get all contact messages (admin only)
// @route   GET /api/contact
// @access  Private (add authentication middleware later)
const getContacts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;
  const search = req.query.search;

  // Build query
  let query = {};
  
  if (status) {
    query.status = status;
  }
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } },
      { message: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * limit;

  const contacts = await Contact.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-__v');

  const total = await Contact.countDocuments(query);

  res.status(200).json({
    success: true,
    data: {
      contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalContacts: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    }
  });
});

// @desc    Get contact by ID (admin only)
// @route   GET /api/contact/:id
// @access  Private (Admin)
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id).select('-__v');

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact message not found'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      contact
    }
  });
});

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private
const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  if (!['new', 'read', 'replied'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status. Must be new, read, or replied.'
    });
  }

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Contact status updated',
    data: contact
  });
});

// @desc    Delete contact message (admin only)
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact message not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Contact message deleted successfully'
  });
});

module.exports = {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact
};