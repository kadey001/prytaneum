import type { FastifyBaseLogger } from 'fastify';
import { Redis, Cluster, ClusterNode } from 'ioredis';
// @ts-ignore - MockRedis is not typed
import MockRedis from 'ioredis-mock';

// Redis client must be a singleton
let _redis: Redis | Cluster | null = null;

function generateNewRedisClient(logger: FastifyBaseLogger) {
    if (process.env.NODE_ENV === 'test') {
        logger.info('Using mock redis client.');
        return new MockRedis() as Redis;
    }
    logger.debug('DEBUG DNS lookup');
    const dns = require('dns');
    const res = dns.lookup(process.env.REDIS_HOST, console.log);
    console.log(res);
    logger.info('Generating new redis client.');
    if (process.env.NODE_ENV === 'production') {
        logger.info('Using production redis client.');
        let clusterNodes: ClusterNode[] = [];
        for (let i = 0; i < 7; i++) {
            clusterNodes.push({
                host: process.env[`REDIS_HOST_${i}`],
                port: Number(process.env[`REDIS_PORT_${i}`]),
            });
        }
        logger.info('Running on cluster mode with nodes: ', JSON.stringify(clusterNodes));
        return new Redis.Cluster(clusterNodes, {
            slotsRefreshTimeout: 10000, // 10 seconds
            clusterRetryStrategy(times) {
                if (times > 20) return null; // End reconnecting after 20 attempts
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
            redisOptions: {
                connectTimeout: 10000, // 10 seconds
                reconnectOnError(err) {
                    const targetError = 'READONLY';
                    if (err.message.includes(targetError)) {
                        // Only reconnect when the error contains "READONLY"
                        return true; // or `return 1;`
                    }
                    return false;
                },
            },
        });
    }
    return new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        connectTimeout: 10000, // 10 seconds
        retryStrategy(times) {
            if (times > 20) return null; // End reconnecting after 20 attempts
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
        reconnectOnError(err) {
            const targetError = 'READONLY';
            if (err.message.includes(targetError)) {
                // Only reconnect when the error contains "READONLY"
                return true; // or `return 1;`
            }
            return false;
        },
    });
}

export function getRedisClient(logger: FastifyBaseLogger) {
    const redis = _redis ?? generateNewRedisClient(logger);

    if (!_redis) {
        logger.info('Instantiating new redis client.');
        _redis = redis;
        redis.on('connect', () => logger.info('Redis client connected.'));
        redis.on('close', () => logger.info('Redis client closed.'));
        redis.on('ready', () => logger.info('Redis client ready.'));
        redis.on('reconnecting', () => logger.info('Redis client reconnecting.'));
        redis.on('error', (err) => logger.error(err));
        redis.on('end', () => logger.info('Redis client ended.'));
    }

    return redis;
}
