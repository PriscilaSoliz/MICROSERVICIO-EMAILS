const nodemailer = require('nodemailer');

/**
 * Configuración del transportador de correo electrónico
 * Utiliza Gmail SMTP para el envío de correos
 */
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER || 'v63094299@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'ytrqtwkjwtqpqfvd'
    },
    tls: {
        rejectUnauthorized: false
    }
});

/**
 * Verifica la conexión con el servidor SMTP
 */
const verifyConnection = async () => {
    try {
        await transporter.verify();
        console.log('✅ Servidor de correo conectado correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error al conectar con el servidor de correo:', error.message);
        return false;
    }
};

module.exports = {
    transporter,
    verifyConnection
};
