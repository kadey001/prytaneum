import type { FastifyBaseLogger } from 'fastify';
import { getOrCreateServer } from './server';
import { getRedisClient } from './utils';

export function initGracefulShutdown(logger: FastifyBaseLogger) {
    const cleanup = () => {
        logger.info('Gracefully shutting down...');
        const server = getOrCreateServer();
        const redis = getRedisClient(logger);

        logger.info('Closing redis client...');
        redis
            .quit()
            .then(() => {
                logger.info('Redis client closed.');
                logger.info('Closing server...');
                server
                    .close()
                    .then(() => {
                        logger.info('Server closed.');
                        process.exit(0);
                    })
                    .catch((err) => {
                        logger.error(err);
                        process.exit(1);
                    });
            })
            .catch((err) => {
                logger.error(err);
            });
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('uncaughtException', cleanup);
}
