/**
 * Utilidades para validación de datos
 */

/**
 * Valida si un email tiene formato correcto
 * @param {string} email 
 * @returns {boolean}
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Valida si una fecha es válida
 * @param {string} dateString 
 * @returns {boolean}
 */
const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
};

/**
 * Valida los campos requeridos en un objeto
 * @param {Object} obj 
 * @param {Array<string>} requiredFields 
 * @returns {Object} { valid: boolean, missing: Array<string> }
 */
const validateRequiredFields = (obj, requiredFields) => {
    const missing = requiredFields.filter(field => !obj[field]);
    return {
        valid: missing.length === 0,
        missing
    };
};

/**
 * Sanitiza un string removiendo caracteres peligrosos
 * @param {string} str 
 * @returns {string}
 */
const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/[<>]/g, '');
};

module.exports = {
    isValidEmail,
    isValidDate,
    validateRequiredFields,
    sanitizeString
};
