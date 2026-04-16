const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const verifyCaptcha = require('../utils/verifyCaptcha');
const { asyncHandler } = require('../middleware/errorMiddleware');
const { sendContactNotification, sendAutoReplyEmail } = require('../utils/mailer');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map(err => `${err.path}: ${err.msg}`).join(', ');
    console.log('Validation failed:', errorDetails);
    return res.status(400).json({
      success: false,
      message: `Validation failed: ${errorDetails}`,
      errors: errors.array()
    });
  }

  const { name, email, subject, message, recaptchaToken } = req.body;
  
  // Log received data for debugging (without sensitive info)
  console.log('Contact form submission received from:', email);

  if(!recaptchaToken) {
    return res.status(400).json( {
      success: false,
      message: 'reCAPTCHA verification is required but token was missing.'
    });
  }

  const isHuman = await verifyCaptcha(recaptchaToken);

  if(!isHuman) {
    console.log('reCAPTCHA verification failed for:', email);
    return res.status(400).json({
      success: false,
      message: 'reCAPTCHA verification failed. Please ensure you are not using a VPN and try again.'
    });
  }

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

  // Send admin notification email (Background - do not await)
  sendContactNotification({ name, email, subject, message })
    .catch(err => console.error('Background Admin email failed:', err));

  // Send auto-reply email to user (Background - do not await)
  sendAutoReplyEmail({ name, email })
    .catch(err => console.error('Background Auto-reply email failed:', err));

  res.status(200).json({
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