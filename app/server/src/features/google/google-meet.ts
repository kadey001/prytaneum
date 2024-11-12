import { fromGlobalId } from 'graphql-relay';

import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient, getRedisClient } from '@local/core/utils';
import axios from 'axios';
import { getOrCreateGoogleJWTClient, getOrCreateGoogleOAuthClient } from '@local/core/utils/google-auth';

const server = getOrCreateServer();

const GOOGLE_MEET_SCOPES = [
    'https://www.googleapis.com/auth/meetings.space.created',
    'https://www.googleapis.com/auth/meetings.space.readonly',
];

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

        const url = googleAuthClient.generateAuthUrl({
            access_type: 'offline',
            scope: GOOGLE_MEET_SCOPES,
            state: state,
            prompt: 'consent', // TODO: Remove for production?
        });

        res.status(200).send(JSON.stringify({ url }));
    },
});

server.route({
    method: 'POST',
    url: '/api/google-meet/create',
    handler: async (req, res) => {
        try {
            type ExpectedBody = { userId: string; eventId: string; coHosts?: string[] };
            const body = req.body as ExpectedBody;
            const { id: userId } = fromGlobalId(body.userId);
            const { id: eventId } = fromGlobalId(body.eventId);

            const prisma = getPrismaClient(server.log);

            server.log.info(`Creating Google Meet for event ${eventId} by user ${userId}`);
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { email: true },
            });

            if (!user) throw new Error('User not found');

            const jwtClient = getOrCreateGoogleJWTClient({ scopes: GOOGLE_MEET_SCOPES });
            const { token: accessToken } = await jwtClient.getAccessToken();

            if (!accessToken) throw new Error('Error getting access token');

            const createMeetResult = await axios.post<CreateMeetResponseData>(
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

            if (createMeetResult.status !== 200) {
                throw new Error(`Error creating meeting: ${createMeetResult.statusText}`);
            }

            type CreateMeetResponseData = { name?: string; meetingUri?: string; meetingCode?: string };
            const { name: spaceName, meetingUri, meetingCode } = createMeetResult.data;

            if (!meetingUri || !meetingCode || !spaceName) {
                throw new Error('Error creating meeting');
            }
            await prisma.event.update({
                where: { id: eventId },
                data: {
                    googleMeetUrl: meetingUri,
                    googleMeetSpace: spaceName,
                },
            });

            let coHosts: String[] = [];
            if (body.coHosts) coHosts = body.coHosts;

            // Check if current user is already in the list of coHosts
            if (!coHosts.includes(user.email)) {
                coHosts.push(user.email);
            }

            const promises = coHosts.map((email) =>
                axios.post(
                    `https://meet.googleapis.com/v2beta/${spaceName}/members`,
                    {
                        email,
                        role: 'COHOST',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                )
            );

            const results = await Promise.allSettled(promises);
            const failedCoHosts: String[] = [];

            results.map((promise, idx) => {
                const email = coHosts[idx];
                if (promise.status === 'rejected') {
                    server.log.error(`Error adding user ${email} as CoHost: ${promise.reason}`);
                    failedCoHosts.push(email);
                } else {
                    server.log.info(`Add User ${email} as CoHost: ${promise.status}`);
                }
            });

            res.status(200).send(JSON.stringify({ spaceName, meetingUri, meetingCode, failedCoHosts }));
        } catch (error) {
            server.log.error(error);

            if (error instanceof Error) {
                res.status(400).send({ error: error.message });
            } else if (axios.isAxiosError(error)) {
                res.status(error.response?.status ?? 500).send({ error: error.message });
            } else {
                res.status(500).send({ error: 'An unexpected error occurred' });
            }
        }
    },
});
