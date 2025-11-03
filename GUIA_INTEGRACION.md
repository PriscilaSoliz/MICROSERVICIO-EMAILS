# 📘 Guía de Integración - Microservicio de Notificaciones por Email

## 📋 Resumen

Este documento explica cómo está integrado el microservicio de notificaciones por email con el backend de Spring Boot del Sistema de Historial Clínico.

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Angular)                        │
└────────────────────────┬────────────────────────────────────┘
                         │ GraphQL
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           Backend Spring Boot (Puerto 8080)                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  CitaService / DiagnosticoService                     │  │
│  │         │                                              │  │
│  │         ├─► EmailNotificationService (HTTP Client)    │  │
│  └─────────┼──────────────────────────────────────────────┘  │
└────────────┼─────────────────────────────────────────────────┘
             │ HTTP POST
             ▼
┌─────────────────────────────────────────────────────────────┐
│      Microservicio Node.js (Puerto 3000)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Email Controllers                                    │  │
│  │         │                                              │  │
│  │         ├─► Email Service (Nodemailer)                │  │
│  │         │                                              │  │
│  │         ├─► Database Service (PostgreSQL)             │  │
│  │         │                                              │  │
│  │         └─► Scheduler Service (node-cron)             │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│              Gmail SMTP Server                               │
│              (Envío de correos)                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Flujo de Notificaciones

### 1. Confirmación de Cita

**Trigger:** Cuando un paciente agenda una cita

**Flujo:**
1. Frontend envía mutation GraphQL `crearCita`
2. `CitaResolver` recibe la petición
3. `CitaService.crearCita()` guarda la cita en la base de datos
4. `CitaService` llama a `EmailNotificationService.sendAppointmentConfirmation()`
5. `EmailNotificationService` hace HTTP POST a `http://localhost:3000/api/emails/appointment-confirmation`
6. Microservicio recibe la petición en `EmailController`
7. `EmailService` genera el HTML del correo usando la plantilla
8. Nodemailer envía el correo a través de Gmail SMTP
9. Paciente recibe correo de confirmación

**Datos enviados:**
```json
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

### 2. Recordatorio de Cita (Automático)

**Trigger:** Cron job diario a las 9:00 AM (GMT-4)

**Flujo:**
1. `SchedulerService` ejecuta job programado
2. `DatabaseService` consulta citas del día siguiente
3. Para cada cita encontrada:
   - `EmailService` genera correo de recordatorio
   - Nodemailer envía el correo
4. Paciente recibe recordatorio 24 horas antes

**Query SQL ejecutada:**
```sql
SELECT 
    c.id as cita_id,
    u.email as paciente_email,
    u.username as paciente_nombre,
    h.fecha as fecha_cita,
    c.horario as hora_cita,
    m.username as medico_nombre,
    e.nombre as especialidad_nombre
FROM cita c
INNER JOIN usuarios u ON c.usuario_id = u.id
INNER JOIN usuarios m ON c.medico_id = m.id
INNER JOIN especialidades e ON c.especialidad_id = e.id
INNER JOIN horarios h ON c.horario_id = h.id
WHERE h.fecha = CURRENT_DATE + INTERVAL '1 day'
AND h.disponibilidad = false;
```

### 3. Notificación de Diagnóstico

**Trigger:** Cuando un médico registra un diagnóstico

**Flujo:**
1. Frontend envía mutation GraphQL `crearDiagnostico`
2. `DiagnosticoResolver` recibe la petición
3. `DiagnosticoService.crearDiagnostico()` guarda el diagnóstico
4. `DiagnosticoService` llama a `EmailNotificationService.sendDiagnosisNotification()`
5. `EmailNotificationService` hace HTTP POST a `http://localhost:3000/api/emails/diagnosis-notification`
6. Microservicio procesa y envía el correo
7. Paciente recibe notificación con su diagnóstico y tratamiento

**Datos enviados:**
```json
{
  "email": "paciente@email.com",
  "nombrePaciente": "Juan Pérez",
  "nombreMedico": "Dr. García",
  "especialidad": "Cardiología",
  "fecha": "14 de Noviembre de 2024",
  "diagnostico": "Hipertensión arterial leve",
  "tratamiento": "Enalapril 10mg cada 12 horas"
}
```

## 📁 Archivos Modificados en Spring Boot

### 1. Nuevos Archivos Creados

