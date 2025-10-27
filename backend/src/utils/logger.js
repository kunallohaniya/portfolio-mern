/**
 * Logger utility for application logging
 */

// Define log levels
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

// Get current log level from environment or default to INFO
const currentLogLevel = LOG_LEVELS[process.env.LOG_LEVEL] || LOG_LEVELS.INFO;

// Format timestamp
const formatTimestamp = () => {
  return new Date().toISOString();
};

// Get client IP address
const getClientIP = (req) => {
  return req.ip || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
         'Unknown';
};

// Format log message
const formatLogMessage = (level, message, meta = {}) => {
  return {
    timestamp: formatTimestamp(),
    level,
    message,
    ...meta
  };
};

// Write log to console
const writeLog = (logEntry) => {
  // In production, you might want to send logs to a logging service
  // For now, we'll just output to console
  console.log(JSON.stringify(logEntry));
};

// Log error
const logError = (message, error = null, meta = {}) => {
  if (LOG_LEVELS.ERROR <= currentLogLevel) {
    const logEntry = formatLogMessage('ERROR', message, {
      ...meta,
      ...(error && {
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name
        }
      })
    });
    writeLog(logEntry);
  }
};

// Log warning
const logWarn = (message, meta = {}) => {
  if (LOG_LEVELS.WARN <= currentLogLevel) {
    const logEntry = formatLogMessage('WARN', message, meta);
    writeLog(logEntry);
  }
};

// Log info
const logInfo = (message, meta = {}) => {
  if (LOG_LEVELS.INFO <= currentLogLevel) {
    const logEntry = formatLogMessage('INFO', message, meta);
    writeLog(logEntry);
  }
};

// Log debug
const logDebug = (message, meta = {}) => {
  if (LOG_LEVELS.DEBUG <= currentLogLevel) {
    const logEntry = formatLogMessage('DEBUG', message, meta);
    writeLog(logEntry);
  }
};

// Middleware for HTTP request logging
const requestLogger = (req, res, next) => {
  // Log incoming request
  logInfo('Incoming request', {
    method: req.method,
    url: req.originalUrl,
    ip: getClientIP(req),
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Capture response finish to log response
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    logInfo('Request completed', {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: getClientIP(req),
      userAgent: req.get('User-Agent')
    });
  });

  next();
};

// Middleware for error logging
const errorLogger = (err, req, res, next) => {
  logError('Unhandled error', err, {
    method: req.method,
    url: req.originalUrl,
    ip: getClientIP(req),
    userAgent: req.get('User-Agent')
  });
  
  next(err);
};

// Log database operations
const logDatabaseOperation = (operation, collection, documentId = null, meta = {}) => {
  logDebug('Database operation', {
    operation,
    collection,
    documentId,
    ...meta
  });
};

// Log authentication events
const logAuthEvent = (event, userId = null, ip = null, meta = {}) => {
  logInfo(`Auth event: ${event}`, {
    event,
    userId,
    ip,
    ...meta
  });
};

// Log security events
const logSecurityEvent = (event, severity = 'INFO', meta = {}) => {
  if (severity === 'ERROR' || severity === 'WARN') {
    logWarn(`Security event: ${event}`, {
      event,
      severity,
      ...meta
    });
  } else {
    logInfo(`Security event: ${event}`, {
      event,
      severity,
      ...meta
    });
  }
};

module.exports = {
  logError,
  logWarn,
  logInfo,
  logDebug,
  requestLogger,
  errorLogger,
  logDatabaseOperation,
  logAuthEvent,
  logSecurityEvent,
  LOG_LEVELS
};