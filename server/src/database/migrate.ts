import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { RowDataPacket } from 'mysql2';
import mysql from 'mysql2/promise';
import { env } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationDirs = [
  path.join(__dirname, 'migrations'),
  path.resolve(process.cwd(), 'src/database/migrations'),
];

function quoteIdentifier(identifier: string): string {
  return `\`${identifier.replace(/`/g, '``')}\``;
}

async function getMigrationDir(): Promise<string> {
  for (const directory of migrationDirs) {
    try {
      await fs.access(directory);
      return directory;
    } catch {
      // Try the source migration directory when compiled files are used.
    }
  }

  throw new Error(`Migration directory not found. Checked: ${migrationDirs.join(', ')}`);
}

async function ensureDatabase(): Promise<void> {
  const database = quoteIdentifier(env.db.name);
  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.adminUser,
    password: env.db.adminPassword,
    multipleStatements: true,
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  } finally {
    await connection.end();
  }
}

export async function runMigrations(): Promise<void> {
  await ensureDatabase();

  const migrationDir = await getMigrationDir();
  const entries = (await fs.readdir(migrationDir)).filter((file) => file.endsWith('.sql')).sort();
  const database = quoteIdentifier(env.db.name);

  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.name,
    multipleStatements: true,
  });

  let lockAcquired = false;
  try {
    await connection.query(`CREATE TABLE IF NOT EXISTS ${database}.schema_migrations (
      migration_name VARCHAR(255) NOT NULL,
      applied_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      PRIMARY KEY (migration_name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);

    const [lockRows] = await connection.query<RowDataPacket[]>(
      "SELECT GET_LOCK('loan_management_schema_migrations', 30) AS acquired",
    );
    lockAcquired = Number(lockRows[0]?.acquired) === 1;
    if (!lockAcquired) throw new Error('Timed out waiting for the database migration lock');

    for (const file of entries) {
      const [appliedRows] = await connection.execute<RowDataPacket[]>(
        `SELECT migration_name FROM ${database}.schema_migrations WHERE migration_name = ? LIMIT 1`,
        [file],
      );

      if (appliedRows.length > 0) continue;

      const sql = await fs.readFile(path.join(migrationDir, file), 'utf8');
      await connection.query(sql);
      await connection.execute(`INSERT INTO ${database}.schema_migrations (migration_name) VALUES (?)`, [file]);
      console.log(`Applied migration: ${file}`);
    }
  } finally {
    if (lockAcquired) {
      await connection.query("SELECT RELEASE_LOCK('loan_management_schema_migrations')").catch(() => undefined);
    }
    await connection.end();
  }
}

const invokedFile = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : undefined;

if (import.meta.url === invokedFile) {
  runMigrations()
    .then(() => console.log('Migration run completed'))
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exitCode = 1;
    });
}
