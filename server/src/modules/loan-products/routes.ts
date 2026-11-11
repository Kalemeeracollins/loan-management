import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth.js';
import { validateBody } from '../../middleware/validation.js';
import { loanProductSchema } from './schema.js';
import { createLoanProductController, getLoanProductController, listLoanProductsController } from './controller.js';

export const loanProductsRoutes = Router();

loanProductsRoutes.use(requireAuth);
loanProductsRoutes.get('/', listLoanProductsController);
loanProductsRoutes.post('/', requireRole('SUPER_ADMIN'), validateBody(loanProductSchema), createLoanProductController);
loanProductsRoutes.get('/:id', getLoanProductController);
