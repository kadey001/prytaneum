import type { FastifyBaseLogger } from 'fastify';

import { PrismaClient } from '@local/__generated__/prisma';
import { getOrCreateServer } from '../server';

// Prisma client must be a singleton
let _prisma: PrismaClient | null = null;
const server = getOrCreateServer();

export function getPrismaClient(_logger?: FastifyBaseLogger) {
    const logger = _logger || server.log;
    const prisma = _prisma ?? new PrismaClient();
    if (!_prisma) {
        logger.debug('Instantiating new prisma client.');
        _prisma = prisma;
    }
    return prisma;
}
