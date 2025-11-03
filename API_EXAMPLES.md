# 📡 Ejemplos de API - Microservicio de Notificaciones

## 🌐 Base URL

```
http://localhost:3000
```

---

## 📋 Endpoints Disponibles

### 1. Health Check

Verifica que el servicio esté funcionando.

**Endpoint:** `GET /api/emails/health`

**Ejemplo cURL:**
```bash
curl http://localhost:3000/api/emails/health
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Servicio de correos funcionando correctamente",
  "timestamp": "2024-11-14T10:30:00.000Z",
  "timezone": "America/La_Paz (GMT-4)"
}
```

---

### 2. Enviar Confirmación de Cita

Envía un correo de confirmación cuando un paciente agenda una cita.

**Endpoint:** `POST /api/emails/appointment-confirmation`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "paciente@example.com",
  "nombrePaciente": "María González",
  "fecha": "20 de Noviembre de 2024",
  "hora": "14:30",
  "nombreMedico": "Dr. Carlos Rodríguez",
  "especialidad": "Cardiología",
  "nombreUsuario": "María González"
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:3000/api/emails/appointment-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "email": "paciente@example.com",
    "nombrePaciente": "María González",
    "fecha": "20 de Noviembre de 2024",
    "hora": "14:30",
    "nombreMedico": "Dr. Carlos Rodríguez",
    "especialidad": "Cardiología",
    "nombreUsuario": "María González"
  }'
```

**Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "Correo de confirmación enviado exitosamente",
  "data": {
    "success": true,
    "messageId": "<abc123@gmail.com>",
    "email": "paciente@example.com",
    "type": "appointment_confirmation"
  }
}
```

**Respuesta de Error:**
```json
{
  "success": false,
  "message": "Faltan campos requeridos",
  "required": [
    "email",
    "nombrePaciente",
    "fecha",
    "hora",
    "nombreMedico",
    "especialidad"
  ]
}
```

---

### 3. Enviar Recordatorio de Cita

Envía un recordatorio 24 horas antes de la cita.

**Endpoint:** `POST /api/emails/appointment-reminder`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "paciente@example.com",
  "nombrePaciente": "Pedro Sánchez",
  "fecha": "21 de Noviembre de 2024",
  "hora": "09:00",
  "nombreMedico": "Dra. Ana Martínez",
  "especialidad": "Pediatría"
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:3000/api/emails/appointment-reminder \
  -H "Content-Type: application/json" \
  -d '{
    "email": "paciente@example.com",
    "nombrePaciente": "Pedro Sánchez",
    "fecha": "21 de Noviembre de 2024",
    "hora": "09:00",
    "nombreMedico": "Dra. Ana Martínez",
    "especialidad": "Pediatría"
  }'
```

**Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "Recordatorio enviado exitosamente",
  "data": {
    "success": true,
    "messageId": "<def456@gmail.com>",
    "email": "paciente@example.com",
    "type": "appointment_reminder"
  }
}
```

---

### 4. Enviar Notificación de Diagnóstico

Envía una notificación cuando el médico registra un diagnóstico.

**Endpoint:** `POST /api/emails/diagnosis-notification`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "paciente@example.com",
  "nombrePaciente": "Luis Fernández",
  "nombreMedico": "Dr. Roberto López",
  "especialidad": "Medicina General",
  "fecha": "14 de Noviembre de 2024",
  "diagnostico": "Gripe estacional con síntomas leves. Se recomienda reposo y abundantes líquidos.",
  "tratamiento": "Paracetamol 500mg cada 8 horas por 5 días. Descanso en casa por 3 días."
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:3000/api/emails/diagnosis-notification \
  -H "Content-Type: application/json" \
  -d '{
    "email": "paciente@example.com",
    "nombrePaciente": "Luis Fernández",
    "nombreMedico": "Dr. Roberto López",
    "especialidad": "Medicina General",
    "fecha": "14 de Noviembre de 2024",
    "diagnostico": "Gripe estacional con síntomas leves.",
    "tratamiento": "Paracetamol 500mg cada 8 horas por 5 días."
  }'
```

**Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "Notificación de diagnóstico enviada exitosamente",
  "data": {
    "success": true,
    "messageId": "<ghi789@gmail.com>",
    "email": "paciente@example.com",
    "type": "diagnosis_notification"
  }
}
```

---

### 5. Envío en Lote

Envía múltiples correos en una sola petición.

