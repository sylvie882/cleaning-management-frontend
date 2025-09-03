// src/utils/validators.js

/**
 * Email validation
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation - at least 6 chars, with at least one number and one letter
 * @param {string} password - Password to validate
 * @returns {boolean} True if password is valid
 */
export const isValidPassword = (password) => {
  if (!password || password.length < 6) return false;

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasLetter && hasNumber;
};

/**
 * Get password strength (weak, medium, strong)
 * @param {string} password - Password to check
 * @returns {string} Strength level
 */
export const getPasswordStrength = (password) => {
  if (!password) return "weak";

  let strength = 0;

  // Length check
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;

  // Character variety checks
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

  if (strength < 3) return "weak";
  if (strength < 5) return "medium";
  return "strong";
};

/**
 * Phone number validation - accepts various formats
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Check if there are enough digits (at least 10)
  return cleaned.length >= 10;
};

/**
 * Format phone number for display
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhone = (phone) => {
  if (!phone) return "";

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(
      7
    )}`;
  }

  // If doesn't match expected formats, return as is
  return phone;
};

/**
 * Validate time in HH:MM format
 * @param {string} time - Time string to validate
 * @returns {boolean} True if time is valid
 */
export const isValidTime = (time) => {
  if (!time) return false;

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
};

/**
 * Validate date in YYYY-MM-DD format
 * @param {string} date - Date string to validate
 * @returns {boolean} True if date is valid
 */
export const isValidDate = (date) => {
  if (!date) return false;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  // Check if it's a valid date
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

/**
 * Check if a date is in the future
 * @param {string} date - Date string to check
 * @returns {boolean} True if date is in the future
 */
export const isFutureDate = (date) => {
  if (!isValidDate(date)) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkDate = new Date(date);

  return checkDate >= today;
};

/**
 * Validate postal/zip code
 * @param {string} code - Postal/zip code to validate
 * @param {string} country - Country code (optional)
 * @returns {boolean} True if postal/zip code is valid
 */
export const isValidPostalCode = (code, country = "KE") => {
  if (!code) return false;

  // Different validation based on country
  switch (country.toUpperCase()) {
    case "US":
      return /^\d{5}(-\d{4})?$/.test(code);
    case "CA":
      return /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(code);
    case "KE":
      return /^\d{5}$/.test(code);
    default:
      // General postal code validation
      return /^[A-Za-z0-9\s-]{3,10}$/.test(code);
  }
};

/**
 * Validate form data against a schema
 * @param {Object} data - Form data to validate
 * @param {Object} schema - Validation schema
 * @returns {Object} Validation result with errors
 */
export const validateForm = (data, schema) => {
  const errors = {};

  for (const field in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, field)) {
      const rules = schema[field];
      const value = data[field];

      // Required check
      if (
        rules.required &&
        (!value || (typeof value === "string" && value.trim() === ""))
      ) {
        errors[field] = rules.errorMessages?.required || `${field} is required`;
        continue;
      }

      // Skip other validations if value is empty and not required
      if (!value && !rules.required) continue;

      // Min length check
      if (rules.minLength && value.length < rules.minLength) {
        errors[field] =
          rules.errorMessages?.minLength ||
          `${field} must be at least ${rules.minLength} characters`;
        continue;
      }

      // Max length check
      if (rules.maxLength && value.length > rules.maxLength) {
        errors[field] =
          rules.errorMessages?.maxLength ||
          `${field} must be no more than ${rules.maxLength} characters`;
        continue;
      }

      // Pattern check
      if (rules.pattern && !rules.pattern.test(value)) {
        errors[field] = rules.errorMessages?.pattern || `${field} is not valid`;
        continue;
      }

      // Custom validator
      if (rules.validator && typeof rules.validator === "function") {
        const isValid = rules.validator(value, data);
        if (!isValid) {
          errors[field] =
            rules.errorMessages?.validator || `${field} is not valid`;
          continue;
        }
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
