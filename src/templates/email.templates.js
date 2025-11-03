/**
 * Plantillas HTML para los correos electrónicos
 */

/**
 * Plantilla para confirmación de cita
 */
const appointmentConfirmationTemplate = (data) => {
    const { nombrePaciente, fecha, hora, nombreMedico, especialidad, nombreUsuario } = data;
    
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
            }
            .content {
                padding: 30px;
                color: #333;
            }
            .info-box {
                background-color: #f8f9fa;
                border-left: 4px solid #667eea;
                padding: 20px;
                margin: 20px 0;
                border-radius: 5px;
            }
            .info-row {
                display: flex;
                margin: 10px 0;
            }
            .info-label {
                font-weight: bold;
                color: #667eea;
                min-width: 140px;
            }
            .info-value {
                color: #555;
            }
            .highlight {
                background-color: #fff3cd;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                border-left: 4px solid #ffc107;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 14px;
            }
            .button {
                display: inline-block;
                padding: 12px 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✅ Cita Confirmada</h1>
            </div>
            <div class="content">
                <p>Estimado/a <strong>${nombrePaciente}</strong>,</p>
                <p>Su cita médica ha sido agendada exitosamente en nuestro sistema.</p>
                
                <div class="info-box">
                    <h3 style="margin-top: 0; color: #667eea;">📋 Detalles de la Cita</h3>
                    <div class="info-row">
                        <span class="info-label">📅 Fecha:</span>
                        <span class="info-value">${fecha}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">🕐 Hora:</span>
                        <span class="info-value">${hora}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">👨‍⚕️ Médico:</span>
                        <span class="info-value">${nombreMedico}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">🏥 Especialidad:</span>
                        <span class="info-value">${especialidad}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">👤 Paciente:</span>
                        <span class="info-value">${nombreUsuario}</span>
                    </div>
                </div>

                <div class="highlight">
                    <strong>⏰ Recordatorio:</strong> Recibirá un correo de recordatorio 24 horas antes de su cita.
                </div>

                <p><strong>Recomendaciones:</strong></p>
                <ul>
                    <li>Llegue 15 minutos antes de su cita</li>
                    <li>Traiga su documento de identidad</li>
                    <li>Si tiene exámenes previos, tráigalos consigo</li>
                </ul>
            </div>
            <div class="footer">
                <p>Sistema de Historial Clínico</p>
                <p>Este es un correo automático, por favor no responder.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

/**
 * Plantilla para recordatorio de cita
 */
const appointmentReminderTemplate = (data) => {
    const { nombrePaciente, fecha, hora, nombreMedico, especialidad } = data;
    
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
            }
            .content {
                padding: 30px;
                color: #333;
            }
            .alert-box {
                background-color: #fff3cd;
                border: 2px solid #ffc107;
                padding: 20px;
                margin: 20px 0;
                border-radius: 5px;
                text-align: center;
            }
            .alert-box h2 {
                color: #856404;
                margin: 0 0 10px 0;
            }
            .info-box {
                background-color: #f8f9fa;
                border-left: 4px solid #f5576c;
                padding: 20px;
                margin: 20px 0;
                border-radius: 5px;
            }
            .info-row {
                display: flex;
                margin: 10px 0;
            }
            .info-label {
                font-weight: bold;
                color: #f5576c;
                min-width: 140px;
            }
            .info-value {
                color: #555;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>⏰ Recordatorio de Cita</h1>
            </div>
            <div class="content">
                <p>Estimado/a <strong>${nombrePaciente}</strong>,</p>
                
                <div class="alert-box">
                    <h2>🔔 ¡Su cita es mañana!</h2>
                    <p style="margin: 0; font-size: 16px;">Le recordamos que tiene una cita médica programada</p>
                </div>
                
                <div class="info-box">
                    <h3 style="margin-top: 0; color: #f5576c;">📋 Detalles de la Cita</h3>
                    <div class="info-row">
                        <span class="info-label">📅 Fecha:</span>
                        <span class="info-value">${fecha}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">🕐 Hora:</span>
                        <span class="info-value">${hora}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">👨‍⚕️ Médico:</span>
                        <span class="info-value">${nombreMedico}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">🏥 Especialidad:</span>
                        <span class="info-value">${especialidad}</span>
                    </div>
                </div>

                <p><strong>Recordatorios importantes:</strong></p>
                <ul>
                    <li>✓ Llegue 15 minutos antes de su cita</li>
                    <li>✓ Traiga su documento de identidad</li>
                    <li>✓ Si tiene exámenes previos, tráigalos consigo</li>
                    <li>✓ En caso de no poder asistir, comuníquese con anticipación</li>
                </ul>
            </div>
            <div class="footer">
                <p>Sistema de Historial Clínico</p>
                <p>Este es un correo automático, por favor no responder.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

/**
 * Plantilla para notificación de diagnóstico
 */
const diagnosisNotificationTemplate = (data) => {
    const { nombrePaciente, nombreMedico, especialidad, fecha, diagnostico, tratamiento } = data;
    
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                color: white;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
            }
            .content {
                padding: 30px;
                color: #333;
            }
            .info-box {
                background-color: #f8f9fa;
                border-left: 4px solid #4facfe;
                padding: 20px;
                margin: 20px 0;
                border-radius: 5px;
            }
            .info-row {
                display: flex;
                margin: 10px 0;
            }
            .info-label {
                font-weight: bold;
                color: #4facfe;
                min-width: 140px;
            }
            .info-value {
                color: #555;
            }
            .diagnosis-box {
                background-color: #e7f3ff;
                padding: 20px;
                margin: 20px 0;
                border-radius: 5px;
                border: 1px solid #4facfe;
            }
            .treatment-box {
                background-color: #d4edda;
                padding: 20px;
                margin: 20px 0;
                border-radius: 5px;
                border: 1px solid #28a745;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 14px;
            }
            .warning {
                background-color: #fff3cd;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                border-left: 4px solid #ffc107;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📋 Diagnóstico Médico</h1>
            </div>
            <div class="content">
                <p>Estimado/a <strong>${nombrePaciente}</strong>,</p>
                <p>Su médico ha registrado un diagnóstico en su historial clínico.</p>
                
                <div class="info-box">
                    <h3 style="margin-top: 0; color: #4facfe;">ℹ️ Información General</h3>
                    <div class="info-row">
                        <span class="info-label">👨‍⚕️ Médico:</span>
                        <span class="info-value">${nombreMedico}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">🏥 Especialidad:</span>
                        <span class="info-value">${especialidad}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">📅 Fecha:</span>
                        <span class="info-value">${fecha}</span>
                    </div>
                </div>

                <div class="diagnosis-box">
                    <h3 style="margin-top: 0; color: #0056b3;">🔍 Diagnóstico</h3>
                    <p style="margin: 0; line-height: 1.6;">${diagnostico}</p>
                </div>

                ${tratamiento ? `
                <div class="treatment-box">
                    <h3 style="margin-top: 0; color: #155724;">💊 Tratamiento Indicado</h3>
                    <p style="margin: 0; line-height: 1.6;">${tratamiento}</p>
                </div>
                ` : ''}

                <div class="warning">
                    <strong>⚠️ Importante:</strong> Este diagnóstico es confidencial. Siga las indicaciones de su médico y asista a sus controles programados.
                </div>

                <p><strong>Recomendaciones:</strong></p>
                <ul>
                    <li>Siga el tratamiento según las indicaciones médicas</li>
                    <li>No se automedique</li>
                    <li>Consulte con su médico ante cualquier duda</li>
                    <li>Asista a sus controles programados</li>
                </ul>
            </div>
            <div class="footer">
                <p>Sistema de Historial Clínico</p>
                <p>Este es un correo automático, por favor no responder.</p>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">
                    La información contenida en este correo es confidencial y está protegida por la ley.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = {
    appointmentConfirmationTemplate,
    appointmentReminderTemplate,
    diagnosisNotificationTemplate
};
