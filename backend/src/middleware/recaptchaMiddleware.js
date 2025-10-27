const axios = require('axios');

// Middleware to verify reCAPTCHA v3 token
const verifyRecaptcha = async (req, res, next) => {
  try {
    const { recaptchaToken } = req.body;

    // Check if reCAPTCHA token is provided
    if (!recaptchaToken) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA token is required'
      });
    }

    // Verify reCAPTCHA token with Google
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    
    const response = await axios.post(verificationURL);
    const { success, score, action, hostname, 'error-codes': errorCodes } = response.data;

    // Check if verification was successful
    if (!success) {
      console.error('reCAPTCHA verification failed:', errorCodes);
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed',
        error: process.env.NODE_ENV === 'development' ? errorCodes : undefined
      });
    }

    // Check if score is above threshold (0.5 is recommended)
    if (score < 0.5) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA score too low. Possible bot activity detected.'
      });
    }

    // Attach reCAPTCHA data to request for further use if needed
    req.recaptcha = { success, score, action, hostname };
    
    next();
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during reCAPTCHA verification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { verifyRecaptcha };