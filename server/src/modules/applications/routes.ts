import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth.js';
import { validateBody } from '../../middleware/validation.js';
import { createApplicationSchema, updateApplicationStatusSchema } from './schema.js';
import { createApplicationController, getApplicationController, listApplicationsController, updateApplicationStatusController } from './controller.js';

export const applicationsRoutes = Router();

applicationsRoutes.use(requireAuth);
applicationsRoutes.get('/', requireRole('SUPER_ADMIN', 'LOAN_OFFICER', 'CREDIT_ANALYST', 'LOAN_APPROVER', 'FINANCE_OFFICER', 'AUDITOR'), listApplicationsController);
applicationsRoutes.post('/', requireRole('SUPER_ADMIN', 'LOAN_OFFICER', 'APPLICANT'), validateBody(createApplicationSchema), createApplicationController);
applicationsRoutes.get('/:id', requireRole('SUPER_ADMIN', 'LOAN_OFFICER', 'CREDIT_ANALYST', 'LOAN_APPROVER', 'FINANCE_OFFICER', 'AUDITOR', 'APPLICANT'), getApplicationController);
applicationsRoutes.patch('/:id/status', requireRole('SUPER_ADMIN', 'LOAN_OFFICER', 'CREDIT_ANALYST', 'LOAN_APPROVER'), validateBody(updateApplicationStatusSchema), updateApplicationStatusController);
