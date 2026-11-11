import dotenv from 'dotenv';
dotenv.config();
export const env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 4000),
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'development-access-secret',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'development-refresh-secret',
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    db: {
        host: process.env.DB_HOST ?? '127.0.0.1',
        port: Number(process.env.DB_PORT ?? 3306),
        name: process.env.DB_NAME ?? 'loan_management',
        user: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASSWORD ?? '',
        adminUser: process.env.DB_ADMIN_USER ?? process.env.DB_USER ?? 'root',
        adminPassword: process.env.DB_ADMIN_PASSWORD ?? process.env.DB_PASSWORD ?? '',
        connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 10),
    },
    demoAccount: {
        enabled: process.env.DEMO_ACCOUNT_ENABLED !== 'false',
        email: process.env.DEMO_ACCOUNT_EMAIL ?? 'demo@loan.local',
        password: process.env.DEMO_ACCOUNT_PASSWORD ?? 'Demo@12345',
    },
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    logLevel: process.env.LOG_LEVEL ?? 'info',
    rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60000),
    rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 100),
    uploadDir: process.env.UPLOAD_DIR ?? './storage/uploads',
    fileUploadMaxSize: Number(process.env.FILE_UPLOAD_MAX_SIZE ?? 10 * 1024 * 1024),
};
//# sourceMappingURL=env.js.map