/**
 * login.js - Validation for consolidated Roll Number / Email ID login.
 */

/**
 * Validates the login fields for empty inputs.
 * @param {Object} fields
 * @param {string} fields.username - Roll Number or Email ID
 * @param {string} fields.password
 * @returns {Object} Errors object
 */
export function validateLogin({ username, password }) {
  const errors = {};

  if (!username) {
    errors.username = 'Please enter Roll Number / Email ID';
  }

  if (!password) {
    errors.password = 'Please enter Password';
  }

  return errors;
}
