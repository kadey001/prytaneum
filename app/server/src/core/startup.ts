import { getOrCreateServer } from './server';
import { checkEnv } from './check-env';
import { initGracefulShutdown } from './graceful-shutdown';
import { setupMetaRoutes } from './meta-routes';
import { getPrismaClient, getRedisClient, getTranslationClient } from './utils';
import * as plugins from './plugins';
import * as hooks from './hooks';

export function startup() {
    const server = getOrCreateServer();
    server.log.info('Performing setup checks...');
    checkEnv();
    server.log.info('Setting up graceful shutdown...');
    initGracefulShutdown(server);

    server.log.info('Creating clients...');
    try {
        getPrismaClient();
        getRedisClient(server.log);
        getTranslationClient();
    } catch (error) {
        server.log.error(error);
        server.log.fatal('Failed to create clients, exiting.');
        process.exit(1);
    }

    server.log.info('Attaching plugins...');
    try {
        plugins.attachAltairTo(server);
        plugins.attachCookieTo(server);
        plugins.attachCorsTo(server);
        plugins.attachMercuriusTo(server);
        plugins.attachMulterTo(server);
    } catch (error) {
        server.log.error(error);
        server.log.fatal('Failed to attach plugins, exiting.');
        process.exit(1);
    }

    server.log.info('Attaching hooks...');
    try {
        hooks.attachPreHandlerTo(server);
    } catch (error) {
        server.log.error(error);
        server.log.fatal('Failed to attach hooks, exiting.');
        process.exit(1);
    }

    server.log.info('Attaching routes...');
    try {
        setupMetaRoutes(server);
        require('@local/features/accounts/account');
        require('@local/features/events/moderation/issue-guide');
        require('@local/features/google/google-meet');
    } catch (error) {
        server.log.error(error);
        server.log.fatal('Failed to attach routes, exiting.');
        process.exit(1);
    }

    server.log.info('Finished server setup.');

    server.listen({ port: parseInt(process.env.PORT), host: process.env.HOST }, (err, address) => {
        if (err) {
            server.log.error(err);
            server.log.fatal('Failed to start server, exiting.');
            process.exit(1);
        } else {
            server.log.info(`Listening on ${address}`);
        }
    });
}
