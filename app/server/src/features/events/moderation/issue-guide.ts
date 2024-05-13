import type { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs';
import path from 'path';
import multer from 'fastify-multer';
import { v4 as uuid } from 'uuid';

import { getOrCreateServer } from '@local/core/server';
import { uploadFile, getPrismaClient, extractAuthenticationJwt } from '@local/core/utils';
import { fromGlobalId } from 'graphql-relay';

const server = getOrCreateServer();
const downloadPath = path.join(__dirname, '..', '..', '..', '..', 'downloads');

// Multer setup
const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath);
        }
        cb(null, downloadPath);
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});

// eslint-disable-next-line @typescript-eslint/ban-types
const fileFilter = (req: unknown, file: any, cb: any) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // Accept
    } else {
        cb(new Error('Invalid File')); // Reject
    }
};

const multerStorage = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10 MB limit
    },
    fileFilter,
});

interface FastifyMulterRequest extends FastifyRequest {
    file?: Express.Multer.File;
}

server.route({
    method: 'POST',
    url: '/graphql/set-issue-guide-url',
    handler: async (req: FastifyRequest, reply: FastifyReply) => {
        const prisma = getPrismaClient(server.log);
        const body = JSON.parse(req.body as string);

        try {
            let viewerId = await extractAuthenticationJwt(req).catch(() => reply.clearCookie('jwt').send());
            if (viewerId) {
                const { id } = fromGlobalId(viewerId);
                viewerId = id;
            }
            if (!viewerId) throw new Error('Must be authenticated to invite users.');

            const { eventId, url } = body as { eventId?: string; url?: string };
            if (!eventId) throw new Error('Event ID not provided.');
            if (url === undefined) throw new Error('Issue guide URL not provided.');
            const { id: eventGlobalId } = fromGlobalId(eventId);

            await prisma.event.update({
                where: { id: eventGlobalId },
                data: {
                    issueGuideUrl: url,
                },
            });

            reply.code(200).send({ message: 'Issue guide URL set successfully.' });
        } catch (error: any) {
            server.log.error(error);
            reply.code(500).send({ message: error instanceof Error ? error.message : 'An unknown error occurred.' });
        }
    },
});

server.route({
    method: 'POST',
    url: '/graphql/upload-issue-guide',
    preHandler: multerStorage.single('issue-guide'),
    handler: async (req: FastifyMulterRequest, reply: FastifyReply) => {
        const prisma = getPrismaClient(server.log);
        const { file, body } = req;

        try {
            let viewerId = await extractAuthenticationJwt(req).catch(() => reply.clearCookie('jwt').send());
            if (viewerId) {
                const { id } = fromGlobalId(viewerId);
                viewerId = id;
            }
            const { eventId } = body as { eventId?: string };
            if (!eventId) throw new Error('Event ID not provided.');
            const { id: eventGlobalId } = fromGlobalId(eventId);

            if (!viewerId) throw new Error('Must be authenticated to invite users.');
            if (!file) {
                server.log.error('File undefined');
                throw new Error('The uploaded file could not be read.');
            }

            const bucketName = process.env.GCLOUD_READING_MATERIALS_STORAGE_BUCKET;
            const { filename, path: filePath } = file;

            const generatedFileName = `${uuid()}-${filename}`;

            const result = await uploadFile({ filePath, destFileName: generatedFileName, bucketName });
            if (!result || !result[0]?.metadata?.mediaLink)
                throw new Error('An unexpected error occurred while uploading, try again later');
            const { mediaLink } = result[0].metadata;
            server.log.info(`File uploaded with url: ${mediaLink}`);

            await prisma.event.update({
                where: { id: eventGlobalId },
                data: {
                    issueGuideUrl: mediaLink,
                },
            });

            reply.code(200).send({ message: 'File uploaded successfully.', generatedFileName });
        } catch (error: any) {
            console.log(error, typeof error);
            if (error instanceof Error) server.log.error(error);
            if (error?.code === 403) {
                if (error?.errors[0]?.reason === 'retentionPolicyNotMet') {
                    reply.code(403).send({ message: 'This file has already been uploaded.' });
                    return;
                }
            }

            if (file && fs.existsSync(file.path)) {
                // Remove file after use
                fs.unlink(file.path, (err) => {
                    if (err) server.log.error(err);
                });
            }

            reply.code(500).send({ message: error instanceof Error ? error.message : 'An unknown error occurred.' });
        } finally {
            // Cleanup
            if (file && fs.existsSync(file.path)) {
                // Remove file after use
                fs.unlink(file.path, (err) => {
                    if (err) server.log.error(err);
                });
            }
        }
    },
});
