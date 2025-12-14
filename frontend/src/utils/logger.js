/**
 * Secure Logger Utility
 * Only logs in development environment
 * Never logs sensitive data (tokens, passwords, etc.)
 */

const isDevelopment = process.env.NODE_ENV === 'development';

// Sensitive keywords that should never be logged
const SENSITIVE_KEYWORDS = ['token', 'password', 'auth', 'bearer', 'jwt', 'secret', 'key', 'credential'];

const containsSensitiveData = (message) => {
  if (typeof message === 'string') {
    const lowerMessage = message.toLowerCase();
    return SENSITIVE_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
  }
  if (typeof message === 'object' && message !== null) {
    const messageStr = JSON.stringify(message).toLowerCase();
    return SENSITIVE_KEYWORDS.some(keyword => messageStr.includes(keyword));
  }
  return false;
};

const sanitizeMessage = (message) => {
  if (containsSensitiveData(message)) {
    return '[Sensitive data redacted]';
  }
  return message;
};

export const logger = {
  log: (...args) => {
    if (isDevelopment) {
      const sanitized = args.map(sanitizeMessage);
      console.log(...sanitized);
    }
  },
  
  error: (...args) => {
    if (isDevelopment) {
      const sanitized = args.map(sanitizeMessage);
      console.error(...sanitized);
    }
    // In production, could send to error tracking service
  },
  
  warn: (...args) => {
    if (isDevelopment) {
      const sanitized = args.map(sanitizeMessage);
      console.warn(...sanitized);
    }
  },
  
  info: (...args) => {
    if (isDevelopment) {
      const sanitized = args.map(sanitizeMessage);
      console.info(...sanitized);
    }
  }
};

export default logger;

