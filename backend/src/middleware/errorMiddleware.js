/**
 * Enhanced error handling middleware
 */

// Enhanced error handler with more detailed error types
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error with more details
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    name: err.name,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 };
  }

  // Custom application errors
  if (err.name === 'ApplicationError') {
    error = { 
      message: err.message, 
      statusCode: err.statusCode || 400 
    };
  }

  // Default to 500 server error
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      error: err.name
    })
  });
};

// Handle 404 errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  error.name = 'NotFoundError';
  
  // Log 404 errors
  console.warn('404 Not Found:', {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  
  next(error);
};

// Async error wrapper for controllers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  // This middleware should be placed after validation middleware
  // It will catch validation errors and format them consistently
  const errors = req.validationErrors && req.validationErrors();
  
  if (errors && errors.length > 0) {
    const message = errors.map(err => err.msg).join(', ');
    return res.status(400).json({
      success: false,
      error: message,
      validationErrors: errors
    });
  }
  
  next();
};

module.exports = {
  errorHandler,
  notFound,
  asyncHandler,
  handleValidationErrors
};