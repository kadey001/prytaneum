/* eslint-disable @typescript-eslint/indent */
import fastify, { FastifyInstance } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

// Server should be a singleton.
let _server: FastifyInstance | null = null;

function mapPinoLevelToGCP(level: number): string {
    if (level >= 60) return 'CRITICAL'; // fatal
    if (level >= 50) return 'ERROR';
    if (level >= 40) return 'WARNING';
    if (level >= 30) return 'INFO';
    if (level >= 20) return 'DEBUG';
    return 'DEFAULT';
}

const makeProductionServer = () =>
    fastify({
        genReqId: () => uuidv4(),
        logger: {
            level: process.env.LOG_LEVEL ?? 'info',
            formatters: {
                level: (_, number) => ({ severity: mapPinoLevelToGCP(number) }),
            },
            serializers: {
                req: ({ headers, url }) => ({
                    url,
                    headers: {
                        host: headers.host,
                        origin: headers.origin,
                        location: headers.location,
                        'user-agent': headers['user-agent'],
                        connection: headers.connection,
                        upgrade: headers.upgrade,
                        referer: headers.referer,
                    },
                }),
                res: ({ statusCode }) => ({ statusCode }),
            },
        },
        trustProxy: true,
    });

const makeDevelopmentServer = () =>
    fastify({
        genReqId: () => uuidv4(),
        logger: {
            level: process.env.LOG_LEVEL ?? 'debug',
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname,res,reqId,req',
                },
            },
        },
    });

const makeTestServer = () => fastify({ logger: true });

const makeServer =
    process.env.NODE_ENV === 'production'
        ? makeProductionServer
        : process.env.NODE_ENV === 'test'
        ? makeTestServer
        : makeDevelopmentServer;

export function getOrCreateServer() {
    try {
        const server = _server ?? makeServer();
        if (!_server) _server = server;
        return server;
    } catch (error) {
        console.error('Failed to create server.');
        console.error(error);
        process.exit(1);
    }
}
