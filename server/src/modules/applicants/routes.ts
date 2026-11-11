import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth.js';
import { validateBody } from '../../middleware/validation.js';
import { applicantSchema } from './schema.js';
import { createApplicantController, getApplicantController, listApplicantsController } from './controller.js';

export const applicantsRoutes = Router();

applicantsRoutes.use(requireAuth);
applicantsRoutes.get('/', requireRole('SUPER_ADMIN', 'LOAN_OFFICER', 'CREDIT_ANALYST', 'LOAN_APPROVER', 'FINANCE_OFFICER', 'AUDITOR'), listApplicantsController);
applicantsRoutes.post('/', requireRole('SUPER_ADMIN', 'LOAN_OFFICER'), validateBody(applicantSchema), createApplicantController);
applicantsRoutes.get('/:id', requireRole('SUPER_ADMIN', 'LOAN_OFFICER', 'CREDIT_ANALYST', 'LOAN_APPROVER', 'FINANCE_OFFICER', 'AUDITOR', 'APPLICANT'), getApplicantController);
