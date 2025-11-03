/**
 * Configuración general de la aplicación
 */
module.exports = {
    port: process.env.PORT || 3000,
    timezone: 'America/La_Paz', // GMT-4 (Bolivia)
    reminderHoursBefore: 24, // Horas antes de la cita para enviar recordatorio
    emailFrom: process.env.EMAIL_FROM || 'Sistema Historial Clínico <v63094299@gmail.com>',
    
    // Configuración de la base de datos (para consultas de recordatorios)
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5433,
        database: process.env.DB_NAME || 'historialclinico',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password'
    }
};
