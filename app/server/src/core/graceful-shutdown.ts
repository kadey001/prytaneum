// import type { FastifyLoggerInstance } from 'fastify';
// import { getRedisClient } from './utils';

// // TODO: make this much more robust.
// export function initGracefulShutdown(logger: FastifyLoggerInstance) {
//     const cleanup = () => {
//         const redis = getRedisClient(logger);
//         try {
//             redis.quit().then(() => {
//                 logger.info('Redis client closed.');
//             });
//         } catch (err) {
//             logger.error(err);
//         }
//     };

//     process.on('exit', cleanup);
//     process.on('uncaughtException', cleanup);
// }
