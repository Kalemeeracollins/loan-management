import { Router } from 'express';
import { z } from 'zod';
import { requireAuth, requireRole, type AuthenticatedRequest } from '../../middleware/auth.js';
import { validateBody } from '../../middleware/validation.js';
import { getAllUsers, getUserProfile, updateRole } from './service.js';
import { sendSuccess } from '../../common/response.js';

export const usersRoutes = Router();

usersRoutes.use(requireAuth);

usersRoutes.get('/', requireRole('SUPER_ADMIN', 'LOAN_OFFICER', 'CREDIT_ANALYST', 'LOAN_APPROVER', 'FINANCE_OFFICER', 'AUDITOR'), async (_req, res) => {
  sendSuccess(res, 200, await getAllUsers(), 'Users fetched successfully');
});

usersRoutes.get('/me', (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'User not found' });
  }

  return sendSuccess(res, 200, req.user, 'Current user fetched');
});

usersRoutes.get('/:id', requireRole('SUPER_ADMIN', 'LOAN_OFFICER', 'CREDIT_ANALYST', 'LOAN_APPROVER', 'FINANCE_OFFICER', 'AUDITOR'), async (req, res) => {
  const profile = await getUserProfile(String(req.params.id));
  sendSuccess(res, 200, profile, 'User profile fetched');
});

const updateRoleSchema = z.object({
  role: z.enum(['SUPER_ADMIN', 'LOAN_OFFICER', 'CREDIT_ANALYST', 'LOAN_APPROVER', 'FINANCE_OFFICER', 'AUDITOR', 'APPLICANT']),
});

usersRoutes.patch('/:id/role', requireRole('SUPER_ADMIN'), validateBody(updateRoleSchema), async (req, res) => {
  const updated = await updateRole(String(req.params.id), req.body.role);
  sendSuccess(res, 200, updated, 'User role updated');
});