#### `EmailNotificationDTO.java`
- **Ubicación:** `src/main/java/com/HistorialClinico/Backend/dto/`
- **Propósito:** DTO para transferir datos de notificaciones al microservicio
- **Métodos principales:**
  - `forAppointmentConfirmation()` - Factory method para confirmación de citas
  - `forDiagnosisNotification()` - Factory method para notificaciones de diagnóstico

#### `EmailNotificationService.java`
- **Ubicación:** `src/main/java/com/HistorialClinico/Backend/service/`
- **Propósito:** Cliente HTTP para comunicarse con el microservicio
- **Métodos principales:**
  - `sendAppointmentConfirmation()` - Envía confirmación de cita
  - `sendDiagnosisNotification()` - Envía notificación de diagnóstico
  - `isServiceAvailable()` - Verifica disponibilidad del microservicio

### 2. Archivos Modificados

#### `CitaService.java`
**Cambios:**
- Inyección de `EmailNotificationService`
- Método `enviarNotificacionCita()` agregado
- Llamada a notificación después de guardar cita

```java
// Guardar la cita
Cita citaGuardada = citaRepository.save(cita);

// Enviar notificación por email al paciente
enviarNotificacionCita(citaGuardada, usuario, medico, especialidad, horario);

return citaGuardada;
```

#### `DiagnosticoService.java`
**Cambios:**
- Inyección de `EmailNotificationService`
- Método `enviarNotificacionDiagnostico()` agregado
- Llamada a notificación después de guardar diagnóstico

```java
// Guardar el diagnóstico
Diagnostico diagnosticoGuardado = diagnosticoRepository.save(diagnostico);

// Enviar notificación por email al paciente
enviarNotificacionDiagnostico(diagnosticoGuardado, paciente, medico, especialidad);

return diagnosticoGuardado;
```

#### `application.properties`
**Cambios:**
- Configuración de URL del microservicio

```properties
# Configuracion del microservicio de notificaciones por email
email.microservice.url=http://localhost:3000
```

## 🚀 Pasos para Ejecutar el Sistema Completo

### 1. Iniciar PostgreSQL
```bash
# Asegurarse de que PostgreSQL esté corriendo en el puerto 5433
# Base de datos: historialclinico
```

### 2. Iniciar el Microservicio de Email

```bash
cd MICROSERVICIO-GMAILS

# Instalar dependencias (solo la primera vez)
npm install

# Crear archivo .env
copy .env.example .env

# Editar .env con tus credenciales

# Iniciar en modo desarrollo
npm run dev

# O en modo producción
npm start
```

**Verificar que está corriendo:**
```bash
# Debería mostrar el mensaje de bienvenida
curl http://localhost:3000

# Verificar health check
curl http://localhost:3000/api/emails/health
```

### 3. Iniciar el Backend de Spring Boot

```bash
cd Backend-HistorialClinico-Sofware2

# Compilar y ejecutar
mvn spring-boot:run

# O desde tu IDE (IntelliJ IDEA, Eclipse, etc.)
```

**Verificar que está corriendo:**
- Backend: http://localhost:8080
- GraphQL: http://localhost:8080/graphql

### 4. Iniciar el Frontend (Angular)

```bash
cd frontend-historial-clinico

npm install
ng serve

# Frontend: http://localhost:4200
```

## 🧪 Pruebas

### Probar Confirmación de Cita

**GraphQL Mutation:**
```graphql
mutation {
  crearCita(input: {
    usuarioId: 1
    medicoId: 2
    especialidadId: 1
    turnoId: 1
    diaId: 1
    horarioId: 1
    nombreUsuarioLogeado: "Juan Pérez"
  }) {
    id
    horario
    fecha
  }
}
```

**Resultado esperado:**
- Cita creada en la base de datos
- Correo de confirmación enviado al email del paciente
- Log en consola del microservicio: "✅ Correo de confirmación enviado a: ..."

### Probar Notificación de Diagnóstico

**GraphQL Mutation:**
```graphql
mutation {
  crearDiagnostico(input: {
    pacienteId: 1
    medicoId: 2
    especialidadId: 1
    descripcion: "Hipertensión arterial leve"
    tratamiento: "Enalapril 10mg cada 12 horas"
  }) {
    id
    descripcion
    tratamiento
  }
}
```

**Resultado esperado:**
- Diagnóstico creado en la base de datos
- Correo de notificación enviado al email del paciente
- Log en consola del microservicio: "✅ Notificación de diagnóstico enviada a: ..."

