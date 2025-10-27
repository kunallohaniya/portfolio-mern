const User = require('../models/User');
const { validationResult } = require('express-validator');
const { generateToken, setAuthCookie, clearAuthCookie } = require('../middleware/authMiddleware');
const { asyncHandler } = require('../middleware/errorMiddleware');

// @desc    Register a new admin user
// @route   POST /api/auth/register
// @access  Private (should be called only once during setup)
const registerAdmin = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email or username already exists'
    });
  }

  // Create new user
  const user = new User({
    username,
    email,
    password,
    role: 'admin'
  });

  await user.save();

  // Generate token
  const token = generateToken(user._id);
  
  // Set HTTP-only cookie
  setAuthCookie(res, token);

  res.status(201).json({
    success: true,
    message: 'Admin user created successfully',
    data: {
      user: user.toJSON()
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Check if user is active
  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Account is deactivated'
    });
  }

  // Compare password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate token
  const token = generateToken(user._id);
  
  // Set HTTP-only cookie
  setAuthCookie(res, token);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: user.toJSON()
    }
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user
    }
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  const userId = req.user._id;

  // Check if email or username is already taken by another user
  if (email || username) {
    const existingUser = await User.findOne({
      _id: { $ne: userId },
      $or: [
        ...(email ? [{ email }] : []),
        ...(username ? [{ username }] : [])
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email or username already exists'
      });
    }
  }

  // Update user
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { username, email },
    { new: true, runValidators: true }
  ).select('-password');

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: updatedUser
    }
  });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  // Find user with password
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Verify current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    return res.status(400).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully'
  });
});

module.exports = {
  registerAdmin,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword
};