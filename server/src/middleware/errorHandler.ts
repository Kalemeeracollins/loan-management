import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../common/errors.js';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
    });
    return;
  }

  console.error('Unhandled application error:', err);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}
