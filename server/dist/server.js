import { createApp } from './app.js';
import { env } from './config/env.js';
import { runMigrations } from './database/migrate.js';
import { seedDemoAccount } from './database/seed-demo-account.js';
const app = createApp();
async function startServer() {
    await runMigrations();
    await seedDemoAccount();
    app.listen(env.port, () => {
        console.log(`Loan Management API running on port ${env.port}`);
    });
}
startServer().catch((error) => {
    console.error('Unable to start Loan Management API:', error);
    process.exitCode = 1;
});
//# sourceMappingURL=server.js.map