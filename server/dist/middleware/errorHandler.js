import { AppError } from '../common/errors.js';
export function errorHandler(err, _req, res, _next) {
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
//# sourceMappingURL=errorHandler.js.map