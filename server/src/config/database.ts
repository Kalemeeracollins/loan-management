import mysql from 'mysql2/promise';
import { env } from './env.js';

export const db = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
  waitForConnections: true,
  connectionLimit: env.db.connectionLimit,
  queueLimit: 0,
  charset: 'utf8mb4',
  decimalNumbers: true,
});

export async function testDatabaseConnection(): Promise<void> {
  try {
    await db.query('SELECT 1');
    console.log('Database connection OK');
  } catch (error) {
    console.warn('Database connection unavailable. Starting app in limited mode.', error);
  }
}
