const cron = require('node-cron');
const databaseService = require('./database.service');
const emailService = require('./email.service');
const { timezone } = require('../config/app.config');

/**
 * Servicio para programar tareas automáticas
 */
class SchedulerService {
    constructor() {
        this.jobs = [];
    }

    /**
     * Inicia el job de recordatorios de citas
     * Se ejecuta todos los días a las 9:00 AM (GMT-4 Bolivia)
     */
    startAppointmentReminderJob() {
        // Cron expression: "0 9 * * *" = Todos los días a las 9:00 AM
        const job = cron.schedule('0 9 * * *', async () => {
            console.log('⏰ Ejecutando job de recordatorios de citas...');
            await this.sendAppointmentReminders();
        }, {
            scheduled: true,
            timezone: timezone
        });

        this.jobs.push({ name: 'appointment_reminder', job });
        console.log('✅ Job de recordatorios iniciado (9:00 AM diario, GMT-4)');
    }

    /**
     * Envía recordatorios para todas las citas del día siguiente
     */
    async sendAppointmentReminders() {
        try {
            const appointments = await databaseService.getAppointmentsForReminder();
            
            if (appointments.length === 0) {
                console.log('ℹ️ No hay citas para recordar hoy');
                return;
            }

            console.log(`📧 Enviando ${appointments.length} recordatorios...`);
            
            const emailPromises = appointments.map(appointment => {
                return emailService.sendAppointmentReminder({
                    email: appointment.paciente_email,
                    nombrePaciente: appointment.paciente_nombre,
                    fecha: this.formatDate(appointment.fecha_cita),
                    hora: appointment.hora_cita,
                    nombreMedico: appointment.medico_nombre,
                    especialidad: appointment.especialidad_nombre
                }).catch(error => {
                    console.error(`❌ Error al enviar recordatorio a ${appointment.paciente_email}:`, error.message);
                    return null;
                });
            });

            const results = await Promise.all(emailPromises);
            const successful = results.filter(r => r !== null).length;
            
            console.log(`✅ Recordatorios enviados: ${successful}/${appointments.length}`);
        } catch (error) {
            console.error('❌ Error en el job de recordatorios:', error.message);
        }
    }

    /**
     * Ejecuta manualmente el envío de recordatorios (para testing)
     */
    async executeReminderJobNow() {
        console.log('🔧 Ejecutando job de recordatorios manualmente...');
        await this.sendAppointmentReminders();
    }

    /**
     * Detiene todos los jobs programados
     */
    stopAllJobs() {
        this.jobs.forEach(({ name, job }) => {
            job.stop();
            console.log(`🛑 Job detenido: ${name}`);
        });
        this.jobs = [];
    }

    /**
     * Formatea una fecha a string legible
     * @param {Date} date 
     * @returns {string}
     */
    formatDate(date) {
        const d = new Date(date);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: timezone
        };
        return d.toLocaleDateString('es-BO', options);
    }
}

module.exports = new SchedulerService();
