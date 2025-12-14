/**
 * Input Validation Utilities
 * Provides secure input validation and sanitization
 */

/**
 * Validates email address
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return { valid: false, error: 'Email is required' };
  }
  
  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  if (trimmedEmail.length > 254) {
    return { valid: false, error: 'Email is too long (max 254 characters)' };
  }
  
  return { valid: true, email: trimmedEmail };
};

/**
 * Validates password strength
 */
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false
  } = options;
  
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required' };
  }
  
  if (password.length < minLength) {
    return { valid: false, error: `Password must be at least ${minLength} characters long` };
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter' };
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one lowercase letter' };
  }
  
  if (requireNumbers && !/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' };
  }
  
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one special character' };
  }
  
  // Check for common weak passwords
  const commonPasswords = ['password', '12345678', 'qwerty', 'abc123', 'password123'];
  if (commonPasswords.includes(password.toLowerCase())) {
    return { valid: false, error: 'Password is too common. Please choose a stronger password' };
  }
  
  return { valid: true };
};

/**
 * Validates numeric input
 */
export const validateNumber = (value, options = {}) => {
  const {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    integer = false,
    required = true
  } = options;
  
  if (value === null || value === undefined || value === '') {
    if (required) {
      return { valid: false, error: 'This field is required' };
    }
    return { valid: true, value: null };
  }
  
  const num = integer ? parseInt(value, 10) : parseFloat(value);
  
  if (isNaN(num)) {
    return { valid: false, error: 'Invalid number' };
  }
  
  if (integer && !Number.isInteger(num)) {
    return { valid: false, error: 'Must be a whole number' };
  }
  
  if (num < min) {
    return { valid: false, error: `Value must be at least ${min}` };
  }
  
  if (num > max) {
    return { valid: false, error: `Value must be at most ${max}` };
  }
  
  return { valid: true, value: num };
};

/**
 * Validates text input with length constraints
 */
export const validateText = (value, options = {}) => {
  const {
    minLength = 0,
    maxLength = 1000,
    required = true,
    trim = true
  } = options;
  
  const text = trim ? (value || '').trim() : (value || '');
  
  if (!text && required) {
    return { valid: false, error: 'This field is required' };
  }
  
  if (text.length < minLength) {
    return { valid: false, error: `Must be at least ${minLength} characters` };
  }
  
  if (text.length > maxLength) {
    return { valid: false, error: `Must be at most ${maxLength} characters` };
  }
  
  return { valid: true, value: text };
};

/**
 * Validates URL
 */
export const validateUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'URL is required' };
  }
  
  const trimmedUrl = url.trim();
  
  try {
    const urlObj = new URL(trimmedUrl);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { valid: false, error: 'URL must use http or https protocol' };
    }
    return { valid: true, url: trimmedUrl };
  } catch (e) {
    return { valid: false, error: 'Invalid URL format' };
  }
};

/**
 * Sanitizes string to prevent XSS (basic)
 * For production, use DOMPurify library
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') {
    return '';
  }
  
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validates product ID from URL
 */
export const validateProductId = (id) => {
  if (!id) {
    return { valid: false, error: 'Product ID is required' };
  }
  
  const productId = parseInt(id, 10);
  
  if (isNaN(productId)) {
    return { valid: false, error: 'Invalid product ID format' };
  }
  
  if (productId <= 0) {
    return { valid: false, error: 'Product ID must be positive' };
  }
  
  if (productId > Number.MAX_SAFE_INTEGER) {
    return { valid: false, error: 'Product ID is too large' };
  }
  
  return { valid: true, id: productId };
};

