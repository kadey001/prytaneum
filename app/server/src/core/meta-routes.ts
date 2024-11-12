import type { FastifyInstance } from 'fastify';
import { ErrorBody, ErrorReporter } from './utils';

const errorReporter = new ErrorReporter();

export function setupMetaRoutes(server: FastifyInstance) {
    server.log.debug('Setting up meta routes.');

    // Routes for kubernetes health checks.
    server.get('/', async () => ({ status: 'Healthy' }));
    server.get('/healthz', async () => ({ status: 'Healthy' }));

    // Route for reporting client errors.
    server.route({
        method: 'POST',
        url: '/api/report-error',
        handler: async (request, reply) => {
            const error = request.body as ErrorBody;
            errorReporter.reportClientError(error);
            reply.send({ success: true });
        },
    });
}
