const { Pool } = require('pg');
const config = require('../config/app.config');

/**
 * Servicio para interactuar con la base de datos PostgreSQL
 */
class DatabaseService {
    constructor() {
        this.pool = new Pool({
            host: config.database.host,
            port: config.database.port,
            database: config.database.database,
            user: config.database.user,
            password: config.database.password,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });

        this.pool.on('error', (err) => {
            console.error('❌ Error inesperado en el pool de conexiones:', err);
        });
    }

    /**
     * Obtiene las citas que necesitan recordatorio (24 horas antes)
     * @returns {Promise<Array>} Lista de citas para recordatorio
     */
    async getAppointmentsForReminder() {
        const query = `
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
            AND h.disponibilidad = false
            ORDER BY h.fecha, c.horario;
        `;

        try {
            const result = await this.pool.query(query);
            console.log(`📊 Se encontraron ${result.rows.length} citas para recordatorio`);
            return result.rows;
        } catch (error) {
            console.error('❌ Error al obtener citas para recordatorio:', error.message);
            throw error;
        }
    }

    /**
     * Verifica la conexión con la base de datos
     * @returns {Promise<boolean>}
     */
    async testConnection() {
        try {
            const result = await this.pool.query('SELECT NOW()');
            console.log('✅ Conexión a la base de datos exitosa');
            return true;
        } catch (error) {
            console.error('❌ Error al conectar con la base de datos:', error.message);
            return false;
        }
    }

    /**
     * Cierra el pool de conexiones
     */
    async close() {
        await this.pool.end();
        console.log('🔌 Pool de conexiones cerrado');
    }
}

module.exports = new DatabaseService();
