import { randomUUID } from 'node:crypto';
import { AppError } from '../../common/errors.js';
const applications = [];
export function listApplications() {
    return applications;
}
export function createApplication(payload) {
    const application = {
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
export function getApplicationById(id) {
    return applications.find((application) => application.id === id);
}
export function getApplication(id) {
    const application = getApplicationById(id);
    if (!application) {
        throw new AppError('Application not found', 404);
    }
    return application;
}
export function updateApplicationStatus(id, status) {
    const application = getApplication(id);
    application.status = status;
    application.updatedAt = new Date().toISOString();
    return application;
}
//# sourceMappingURL=service.js.map