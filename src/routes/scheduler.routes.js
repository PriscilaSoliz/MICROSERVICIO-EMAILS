const express = require('express');
const router = express.Router();
const schedulerController = require('../controllers/scheduler.controller');

/**
 * Rutas para el manejo del scheduler
 */

// Estado del scheduler
router.get('/status', schedulerController.getStatus.bind(schedulerController));

// Ejecutar job manualmente
router.post('/execute-reminders', schedulerController.executeReminders.bind(schedulerController));

module.exports = router;
