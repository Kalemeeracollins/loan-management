import { randomUUID } from 'node:crypto';
import { AppError } from '../../common/errors.js';
import type { CreateApplicationPayload, LoanApplication } from './types.js';

const applications: LoanApplication[] = [];

export function listApplications(): LoanApplication[] {
  return applications;
}

export function createApplication(payload: CreateApplicationPayload): LoanApplication {
  const application: LoanApplication = {
    id: randomUUID(),
    applicantId: payload.applicantId,
    productId: payload.productId,
    requestedAmount: payload.requestedAmount,
    termMonths: payload.termMonths,
    purpose: payload.purpose,
    status: 'SUBMITTED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  applications.push(application);
  return application;
}

export function getApplicationById(id: string): LoanApplication | undefined {
  return applications.find((application) => application.id === id);
}

export function getApplication(id: string): LoanApplication {
  const application = getApplicationById(id);

  if (!application) {
    throw new AppError('Application not found', 404);
  }

  return application;
}

export function updateApplicationStatus(id: string, status: LoanApplication['status']): LoanApplication {
  const application = getApplication(id);
  application.status = status;
  application.updatedAt = new Date().toISOString();
  return application;
}
