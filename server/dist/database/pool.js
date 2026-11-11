import mysql from 'mysql2/promise';
import { env } from '../config/env.js';
export const db = mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.name,
    connectionLimit: env.db.connectionLimit,
    waitForConnections: true,
    queueLimit: 0,
    charset: 'utf8mb4',
    decimalNumbers: true,
});
export async function pingDatabase() {
    try {
        await db.query('SELECT 1');
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=pool.js.map