**Endpoint:** `POST /api/emails/batch`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "emails": [
    {
      "type": "appointment_confirmation",
      "email": "paciente1@example.com",
      "nombrePaciente": "Juan Pérez",
      "fecha": "20 de Noviembre de 2024",
      "hora": "10:00",
      "nombreMedico": "Dr. García",
      "especialidad": "Cardiología",
      "nombreUsuario": "Juan Pérez"
    },
    {
      "type": "diagnosis_notification",
      "email": "paciente2@example.com",
      "nombrePaciente": "María López",
      "nombreMedico": "Dra. Martínez",
      "especialidad": "Pediatría",
      "fecha": "14 de Noviembre de 2024",
      "diagnostico": "Resfriado común",
      "tratamiento": "Reposo y líquidos"
    }
  ]
}
```

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:3000/api/emails/batch \
  -H "Content-Type: application/json" \
  -d '{
    "emails": [
      {
        "type": "appointment_confirmation",
        "email": "paciente1@example.com",
        "nombrePaciente": "Juan Pérez",
        "fecha": "20 de Noviembre de 2024",
        "hora": "10:00",
        "nombreMedico": "Dr. García",
        "especialidad": "Cardiología",
        "nombreUsuario": "Juan Pérez"
      }
    ]
  }'
```

**Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "Proceso de envío en lote completado",
  "data": {
    "total": 2,
    "successful": 2,
    "failed": 0,
    "details": {
      "successful": [
        {
          "success": true,
          "messageId": "<abc123@gmail.com>",
          "email": "paciente1@example.com",
          "type": "appointment_confirmation"
        },
        {
          "success": true,
          "messageId": "<def456@gmail.com>",
          "email": "paciente2@example.com",
          "type": "diagnosis_notification"
        }
      ],
      "failed": []
    }
  }
}
```

---

## 🔄 Scheduler Endpoints

### 6. Estado del Scheduler

Obtiene información sobre los jobs programados.

**Endpoint:** `GET /api/scheduler/status`

**Ejemplo cURL:**
```bash
curl http://localhost:3000/api/scheduler/status
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Scheduler activo",
  "jobs": [
    {
      "name": "appointment_reminder",
      "schedule": "9:00 AM diario",
      "timezone": "America/La_Paz (GMT-4)",
      "description": "Envía recordatorios 24 horas antes de las citas"
    }
  ],
  "timestamp": "2024-11-14T10:30:00.000Z"
}
```

---

### 7. Ejecutar Recordatorios Manualmente

Ejecuta el job de recordatorios sin esperar al cron.

**Endpoint:** `POST /api/scheduler/execute-reminders`

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:3000/api/scheduler/execute-reminders
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Job de recordatorios ejecutado manualmente",
  "timestamp": "2024-11-14T10:30:00.000Z"
}
```

---

## 📦 Colección de Postman

### Importar en Postman

1. Abre Postman
2. Click en "Import"
3. Copia y pega el siguiente JSON:

```json
{
  "info": {
    "name": "Microservicio Email Notifications",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/emails/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "emails", "health"]
        }
      }
    },
    {
      "name": "Appointment Confirmation",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"paciente@example.com\",\n  \"nombrePaciente\": \"María González\",\n  \"fecha\": \"20 de Noviembre de 2024\",\n  \"hora\": \"14:30\",\n  \"nombreMedico\": \"Dr. Carlos Rodríguez\",\n  \"especialidad\": \"Cardiología\",\n  \"nombreUsuario\": \"María González\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/emails/appointment-confirmation",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "emails", "appointment-confirmation"]
        }
      }
    },
    {
      "name": "Diagnosis Notification",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"paciente@example.com\",\n  \"nombrePaciente\": \"Luis Fernández\",\n  \"nombreMedico\": \"Dr. Roberto López\",\n  \"especialidad\": \"Medicina General\",\n  \"fecha\": \"14 de Noviembre de 2024\",\n  \"diagnostico\": \"Gripe estacional con síntomas leves.\",\n  \"tratamiento\": \"Paracetamol 500mg cada 8 horas por 5 días.\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/emails/diagnosis-notification",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "emails", "diagnosis-notification"]
        }
      }
    },
    {
      "name": "Execute Reminders",
      "request": {
        "method": "POST",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/scheduler/execute-reminders",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "scheduler", "execute-reminders"]
        }
      }
    }
  ]
}
```

---

## 🧪 Ejemplos con JavaScript (Fetch API)

### Desde el Frontend

```javascript
// Enviar confirmación de cita
async function sendAppointmentConfirmation(appointmentData) {
  try {
    const response = await fetch('http://localhost:3000/api/emails/appointment-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData)
    });
    
    const result = await response.json();
    console.log('Email enviado:', result);
    return result;
  } catch (error) {
    console.error('Error al enviar email:', error);
  }
}

// Uso
sendAppointmentConfirmation({
  email: 'paciente@example.com',
  nombrePaciente: 'Juan Pérez',
  fecha: '20 de Noviembre de 2024',
  hora: '10:00',
  nombreMedico: 'Dr. García',
  especialidad: 'Cardiología',
  nombreUsuario: 'Juan Pérez'
});
```

---

## 📝 Notas

- Todos los endpoints aceptan y devuelven JSON
- Los errores incluyen mensajes descriptivos
- El servicio no bloquea si hay errores (fail-safe)
- Los emails se envían de forma asíncrona
- Zona horaria: GMT-4 (Bolivia)

---

**¿Necesitas ayuda?** Consulta `README.md` o `GUIA_INTEGRACION.md`
