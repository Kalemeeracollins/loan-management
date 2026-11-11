export function sendSuccess(res, statusCode, payload, message) {
    return res.status(statusCode).json({
        success: true,
        message,
        data: payload,
    });
}
export function sendError(res, statusCode, message, details) {
    return res.status(statusCode).json({
        success: false,
        message,
        details,
    });
}
//# sourceMappingURL=response.js.map