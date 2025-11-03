# 📧 Microservicio de Notificaciones por Email

Microservicio Node.js para el envío de notificaciones por correo electrónico del Sistema de Historial Clínico.

## 🚀 Características

- ✅ Envío de confirmación de citas médicas
- ⏰ Recordatorios automáticos 24 horas antes de las citas (9:00 AM GMT-4)
- 📋 Notificaciones de diagnósticos y tratamientos
- 🎨 Plantillas HTML profesionales y responsivas
- 📊 Integración con base de datos PostgreSQL
- 🔄 Sistema de cron jobs para tareas programadas
- 🛡️ Manejo robusto de errores

## 📁 Estructura del Proyecto

```
MICROSERVICIO-GMAILS/
├── src/
│   ├── config/           # Configuraciones
│   │   ├── app.config.js
│   │   └── email.config.js
│   ├── controllers/      # Controladores
│   │   ├── email.controller.js
│   │   └── scheduler.controller.js
│   ├── services/         # Lógica de negocio
│   │   ├── email.service.js
│   │   ├── database.service.js
│   │   └── scheduler.service.js
│   ├── routes/           # Rutas de la API
│   │   ├── email.routes.js
│   │   └── scheduler.routes.js
│   ├── middleware/       # Middlewares
│   │   ├── error.middleware.js
│   │   └── logger.middleware.js
│   ├── templates/        # Plantillas de email
│   │   └── email.templates.js
│   ├── utils/            # Utilidades
│   │   ├── validators.js
│   │   └── date.utils.js
│   └── app.js            # Configuración de Express
├── server.js             # Punto de entrada
├── package.json
├── .env.example
└── README.md
```

## 🔧 Instalación

1. **Clonar o navegar al directorio del microservicio**

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
copy .env.example .env

# Editar .env con tus credenciales
```

4. **Configurar credenciales de Gmail**
   - Habilitar autenticación de dos factores en tu cuenta de Gmail
   - Generar una contraseña de aplicación
   - Actualizar `EMAIL_USER` y `EMAIL_PASSWORD` en `.env`

## 🚀 Uso

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## 📡 API Endpoints

### Emails

#### Health Check
```http
GET /api/emails/health
```

#### Enviar Confirmación de Cita
```http
POST /api/emails/appointment-confirmation
Content-Type: application/json

{
  "email": "paciente@email.com",
  "nombrePaciente": "Juan Pérez",
  "fecha": "15 de Noviembre de 2024",
  "hora": "10:00 AM",
  "nombreMedico": "Dr. García",
  "especialidad": "Cardiología",
  "nombreUsuario": "Juan Pérez"
}
```

#### Enviar Recordatorio de Cita
```http
POST /api/emails/appointment-reminder
Content-Type: application/json

{
  "email": "paciente@email.com",
  "nombrePaciente": "Juan Pérez",
  "fecha": "15 de Noviembre de 2024",
  "hora": "10:00 AM",
  "nombreMedico": "Dr. García",
  "especialidad": "Cardiología"
}
```

#### Enviar Notificación de Diagnóstico
```http
POST /api/emails/diagnosis-notification
Content-Type: application/json

{
  "email": "paciente@email.com",
  "nombrePaciente": "Juan Pérez",
  "nombreMedico": "Dr. García",
  "especialidad": "Cardiología",
  "fecha": "14 de Noviembre de 2024",
  "diagnostico": "Descripción del diagnóstico",
  "tratamiento": "Descripción del tratamiento"
}
```

#### Envío en Lote
```http
POST /api/emails/batch
Content-Type: application/json

{
  "emails": [
    {
      "type": "appointment_confirmation",
      "email": "paciente1@email.com",
      ...
    },
    {
      "type": "diagnosis_notification",
      "email": "paciente2@email.com",
      ...
    }
  ]
}
```

### Scheduler

#### Estado del Scheduler
```http
GET /api/scheduler/status
```

#### Ejecutar Recordatorios Manualmente
```http
POST /api/scheduler/execute-reminders
```

## ⏰ Tareas Programadas

- **Recordatorios de Citas**: Se ejecutan diariamente a las 9:00 AM (GMT-4, hora de Bolivia)
- Envía recordatorios automáticos 24 horas antes de cada cita
- Consulta la base de datos para obtener las citas del día siguiente

## 🔗 Integración con Spring Boot

El backend de Spring Boot debe llamar a este microservicio usando HTTP:

```java
// Ejemplo de integración
RestTemplate restTemplate = new RestTemplate();
String url = "http://localhost:3000/api/emails/appointment-confirmation";

Map<String, Object> request = new HashMap<>();
request.put("email", usuario.getEmail());
request.put("nombrePaciente", usuario.getUsername());
// ... más campos

restTemplate.postForObject(url, request, String.class);
```

## 🗄️ Base de Datos

El microservicio se conecta a la misma base de datos PostgreSQL que el backend principal para:
- Consultar citas programadas
- Obtener información de pacientes y médicos
- Ejecutar tareas de recordatorios

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **Nodemailer** - Envío de correos
- **node-cron** - Tareas programadas
- **PostgreSQL** - Base de datos
- **pg** - Cliente de PostgreSQL

## 📝 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| PORT | Puerto del servidor | 3000 |
| EMAIL_USER | Usuario de Gmail | - |
| EMAIL_PASSWORD | Contraseña de aplicación | - |
| DB_HOST | Host de PostgreSQL | localhost |
| DB_PORT | Puerto de PostgreSQL | 5433 |
| DB_NAME | Nombre de la BD | historialclinico |
| DB_USER | Usuario de la BD | postgres |
| DB_PASSWORD | Contraseña de la BD | password |

## 🔒 Seguridad

- Las credenciales se manejan mediante variables de entorno
- No se exponen contraseñas en el código
- Validación de datos de entrada
- Manejo seguro de errores

## 📧 Configuración de Gmail

Para usar Gmail como servidor SMTP:

1. Ir a la configuración de tu cuenta de Google
2. Habilitar verificación en dos pasos
3. Generar una contraseña de aplicación
4. Usar esa contraseña en `EMAIL_PASSWORD`

## 🐛 Troubleshooting

### Error de conexión SMTP
- Verificar credenciales de Gmail
- Asegurar que la autenticación en dos pasos esté habilitada
- Usar contraseña de aplicación, no la contraseña normal

### Error de conexión a base de datos
- Verificar que PostgreSQL esté corriendo
- Confirmar puerto y credenciales
- Verificar que la base de datos exista

## 📄 Licencia

ISC

## 👥 Autor

Sistema de Historial Clínico - Software 2
