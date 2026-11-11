import { AppError } from '../../common/errors.js';
import { sendSuccess } from '../../common/response.js';
import { createApplication, getApplication, listApplications, updateApplicationStatus } from './service.js';
export async function listApplicationsController(_req, res, next) {
    try {
        sendSuccess(res, 200, listApplications(), 'Applications fetched');
    }
    catch (error) {
        next(error instanceof Error ? error : new AppError('Unable to fetch applications', 500));
    }
}
export async function createApplicationController(req, res, next) {
    try {
        const application = createApplication(req.body);
        sendSuccess(res, 201, application, 'Application created');
    }
    catch (error) {
        next(error instanceof Error ? error : new AppError('Unable to create application', 500));
    }
}
export async function getApplicationController(req, res, next) {
    try {
        const application = getApplication(String(req.params.id));
        sendSuccess(res, 200, application, 'Application fetched');
    }
    catch (error) {
        next(error instanceof Error ? error : new AppError('Unable to fetch application', 500));
    }
}
export async function updateApplicationStatusController(req, res, next) {
    try {
        const application = updateApplicationStatus(String(req.params.id), req.body.status);
        sendSuccess(res, 200, application, 'Application status updated');
    }
    catch (error) {
        next(error instanceof Error ? error : new AppError('Unable to update application status', 500));
    }
}
//# sourceMappingURL=controller.js.map