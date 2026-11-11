import { sendSuccess } from '../../common/response.js';
import { AppError } from '../../common/errors.js';
import { loginUser, refreshToken, registerUser } from './service.js';
export async function registerController(req, res, next) {
    try {
        const payload = req.body;
        const user = await registerUser(payload);
        sendSuccess(res, 201, user, 'User registered successfully');
    }
    catch (error) {
        next(error instanceof Error ? error : new AppError('Registration failed', 500));
    }
}
export async function loginController(req, res, next) {
    try {
        const payload = req.body;
        const result = await loginUser(payload);
        sendSuccess(res, 200, result, 'Login successful');
    }
    catch (error) {
        next(error instanceof Error ? error : new AppError('Login failed', 401));
    }
}
export async function refreshController(req, res, next) {
    try {
        const payload = req.body;
        const tokens = await refreshToken(payload);
        sendSuccess(res, 200, tokens, 'Token refreshed');
    }
    catch (error) {
        next(error instanceof Error ? error : new AppError('Token refresh failed', 401));
    }
}
export async function logoutController(req, res) {
    const refreshTokenValue = typeof req.body?.refreshToken === 'string' ? req.body.refreshToken : undefined;
    if (refreshTokenValue) {
        const { invalidateRefreshToken } = await import('./service.js');
        invalidateRefreshToken(refreshTokenValue);
    }
    sendSuccess(res, 200, { loggedOut: true }, 'Logged out successfully');
}
//# sourceMappingURL=controller.js.map