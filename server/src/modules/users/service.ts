import { getUserById, listUsers, updateUserRole } from '../auth/service.js';
import { AppError } from '../../common/errors.js';
import type { UserRole } from '../auth/types.js';

export async function getAllUsers() {
  return listUsers();
}

export async function getUserProfile(userId: string) {
  const user = await getUserById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export async function updateRole(userId: string, role: UserRole) {
  const user = await updateUserRole(userId, role);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
}
