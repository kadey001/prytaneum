import { getOrCreateServer } from './server';
import { getPrismaClient, getRedisClient } from './utils';

let isShuttingDown = false;

export function initGracefulShutdown() {
    const server = getOrCreateServer();
    const cleanup = () => {
        if (isShuttingDown) return; // Prevent multiple invocations
        isShuttingDown = true;
        server.log.info('Gracefully shutting down...');

        // Stop accepting new connections
        server
            .close()
            .then(() => {
                server.log.info('Server closed.');

                // Close Redis client
                const redis = getRedisClient(server.log);
                redis
                    .quit()
                    .then(() => {
                        server.log.info('Redis client closed.');
                        process.exit(0);
                    })
                    .catch((err) => {
                        server.log.error('Error closing Redis client:', err);
                        process.exit(1);
                    });

                // Close Prisma client
                const prisma = getPrismaClient(server.log);
                prisma
                    .$disconnect()
                    .then(() => {
                        server.log.info('Prisma client closed.');
                        process.exit(0);
                    })
                    .catch((err) => {
                        server.log.error('Error closing Prisma client:', err);
                        process.exit(1);
                    });
            })
            .catch((err) => {
                server.log.error('Error closing server:', err);
                process.exit(1);
            });
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

    process.on('unhandledRejection', (reason, promise) => {
        server.log.error('Unhandled Rejection at:', promise, 'reason:', reason);
        process.exit(1);
    });

    process.on('uncaughtException', (err) => {
        server.log.error('Uncaught Exception thrown:', err);
        process.exit(1);
    });
}
