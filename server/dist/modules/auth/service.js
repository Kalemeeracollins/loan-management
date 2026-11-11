import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { env } from '../../config/env.js';
import { AppError } from '../../common/errors.js';
import { createUserRepo, findUserByEmailRepo, findUserByIdRepo, listUsersRepo, updateUserRoleRepo } from './repository.js';
const refreshTokens = new Map();
function signJwt(payload, secret, expiresIn) {
    return jwt.sign({ ...payload, jti: randomUUID() }, secret, { expiresIn: expiresIn });
}
export async function getUserById(id) {
    return findUserByIdRepo(id);
}
export async function listUsers() {
    const users = await listUsersRepo();
    return users.map(({ passwordHash, ...user }) => user);
}
export async function getUserByEmail(email) {
    return findUserByEmailRepo(email);
}
export async function registerUser(payload) {
    const existingUser = await getUserByEmail(payload.email);
    if (existingUser) {
        throw new AppError('A user with this email already exists', 409);
    }
    const user = {
        id: randomUUID(),
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        role: payload.role ?? 'APPLICANT',
        status: 'ACTIVE',
        passwordHash: bcrypt.hashSync(payload.password, 10),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    await createUserRepo(user);
    const { passwordHash, ...safeUser } = user;
    return safeUser;
}
export async function loginUser(payload) {
    const user = await getUserByEmail(payload.email);
    if (!user || user.status !== 'ACTIVE') {
        throw new AppError('Invalid email or password', 401);
    }
    const validPassword = bcrypt.compareSync(payload.password, user.passwordHash);
    if (!validPassword) {
        throw new AppError('Invalid email or password', 401);
    }
    const accessToken = signJwt({ id: user.id, email: user.email, role: user.role }, env.jwtAccessSecret, env.jwtAccessExpiresIn);
    const refreshToken = signJwt({ id: user.id, email: user.email, role: user.role }, env.jwtRefreshSecret, env.jwtRefreshExpiresIn);
    refreshTokens.set(refreshToken, user.id);
    const { passwordHash, ...safeUser } = user;
    return {
        accessToken,
        refreshToken,
        expiresIn: env.jwtAccessExpiresIn,
        user: safeUser,
    };
}
export async function refreshToken(payload) {
    const userId = refreshTokens.get(payload.refreshToken);
    if (!userId) {
        throw new AppError('Refresh token is invalid or expired', 401);
    }
    const user = await getUserById(userId);
    if (!user || user.status !== 'ACTIVE') {
        throw new AppError('User no longer active', 401);
    }
    const accessToken = signJwt({ id: user.id, email: user.email, role: user.role }, env.jwtAccessSecret, env.jwtAccessExpiresIn);
    const freshRefreshToken = signJwt({ id: user.id, email: user.email, role: user.role }, env.jwtRefreshSecret, env.jwtRefreshExpiresIn);
    refreshTokens.delete(payload.refreshToken);
    refreshTokens.set(freshRefreshToken, user.id);
    return {
        accessToken,
        refreshToken: freshRefreshToken,
        expiresIn: env.jwtAccessExpiresIn,
    };
}
export function invalidateRefreshToken(refreshToken) {
    refreshTokens.delete(refreshToken);
}
export async function updateUserRole(userId, role) {
    const user = await updateUserRoleRepo(userId, role);
    if (!user) {
        return undefined;
    }
    const { passwordHash, ...safeUser } = user;
    return safeUser;
}
//# sourceMappingURL=service.js.map