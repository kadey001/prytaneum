import { fromGlobalId } from 'graphql-relay';

import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient, getRedisClient } from '@local/core/utils';
import axios, { AxiosError } from 'axios';
import {
    getAccessTokenByUserId,
    getOrCreateGoogleOAuthClient,
    validateRefreshToken,
} from '@local/core/utils/google-auth';

const server = getOrCreateServer();

// Create a auth url for Google OAuth 2.0 authentication with Google Meet API scopes
server.route({
    method: 'POST',
    url: '/api/auth/meet',
    handler: async (req, res) => {
        const body = req.body as { userId: string; postAuthRedirectUrl: string };
        const { id: userId } = fromGlobalId(body.userId);

        const state = JSON.stringify({ userId, postAuthRedirectUrl: body.postAuthRedirectUrl });

        const redis = getRedisClient(server.log);
        const REDIS_EXPIRATION = 60 * 5; // 5 minutes expiration in seconds
        await redis.set(`${userId}-state`, state, 'EX', REDIS_EXPIRATION);

        const googleAuthClient = getOrCreateGoogleOAuthClient();

        // Scopes for Google Meet API
        const SCOPES = [
            'https://www.googleapis.com/auth/meetings.space.created',
            'https://www.googleapis.com/auth/meetings.space.readonly',
        ];

        const url = googleAuthClient.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
            state: state,
            prompt: 'consent', // TODO: Remove for production?
        });

        res.status(200).send(JSON.stringify({ url }));
    },
});

server.route({
    method: 'POST',
    url: '/api/auth/meet/check',
    handler: async (req, res) => {
        const body = req.body as { userId: string };
        const { id: userId } = fromGlobalId(body.userId);

        const prisma = getPrismaClient(server.log);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { oAuthRefreshToken: true },
        });

        if (!user || !user.oAuthRefreshToken) {
            return res.status(400).send('User not found or not authenticated');
        }

        const refreshTokenValid = await validateRefreshToken(user.oAuthRefreshToken);
        if (!refreshTokenValid) {
            return res.status(400).send('Refresh token invalid or expired');
        }

        res.status(200).send('Authenticated');
    },
});

// TODO: Add all event moderators emails to the Google Meet space as moderators
// TODO: Add options when creating the Google Meet space
server.route({
    method: 'POST',
    url: '/api/google-meet/create',
    handler: async (req, res) => {
        const body = req.body as { userId: string; eventId: string };
        const { id: userId } = fromGlobalId(body.userId);
        const { id: eventId } = fromGlobalId(body.eventId);

        const prisma = getPrismaClient(server.log);

        try {
            console.log('Creating Google Meet space for event:', eventId);
            const accessToken = await getAccessTokenByUserId(userId);

            const result = await axios.post(
                'https://meet.googleapis.com/v2beta/spaces',
                {
                    config: {
                        accessType: 'OPEN',
                        entryPointAccess: 'ALL',
                        moderation: 'ON',
                        moderationRestrictions: {
                            chatRestriction: 'HOSTS_ONLY',
                            reactionRestriction: 'HOSTS_ONLY',
                            presentRestriction: 'NO_RESTRICTION',
                            defaultJoinAsViewerType: 'ON',
                        },
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            type CreateMeetResponseData = { name: string; meetingUri: string; meetingCode: string };
            const { name, meetingUri, meetingCode } = result.data as CreateMeetResponseData;

            await prisma.event.update({
                where: { id: eventId },
                data: {
                    googleMeetUrl: meetingUri,
                },
            });

            res.status(200).send(JSON.stringify({ name, meetingUri, meetingCode }));
        } catch (error) {
            server.log.error(error);
            if (error instanceof Error) return res.status(400).send(error.message);
            if (error instanceof AxiosError) return res.status(error.status ?? 402).send(error.message);
            return res.status(500).send('An unexpected error occurred');
        }
    },
});
