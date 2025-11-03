/**
 * Middleware para logging de peticiones HTTP
 */

const requestLogger = (req, res, next) => {
    const start = Date.now();
    
    // Log cuando la respuesta termina
    res.on('finish', () => {
        const duration = Date.now() - start;
        const statusColor = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
        const resetColor = '\x1b[0m';
        
        console.log(
            `${statusColor}${res.statusCode}${resetColor} ${req.method} ${req.url} - ${duration}ms`
        );
    });
    
    next();
};

module.exports = requestLogger;
