const emailService = require('../services/email.service');

/**
 * Controlador para manejar las peticiones de envío de correos
 */
class EmailController {
    
    /**
     * Envía un correo de confirmación de cita
     * POST /api/emails/appointment-confirmation
     */
    async sendAppointmentConfirmation(req, res) {
        try {
            const {
                email,
                nombrePaciente,
                fecha,
                hora,
                nombreMedico,
                especialidad,
                nombreUsuario
            } = req.body;

            // Validación de campos requeridos
            if (!email || !nombrePaciente || !fecha || !hora || !nombreMedico || !especialidad) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos requeridos',
                    required: ['email', 'nombrePaciente', 'fecha', 'hora', 'nombreMedico', 'especialidad']
                });
            }

            const result = await emailService.sendAppointmentConfirmation(req.body);
            
            res.status(200).json({
                success: true,
                message: 'Correo de confirmación enviado exitosamente',
                data: result
            });
        } catch (error) {
            console.error('Error en sendAppointmentConfirmation:', error);
            res.status(500).json({
                success: false,
                message: 'Error al enviar correo de confirmación',
                error: error.message
            });
        }
    }

    /**
     * Envía un correo de recordatorio de cita
     * POST /api/emails/appointment-reminder
     */
    async sendAppointmentReminder(req, res) {
        try {
            const {
                email,
                nombrePaciente,
                fecha,
                hora,
                nombreMedico,
                especialidad
            } = req.body;

            // Validación de campos requeridos
            if (!email || !nombrePaciente || !fecha || !hora || !nombreMedico || !especialidad) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos requeridos',
                    required: ['email', 'nombrePaciente', 'fecha', 'hora', 'nombreMedico', 'especialidad']
                });
            }

            const result = await emailService.sendAppointmentReminder(req.body);
            
            res.status(200).json({
                success: true,
                message: 'Recordatorio enviado exitosamente',
                data: result
            });
        } catch (error) {
            console.error('Error en sendAppointmentReminder:', error);
            res.status(500).json({
                success: false,
                message: 'Error al enviar recordatorio',
                error: error.message
            });
        }
    }

    /**
     * Envía un correo de notificación de diagnóstico
     * POST /api/emails/diagnosis-notification
     */
    async sendDiagnosisNotification(req, res) {
        try {
            const {
                email,
                nombrePaciente,
                nombreMedico,
                especialidad,
                fecha,
                diagnostico
            } = req.body;

            // Validación de campos requeridos
            if (!email || !nombrePaciente || !nombreMedico || !especialidad || !fecha || !diagnostico) {
                return res.status(400).json({
                    success: false,
                    message: 'Faltan campos requeridos',
                    required: ['email', 'nombrePaciente', 'nombreMedico', 'especialidad', 'fecha', 'diagnostico']
                });
            }

            const result = await emailService.sendDiagnosisNotification(req.body);
            
            res.status(200).json({
                success: true,
                message: 'Notificación de diagnóstico enviada exitosamente',
                data: result
            });
        } catch (error) {
            console.error('Error en sendDiagnosisNotification:', error);
            res.status(500).json({
                success: false,
                message: 'Error al enviar notificación de diagnóstico',
                error: error.message
            });
        }
    }

    /**
     * Envía múltiples correos en lote
     * POST /api/emails/batch
     */
    async sendBatchEmails(req, res) {
        try {
            const { emails } = req.body;

            if (!emails || !Array.isArray(emails) || emails.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Se requiere un array de correos no vacío'
                });
            }

            const results = await emailService.sendBatchEmails(emails);
            
            res.status(200).json({
                success: true,
                message: 'Proceso de envío en lote completado',
                data: {
                    total: emails.length,
                    successful: results.successful.length,
                    failed: results.failed.length,
                    details: results
                }
            });
        } catch (error) {
            console.error('Error en sendBatchEmails:', error);
            res.status(500).json({
                success: false,
                message: 'Error al enviar correos en lote',
                error: error.message
            });
        }
    }

    /**
     * Endpoint de health check
     * GET /api/emails/health
     */
    async healthCheck(req, res) {
        res.status(200).json({
            success: true,
            message: 'Servicio de correos funcionando correctamente',
            timestamp: new Date().toISOString(),
            timezone: 'America/La_Paz (GMT-4)'
        });
    }
}

module.exports = new EmailController();
