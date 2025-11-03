require('dotenv').config();
const { app, initializeServices } = require('./src/app');
const config = require('./src/config/app.config');

const PORT = config.port;

/**
 * Inicia el servidor
 */
const startServer = async () => {
    try {
        // Inicializar servicios
        await initializeServices();
        
        // Iniciar servidor HTTP
        app.listen(PORT, () => {
            console.log('═══════════════════════════════════════════════════════');
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`📧 Microservicio de Notificaciones por Email`);
            console.log(`🌍 Zona horaria: ${config.timezone} (GMT-4)`);
            console.log(`⏰ Recordatorios programados: 9:00 AM diario`);
            console.log('═══════════════════════════════════════════════════════\n');
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

// Manejo de cierre graceful
process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando servidor...');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Cerrando servidor...');
    process.exit(0);
});

// Iniciar servidor
startServer();
