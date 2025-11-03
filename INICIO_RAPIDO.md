# 🚀 Inicio Rápido - Microservicio de Notificaciones

## ⚡ Configuración en 5 Pasos

### 1️⃣ Instalar Dependencias

```bash
cd MICROSERVICIO-GMAILS
npm install
```

### 2️⃣ Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
copy .env.example .env
```

Editar `.env` con tus datos:

```env
# Puerto del servidor
PORT=3000

# Configuración de Gmail
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-contraseña-de-aplicacion
EMAIL_FROM=Sistema Historial Clínico <tu-email@gmail.com>

# Configuración de PostgreSQL (misma que el backend)
DB_HOST=localhost
DB_PORT=5433
DB_NAME=historialclinico
DB_USER=postgres
DB_PASSWORD=password
```

### 3️⃣ Obtener Contraseña de Aplicación de Gmail

1. Ve a https://myaccount.google.com/security
2. Activa "Verificación en dos pasos"
3. Ve a https://myaccount.google.com/apppasswords
4. Genera una contraseña para "Correo" → "Otro dispositivo"
5. Copia la contraseña de 16 caracteres
6. Pégala en `.env` como `EMAIL_PASSWORD`

### 4️⃣ Iniciar el Microservicio

**Modo Desarrollo (con auto-reload):**
```bash
npm run dev
```

**Modo Producción:**
```bash
npm start
```

### 5️⃣ Verificar que Funciona

Abre tu navegador en: http://localhost:3000

Deberías ver:
```json
{
  "success": true,
  "message": "📧 Microservicio de Notificaciones por Email",
  "version": "1.0.0",
  ...
}
```

---

## 🧪 Probar el Microservicio

### Probar Confirmación de Cita

```bash
curl -X POST http://localhost:3000/api/emails/appointment-confirmation \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"tu-email@gmail.com\",
    \"nombrePaciente\": \"Juan Pérez\",
    \"fecha\": \"15 de Noviembre de 2024\",
    \"hora\": \"10:00 AM\",
    \"nombreMedico\": \"Dr. García\",
    \"especialidad\": \"Cardiología\",
    \"nombreUsuario\": \"Juan Pérez\"
  }"
```

### Probar Notificación de Diagnóstico

```bash
curl -X POST http://localhost:3000/api/emails/diagnosis-notification \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"tu-email@gmail.com\",
    \"nombrePaciente\": \"Juan Pérez\",
    \"nombreMedico\": \"Dr. García\",
    \"especialidad\": \"Cardiología\",
    \"fecha\": \"14 de Noviembre de 2024\",
    \"diagnostico\": \"Hipertensión arterial leve\",
    \"tratamiento\": \"Enalapril 10mg cada 12 horas\"
  }"
```

### Ejecutar Recordatorios Manualmente

```bash
curl -X POST http://localhost:3000/api/scheduler/execute-reminders
```

---

## 📊 Logs Esperados

Si todo está bien configurado, verás:

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
```

---

## ❌ Solución de Problemas Comunes

### Error: "Invalid login"
**Solución:** Usa una contraseña de aplicación, no tu contraseña normal de Gmail

### Error: "Connection refused" a PostgreSQL
**Solución:** Verifica que PostgreSQL esté corriendo en el puerto 5433

### No se envían correos
**Solución:** 
1. Verifica las credenciales en `.env`
2. Asegúrate de tener verificación en dos pasos habilitada
3. Revisa los logs del servidor

---

## 🔗 Integración con Spring Boot

El backend de Spring Boot ya está configurado para llamar a este microservicio.

**Solo asegúrate de que:**
1. El microservicio esté corriendo en el puerto 3000
2. El backend tenga la configuración: `email.microservice.url=http://localhost:3000`

**Cuando crees una cita o diagnóstico desde el frontend, automáticamente se enviará el email.**

---

## 📚 Documentación Completa

Para más detalles, consulta:
- `README.md` - Documentación completa del microservicio
- `GUIA_INTEGRACION.md` - Guía detallada de integración con Spring Boot

---

## ✅ Checklist de Verificación

- [ ] Node.js instalado (v16+)
- [ ] PostgreSQL corriendo (puerto 5433)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` configurado
- [ ] Contraseña de aplicación de Gmail obtenida
- [ ] Microservicio iniciado (`npm run dev`)
- [ ] Servidor responde en http://localhost:3000
- [ ] Backend de Spring Boot corriendo
- [ ] Prueba de envío de email exitosa

---

**¡Listo! Tu microservicio de notificaciones está funcionando. 🎉**
