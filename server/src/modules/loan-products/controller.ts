import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../../common/errors.js';
import { sendSuccess } from '../../common/response.js';
import { createLoanProduct, getLoanProduct, listLoanProducts } from './service.js';

export async function listLoanProductsController(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    sendSuccess(res, 200, listLoanProducts(), 'Loan products fetched');
  } catch (error) {
    next(error instanceof Error ? error : new AppError('Unable to fetch loan products', 500));
  }
}

export async function createLoanProductController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = createLoanProduct(req.body);
    sendSuccess(res, 201, product, 'Loan product created');
  } catch (error) {
    next(error instanceof Error ? error : new AppError('Unable to create loan product', 500));
  }
}

export async function getLoanProductController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = getLoanProduct(String(req.params.id));
    sendSuccess(res, 200, product, 'Loan product fetched');
  } catch (error) {
    next(error instanceof Error ? error : new AppError('Unable to fetch loan product', 500));
  }
}
