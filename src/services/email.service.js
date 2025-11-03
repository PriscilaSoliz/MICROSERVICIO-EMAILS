const { transporter } = require('../config/email.config');
const { emailFrom } = require('../config/app.config');
const {
    appointmentConfirmationTemplate,
    appointmentReminderTemplate,
    diagnosisNotificationTemplate
} = require('../templates/email.templates');

/**
 * Servicio para el envío de correos electrónicos
 */
class EmailService {
    
    /**
     * Envía un correo de confirmación de cita
     * @param {Object} appointmentData - Datos de la cita
     * @returns {Promise<Object>} Resultado del envío
     */
    async sendAppointmentConfirmation(appointmentData) {
        try {
            const {
                email,
                nombrePaciente,
                fecha,
                hora,
                nombreMedico,
                especialidad,
                nombreUsuario
            } = appointmentData;

            const mailOptions = {
                from: emailFrom,
                to: email,
                subject: '✅ Confirmación de Cita Médica - Sistema Historial Clínico',
                html: appointmentConfirmationTemplate({
                    nombrePaciente,
                    fecha,
                    hora,
                    nombreMedico,
                    especialidad,
                    nombreUsuario
                })
            };

            const info = await transporter.sendMail(mailOptions);
            
            console.log(`✅ Correo de confirmación enviado a: ${email}`);
            console.log(`   Message ID: ${info.messageId}`);
            
            return {
                success: true,
                messageId: info.messageId,
                email: email,
                type: 'appointment_confirmation'
            };
        } catch (error) {
            console.error('❌ Error al enviar correo de confirmación:', error.message);
            throw new Error(`Error al enviar correo: ${error.message}`);
        }
    }

    /**
     * Envía un correo de recordatorio de cita
     * @param {Object} appointmentData - Datos de la cita
     * @returns {Promise<Object>} Resultado del envío
     */
    async sendAppointmentReminder(appointmentData) {
        try {
            const {
                email,
                nombrePaciente,
                fecha,
                hora,
                nombreMedico,
                especialidad
            } = appointmentData;

            const mailOptions = {
                from: emailFrom,
                to: email,
                subject: '⏰ Recordatorio: Su cita médica es mañana - Sistema Historial Clínico',
                html: appointmentReminderTemplate({
                    nombrePaciente,
                    fecha,
                    hora,
                    nombreMedico,
                    especialidad
                })
            };

            const info = await transporter.sendMail(mailOptions);
            
            console.log(`✅ Recordatorio enviado a: ${email}`);
            console.log(`   Message ID: ${info.messageId}`);
            
            return {
                success: true,
                messageId: info.messageId,
                email: email,
                type: 'appointment_reminder'
            };
        } catch (error) {
            console.error('❌ Error al enviar recordatorio:', error.message);
            throw new Error(`Error al enviar recordatorio: ${error.message}`);
        }
    }

    /**
     * Envía un correo de notificación de diagnóstico
     * @param {Object} diagnosisData - Datos del diagnóstico
     * @returns {Promise<Object>} Resultado del envío
     */
    async sendDiagnosisNotification(diagnosisData) {
        try {
            const {
                email,
                nombrePaciente,
                nombreMedico,
                especialidad,
                fecha,
                diagnostico,
                tratamiento
            } = diagnosisData;

            const mailOptions = {
                from: emailFrom,
                to: email,
                subject: '📋 Nuevo Diagnóstico Registrado - Sistema Historial Clínico',
                html: diagnosisNotificationTemplate({
                    nombrePaciente,
                    nombreMedico,
                    especialidad,
                    fecha,
                    diagnostico,
                    tratamiento
                })
            };

            const info = await transporter.sendMail(mailOptions);
            
            console.log(`✅ Notificación de diagnóstico enviada a: ${email}`);
            console.log(`   Message ID: ${info.messageId}`);
            
            return {
                success: true,
                messageId: info.messageId,
                email: email,
                type: 'diagnosis_notification'
            };
        } catch (error) {
            console.error('❌ Error al enviar notificación de diagnóstico:', error.message);
            throw new Error(`Error al enviar notificación: ${error.message}`);
        }
    }

    /**
     * Envía múltiples correos en lote
     * @param {Array} emailList - Lista de correos a enviar
     * @returns {Promise<Object>} Resultado del envío en lote
     */
    async sendBatchEmails(emailList) {
        const results = {
            successful: [],
            failed: []
        };

        for (const emailData of emailList) {
            try {
                let result;
                switch (emailData.type) {
                    case 'appointment_confirmation':
                        result = await this.sendAppointmentConfirmation(emailData);
                        break;
                    case 'appointment_reminder':
                        result = await this.sendAppointmentReminder(emailData);
                        break;
                    case 'diagnosis_notification':
                        result = await this.sendDiagnosisNotification(emailData);
                        break;
                    default:
                        throw new Error(`Tipo de correo no válido: ${emailData.type}`);
                }
                results.successful.push(result);
            } catch (error) {
                results.failed.push({
                    email: emailData.email,
                    error: error.message
                });
            }
        }

        return results;
    }
}

module.exports = new EmailService();
