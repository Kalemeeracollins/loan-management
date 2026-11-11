import { Router } from 'express';
import { validateBody } from '../../middleware/validation.js';
import { loginController, logoutController, refreshController, registerController } from './controller.js';
import { loginSchema, refreshSchema, registerSchema } from './schema.js';

export const authRoutes = Router();

authRoutes.post('/register', validateBody(registerSchema), registerController);
authRoutes.post('/login', validateBody(loginSchema), loginController);
authRoutes.post('/refresh', validateBody(refreshSchema), refreshController);
authRoutes.post('/logout', logoutController);
