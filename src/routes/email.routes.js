const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');

/**
 * Rutas para el manejo de correos electrónicos
 */

// Health check
router.get('/health', emailController.healthCheck.bind(emailController));

// Envío de correos individuales
router.post('/appointment-confirmation', emailController.sendAppointmentConfirmation.bind(emailController));
router.post('/appointment-reminder', emailController.sendAppointmentReminder.bind(emailController));
router.post('/diagnosis-notification', emailController.sendDiagnosisNotification.bind(emailController));

// Envío en lote
router.post('/batch', emailController.sendBatchEmails.bind(emailController));

module.exports = router;
