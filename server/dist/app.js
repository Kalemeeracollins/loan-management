import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { apiRouter } from './routes.js';
import { errorHandler } from './middleware/errorHandler.js';
export function createApp() {
    const app = express();
    app.use(helmet({
        crossOriginResourcePolicy: { policy: 'same-site' },
    }));
    app.use(cors({
        origin: env.corsOrigin,
        credentials: true,
    }));
    app.use(express.json({ limit: '10mb' }));
    app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
    app.get('/health', (_req, res) => {
        res.status(200).json({
            status: 'ok',
            service: 'loan-management-server',
            environment: env.nodeEnv,
            timestamp: new Date().toISOString(),
        });
    });
    app.use('/api/v1', apiRouter);
    app.use((_req, res) => {
        res.status(404).json({
            success: false,
            message: 'Route not found',
        });
    });
    app.use(errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map