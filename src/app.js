const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/logger.middleware');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');
const emailRoutes = require('./routes/email.routes');
const schedulerRoutes = require('./routes/scheduler.routes');
const { verifyConnection } = require('./config/email.config');
const databaseService = require('./services/database.service');
const schedulerService = require('./services/scheduler.service');
const config = require('./config/app.config');

/**
 * Configuración de la aplicación Express
 */
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '📧 Microservicio de Notificaciones por Email',
        version: '1.0.0',
        endpoints: {
            emails: '/api/emails',
            scheduler: '/api/scheduler'
        },
        timezone: config.timezone,
        timestamp: new Date().toISOString()
    });
});

// Rutas de la API
app.use('/api/emails', emailRoutes);
app.use('/api/scheduler', schedulerRoutes);

// Manejo de rutas no encontradas
app.use(notFoundHandler);

// Manejo de errores
app.use(errorHandler);

/**
 * Inicializa las conexiones y servicios
 */
const initializeServices = async () => {
    console.log('\n🚀 Iniciando servicios...\n');
    
    // Verificar conexión de email
    await verifyConnection();
    
    // Verificar conexión a base de datos
    await databaseService.testConnection();
    
    // Iniciar scheduler de recordatorios
    schedulerService.startAppointmentReminderJob();
    
    console.log('\n✅ Todos los servicios iniciados correctamente\n');
};

module.exports = { app, initializeServices };
