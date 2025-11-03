/**
 * Utilidades para manejo de fechas
 */

const { timezone } = require('../config/app.config');

/**
 * Formatea una fecha a string legible en español
 * @param {Date|string} date 
 * @returns {string}
 */
const formatDateToSpanish = (date) => {
    const d = new Date(date);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: timezone
    };
    return d.toLocaleDateString('es-BO', options);
};

/**
 * Formatea una fecha y hora completa
 * @param {Date|string} date 
 * @returns {string}
 */
const formatDateTime = (date) => {
    const d = new Date(date);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone
    };
    return d.toLocaleDateString('es-BO', options);
};

/**
 * Obtiene la fecha actual en la zona horaria de Bolivia (GMT-4)
 * @returns {Date}
 */
const getCurrentDateBolivia = () => {
    return new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
};

/**
 * Calcula si una fecha es mañana
 * @param {Date|string} date 
 * @returns {boolean}
 */
const isTomorrow = (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkDate = new Date(date);
    
    return tomorrow.toDateString() === checkDate.toDateString();
};

/**
 * Agrega días a una fecha
 * @param {Date} date 
 * @param {number} days 
 * @returns {Date}
 */
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

module.exports = {
    formatDateToSpanish,
    formatDateTime,
    getCurrentDateBolivia,
    isTomorrow,
    addDays
};
