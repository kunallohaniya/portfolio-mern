/**
 * Security middleware for enhanced protection
 */

// Prevent XSS attacks by sanitizing user input
const sanitizeInput = (req, res, next) => {
  // Sanitize request body
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        // Remove potential XSS attack vectors
        req.body[key] = req.body[key]
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
      }
    }
  }

  // Sanitize request query parameters
  if (req.query) {
    for (const key in req.query) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = req.query[key]
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
      }
    }
  }

  next();
};

// Add security headers
const securityHeaders = (req, res, next) => {
  // X-Content-Type-Options
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // X-Frame-Options
  res.setHeader('X-Frame-Options', 'DENY');
  
  // X-XSS-Protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Strict-Transport-Security
  if (req.secure || req.get('X-Forwarded-Proto') === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  // Referrer-Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions-Policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  next();
};

// Limit requests based on user role or authentication status
const advancedRateLimit = (req, res, next) => {
  // This is a placeholder for more advanced rate limiting
  // In a production environment, you might want to implement:
  // - Different limits for authenticated vs unauthenticated users
  // - IP-based tracking with Redis
  // - User-based rate limiting
  next();
};

// Log security events
const securityLogger = (req, res, next) => {
  // Log suspicious activities
  const userAgent = req.get('User-Agent');
  const ip = req.ip || req.connection.remoteAddress;
  
  // Check for common attack patterns
  const suspiciousPatterns = [
    /(\b|\d)union(\b|\d)/i,
    /(\b|\d)select(\b|\d)/i,
    /(\b|\d)insert(\b|\d)/i,
    /(\b|\d)update(\b|\d)/i,
    /(\b|\d)delete(\b|\d)/i,
    /<script/i,
    /javascript:/i
  ];
  
  let isSuspicious = false;
  const requestData = {
    url: req.url,
    method: req.method,
    ip: ip,
    userAgent: userAgent,
    timestamp: new Date().toISOString()
  };
  
  // Check body for suspicious patterns
  if (req.body) {
    const bodyString = JSON.stringify(req.body);
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(bodyString)) {
        isSuspicious = true;
        break;
      }
    }
  }
  
  // Check query for suspicious patterns
  if (req.query) {
    const queryString = JSON.stringify(req.query);
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(queryString)) {
        isSuspicious = true;
        break;
      }
    }
  }
  
  if (isSuspicious) {
    console.warn('Suspicious activity detected:', requestData);
    // In production, you might want to send this to a monitoring service
  }
  
  next();
};

module.exports = {
  sanitizeInput,
  securityHeaders,
  advancedRateLimit,
  securityLogger
};