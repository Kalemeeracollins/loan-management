import { randomUUID } from 'node:crypto';
import { AppError } from '../../common/errors.js';
import { createApplicantRepo, findApplicantByEmailRepo, findApplicantByIdRepo, listApplicantsRepo } from './repository.js';
export async function listApplicants() {
    return listApplicantsRepo();
}
export async function createApplicant(payload) {
    const existingApplicant = await findApplicantByEmailRepo(payload.email);
    if (existingApplicant) {
        throw new AppError('An applicant with this email already exists', 409);
    }
    const applicant = {
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
export async function getApplicantById(id) {
    return findApplicantByIdRepo(id);
}
export async function getApplicant(id) {
    const applicant = await getApplicantById(id);
    if (!applicant) {
        throw new AppError('Applicant not found', 404);
    }
    return applicant;
}
//# sourceMappingURL=service.js.map