import type { Response } from 'express';

export function sendSuccess<T>(res: Response, statusCode: number, payload: T, message?: string): Response {
  return res.status(statusCode).json({
    success: true,
    message,
    data: payload,
  });
}

export function sendError(res: Response, statusCode: number, message: string, details?: Record<string, unknown>): Response {
  return res.status(statusCode).json({
    success: false,
    message,
    details,
  });
}
