import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../../common/errors.js';
import { sendSuccess } from '../../common/response.js';
import { createApplicant, getApplicant, listApplicants } from './service.js';

export async function listApplicantsController(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    sendSuccess(res, 200, await listApplicants(), 'Applicants fetched');
  } catch (error) {
    next(error instanceof Error ? error : new AppError('Unable to fetch applicants', 500));
  }
}

export async function createApplicantController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const applicant = await createApplicant(req.body);
    sendSuccess(res, 201, applicant, 'Applicant created');
  } catch (error) {
    next(error instanceof Error ? error : new AppError('Unable to create applicant', 500));
  }
}

export async function getApplicantController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const applicant = await getApplicant(String(req.params.id));
    sendSuccess(res, 200, applicant, 'Applicant fetched');
  } catch (error) {
    next(error instanceof Error ? error : new AppError('Unable to fetch applicant', 500));
  }
}
