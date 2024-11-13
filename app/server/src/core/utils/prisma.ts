import type { FastifyBaseLogger } from 'fastify';

import { PrismaClient } from '@local/__generated__/prisma';
import { getOrCreateServer } from '../server';

const server = getOrCreateServer();

// Prisma client must be a singleton
let _prisma: PrismaClient | null = null;

export function getPrismaClient(logger: FastifyBaseLogger = server.log): PrismaClient {
    const prisma = _prisma ?? new PrismaClient();
    if (!_prisma) {
        logger.debug('Instantiating new prisma client.');
        _prisma = prisma;
    }
    return prisma;
}
