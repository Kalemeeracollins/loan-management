import type { NextFunction, Request, Response } from 'express';
import { z, type ZodSchema } from 'zod';
import { AppError } from '../common/errors.js';

export function validateBody<T extends ZodSchema>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const flattened = result.error.flatten();
      return next(new AppError('Validation failed', 400, { issues: flattened.fieldErrors }));
    }

    req.body = result.data;
    return next();
  };
}

export function validateQuery<T extends ZodSchema>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return next(new AppError('Invalid query parameters', 400, { issues: result.error.flatten().fieldErrors }));
    }

    req.query = result.data as typeof req.query;
    return next();
  };
}

export const idParamSchema = z.object({
  id: z.string().uuid({ version: 'v4' }).or(z.string().min(1)),
});
