import { randomUUID } from 'node:crypto';
import { AppError } from '../../common/errors.js';
import { createApplicantRepo, findApplicantByEmailRepo, findApplicantByIdRepo, listApplicantsRepo } from './repository.js';
import type { Applicant, CreateApplicantPayload } from './types.js';

export async function listApplicants(): Promise<Applicant[]> {
  return listApplicantsRepo();
}

export async function createApplicant(payload: CreateApplicantPayload): Promise<Applicant> {
  const existingApplicant = await findApplicantByEmailRepo(payload.email);

  if (existingApplicant) {
    throw new AppError('An applicant with this email already exists', 409);
  }

  const applicant: Applicant = {
    id: randomUUID(),
    type: payload.type,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return createApplicantRepo(applicant);
}

export async function getApplicantById(id: string): Promise<Applicant | undefined> {
  return findApplicantByIdRepo(id);
}

export async function getApplicant(id: string): Promise<Applicant> {
  const applicant = await getApplicantById(id);

  if (!applicant) {
    throw new AppError('Applicant not found', 404);
  }

  return applicant;
}
