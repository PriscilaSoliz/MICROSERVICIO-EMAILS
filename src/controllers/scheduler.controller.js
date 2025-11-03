const schedulerService = require('../services/scheduler.service');

/**
 * Controlador para manejar las operaciones del scheduler
 */
class SchedulerController {
    
    /**
     * Ejecuta manualmente el job de recordatorios
     * POST /api/scheduler/execute-reminders
     */
    async executeReminders(req, res) {
        try {
            await schedulerService.executeReminderJobNow();
            
            res.status(200).json({
                success: true,
                message: 'Job de recordatorios ejecutado manualmente',
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error al ejecutar recordatorios:', error);
            res.status(500).json({
                success: false,
                message: 'Error al ejecutar job de recordatorios',
                error: error.message
            });
        }
    }

    /**
     * Obtiene el estado del scheduler
     * GET /api/scheduler/status
     */
    async getStatus(req, res) {
        res.status(200).json({
            success: true,
            message: 'Scheduler activo',
            jobs: [
                {
                    name: 'appointment_reminder',
                    schedule: '9:00 AM diario',
                    timezone: 'America/La_Paz (GMT-4)',
                    description: 'Envía recordatorios 24 horas antes de las citas'
                }
            ],
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = new SchedulerController();
