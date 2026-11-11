import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { db } from './pool.js';
export async function seedDemoAccount() {
    if (env.nodeEnv === 'production' || !env.demoAccount.enabled)
        return;
    const [existingUsers] = await db.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [env.demoAccount.email]);
    if (existingUsers.length > 0)
        return;
    const passwordHash = await bcrypt.hash(env.demoAccount.password, 12);
    const now = new Date();
    const [result] = await db.execute(`INSERT INTO users (id, name, email, phone, password_hash, role, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE id = id`, [
        randomUUID(),
        'Demo Loan Officer',
        env.demoAccount.email,
        '+256700000099',
        passwordHash,
        'LOAN_OFFICER',
        'ACTIVE',
        now,
        now,
    ]);
    if (result.affectedRows > 0) {
        console.log(`Development demo account created: ${env.demoAccount.email}`);
    }
}
//# sourceMappingURL=seed-demo-account.js.map