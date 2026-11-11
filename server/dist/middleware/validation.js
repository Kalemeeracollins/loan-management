import { z } from 'zod';
import { AppError } from '../common/errors.js';
export function validateBody(schema) {
    return (req, _res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const flattened = result.error.flatten();
            return next(new AppError('Validation failed', 400, { issues: flattened.fieldErrors }));
        }
        req.body = result.data;
        return next();
    };
}
export function validateQuery(schema) {
    return (req, _res, next) => {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            return next(new AppError('Invalid query parameters', 400, { issues: result.error.flatten().fieldErrors }));
        }
        req.query = result.data;
        return next();
    };
}
export const idParamSchema = z.object({
    id: z.string().uuid({ version: 'v4' }).or(z.string().min(1)),
});
//# sourceMappingURL=validation.js.map