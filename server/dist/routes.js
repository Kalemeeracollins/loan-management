import { Router } from 'express';
import { authRoutes } from './modules/auth/routes.js';
import { usersRoutes } from './modules/users/routes.js';
import { applicantsRoutes } from './modules/applicants/routes.js';
import { loanProductsRoutes } from './modules/loan-products/routes.js';
import { applicationsRoutes } from './modules/applications/routes.js';
export const apiRouter = Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', usersRoutes);
apiRouter.use('/applicants', applicantsRoutes);
apiRouter.use('/loan-products', loanProductsRoutes);
apiRouter.use('/applications', applicationsRoutes);
//# sourceMappingURL=routes.js.map