/**
 * Middleware para manejo centralizado de errores
 */

const errorHandler = (err, req, res, next) => {
    console.error('❌ Error capturado:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(statusCode).json({
        success: false,
        message: message,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        timestamp: new Date().toISOString()
    });
};

/**
 * Middleware para rutas no encontradas
 */
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Ruta no encontrada: ${req.method} ${req.url}`,
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    errorHandler,
    notFoundHandler
};
