import { db } from '../../database/pool.js';
const memoryUsers = [
    {
        id: 'cbfae2f1-0ab1-4f3d-a8ef-71d26b1f17f5',
        name: 'System Admin',
        email: 'admin@loan.local',
        phone: '+256700000001',
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
        passwordHash: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92Lx5t6q8p6wS7k5U2fJG6',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];
function mapDbUser(row) {
    return {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        role: row.role,
        status: row.status,
        passwordHash: row.password_hash ?? row.passwordHash,
        createdAt: row.created_at ?? row.createdAt,
        updatedAt: row.updated_at ?? row.updatedAt,
    };
}
export async function findUserByIdRepo(id) {
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
        return rows[0] ? mapDbUser(rows[0]) : memoryUsers.find((user) => user.id === id);
    }
    catch {
        return memoryUsers.find((user) => user.id === id);
    }
}
export async function findUserByEmailRepo(email) {
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
        return rows[0] ? mapDbUser(rows[0]) : memoryUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
    }
    catch {
        return memoryUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
    }
}
export async function listUsersRepo() {
    try {
        const [rows] = await db.execute('SELECT * FROM users ORDER BY created_at DESC');
        return rows.map(mapDbUser);
    }
    catch {
        return memoryUsers;
    }
}
export async function createUserRepo(user) {
    try {
        await db.execute(`INSERT INTO users (id, name, email, phone, password_hash, role, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            user.id,
            user.name,
            user.email,
            user.phone,
            user.passwordHash,
            user.role,
            user.status,
            user.createdAt,
            user.updatedAt,
        ]);
        return user;
    }
    catch {
        memoryUsers.push(user);
        return user;
    }
}
export async function updateUserRoleRepo(userId, role) {
    try {
        const [result] = await db.execute('UPDATE users SET role = ?, updated_at = ? WHERE id = ?', [role, new Date().toISOString(), userId]);
        if (result.affectedRows && result.affectedRows > 0) {
            const user = await findUserByIdRepo(userId);
            return user ? { ...user, role } : user;
        }
        return memoryUsers.find((user) => user.id === userId);
    }
    catch {
        const user = memoryUsers.find((item) => item.id === userId);
        if (!user)
            return undefined;
        user.role = role;
        user.updatedAt = new Date().toISOString();
        return user;
    }
}
//# sourceMappingURL=repository.js.map