### Probar Recordatorios Automáticos

**Opción 1: Esperar al cron job (9:00 AM)**

**Opción 2: Ejecutar manualmente**
```bash
# POST request al endpoint de ejecución manual
curl -X POST http://localhost:3000/api/scheduler/execute-reminders
```

**Resultado esperado:**
- Consulta a la base de datos por citas del día siguiente
- Envío de recordatorios a todos los pacientes con citas
- Log en consola: "✅ Recordatorios enviados: X/Y"

## 🔧 Configuración de Gmail

Para que el microservicio pueda enviar correos:

1. **Habilitar verificación en dos pasos:**
   - Ir a https://myaccount.google.com/security
   - Activar "Verificación en dos pasos"

2. **Generar contraseña de aplicación:**
   - Ir a https://myaccount.google.com/apppasswords
   - Seleccionar "Correo" y "Otro dispositivo"
   - Copiar la contraseña generada (16 caracteres)

3. **Configurar en .env:**
   ```env
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

## 📊 Monitoreo y Logs

### Logs del Microservicio (Node.js)

```
✅ Servidor de correo conectado correctamente
✅ Conexión a la base de datos exitosa
✅ Job de recordatorios iniciado (9:00 AM diario, GMT-4)
═══════════════════════════════════════════════════════
🚀 Servidor corriendo en http://localhost:3000
📧 Microservicio de Notificaciones por Email
🌍 Zona horaria: America/La_Paz (GMT-4)
⏰ Recordatorios programados: 9:00 AM diario
═══════════════════════════════════════════════════════

200 POST /api/emails/appointment-confirmation - 1234ms
✅ Correo de confirmación enviado a: paciente@email.com
   Message ID: <abc123@gmail.com>
```

### Logs del Backend (Spring Boot)

```
✅ Correo de confirmación enviado exitosamente a: paciente@email.com
✅ Notificación de diagnóstico enviada exitosamente a: paciente@email.com
```

### En caso de error:

```
❌ Error al enviar correo de confirmación a paciente@email.com: Connection refused
⚠️ Microservicio de email no disponible: Connection refused
```

## 🛠️ Solución de Problemas

### Error: "Connection refused" al enviar emails

**Causa:** El microservicio no está corriendo

**Solución:**
```bash
cd MICROSERVICIO-GMAILS
npm run dev
```

### Error: "Invalid login" en Gmail

**Causa:** Credenciales incorrectas o no se usa contraseña de aplicación

**Solución:**
1. Verificar que la verificación en dos pasos esté habilitada
2. Generar nueva contraseña de aplicación
3. Actualizar `.env` con la nueva contraseña

### No se envían recordatorios automáticos

**Causa:** No hay citas para el día siguiente o el cron job no está activo

**Solución:**
1. Verificar que hay citas en la BD para mañana
2. Ejecutar manualmente: `POST /api/scheduler/execute-reminders`
3. Revisar logs del microservicio

### Error de conexión a base de datos en el microservicio

**Causa:** Configuración incorrecta en `.env`

**Solución:**
```env
DB_HOST=localhost
DB_PORT=5433
DB_NAME=historialclinico
DB_USER=postgres
DB_PASSWORD=password
```

## 📝 Notas Importantes

1. **Sin modificación de base de datos:** El sistema usa la base de datos existente sin cambios en el esquema

2. **Comunicación asíncrona:** Los emails se envían de forma asíncrona para no bloquear el flujo principal

3. **Manejo de errores:** Si el microservicio no está disponible, el sistema principal continúa funcionando normalmente

4. **Zona horaria:** Todos los recordatorios usan GMT-4 (hora de Bolivia)

5. **Plantillas HTML:** Los correos usan plantillas HTML responsivas y profesionales

6. **Escalabilidad:** El microservicio puede ser desplegado independientemente y escalado según necesidad

## 🔐 Seguridad

- Las credenciales se manejan mediante variables de entorno
- No se exponen contraseñas en el código
- Validación de datos de entrada
- Manejo seguro de errores sin exponer información sensible

## 📚 Recursos Adicionales

- [Documentación de Nodemailer](https://nodemailer.com/)
- [Documentación de node-cron](https://www.npmjs.com/package/node-cron)
- [Spring RestTemplate](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html)

---

**Desarrollado para:** Sistema de Historial Clínico - Software 2  
**Fecha:** Noviembre 2024
