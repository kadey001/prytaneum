import type { PrismaClient, User } from '@local/__generated__/prisma';
import { ProtectedError } from '../../../lib/ProtectedError';

export async function getByEvent(prisma: PrismaClient, eventId: string): Promise<{ user: User; isMuted: boolean }[]> {
    const SIXTY_SECONDS = 1000 * 60;
    const result = await prisma.eventParticipant.findMany({
        where: { eventId, lastPingTime: { gte: new Date(Date.now() - SIXTY_SECONDS) } },
        select: { user: true, isMuted: true },
        orderBy: { user: { firstName: 'asc' } },
    });
    return result;
}

export async function joinOrPingEvent(prisma: PrismaClient, eventId: string, userId: string): Promise<void> {
    try {
        // Check if user is already in event
        const result = await prisma.eventParticipant.findUnique({
            where: {
                eventId_userId: {
                    eventId,
                    userId,
                },
            },
        });
        if (result) {
            // Already in event, update ping time
            await prisma.eventParticipant.update({
                where: {
                    eventId_userId: {
                        eventId,
                        userId,
                    },
                },
                data: {
                    lastPingTime: new Date(),
                },
            });
            return;
        }
        // Not yet in event
        await prisma.eventParticipant.create({
            data: {
                eventId,
                userId,
                lastPingTime: new Date(),
            },
        });
    } catch (e) {
        console.error(e);
        throw new ProtectedError({ userMessage: 'Already Joined Event' });
    }
}

export async function leaveEvent(prisma: PrismaClient, eventId: string, userId: string): Promise<void> {
    try {
        // Since we check for pings in the last 5 mins for active participants,
        // we can adjust the last ping time to 6 mins ago to remove the user from the active list
        const now = new Date();
        const SIX_MINUTES = 1000 * 60 * 6;

        // We do not want to delete the participant, as we want to keep their mute status and any other data
        await prisma.eventParticipant.update({
            where: {
                eventId_userId: {
                    eventId,
                    userId,
                },
            },
            data: {
                lastPingTime: new Date(now.getTime() - SIX_MINUTES),
            },
        });
    } catch (e) {
        console.error(e);
        // no need to throw a protected error here, as when a user is leaving an event they are likely closing the page and won't see/need the error message
        // Worst case the participant will be removed from the participants list after the expiration time
    }
}

// TODO: Add purge messages option
export async function muteParticipant(
    prisma: PrismaClient,
    eventId: string,
    userId: string,
    viewerId: string
    // purgeMessages: boolean
): Promise<void> {
    try {
        // Validate that the viewer has permission to mute
        const isModerator = await prisma.eventModerator.findUnique({
            where: {
                eventId_userId: {
                    eventId,
                    userId: viewerId,
                },
            },
        });
        if (!isModerator) throw new ProtectedError({ userMessage: 'Insufficient permissions to mute users.' });
        await prisma.eventParticipant.update({
            where: {
                eventId_userId: {
                    eventId,
                    userId,
                },
            },
            data: {
                isMuted: true,
            },
        });
        // Hide all of the user's messages
        await prisma.eventQuestion.updateMany({
            where: {
                eventId,
                createdById: userId,
            },
            data: {
                isVisible: false,
            },
        });
    } catch (e) {
        console.error(e);
        throw new ProtectedError({
            userMessage: 'An unexpected error occured while attempting to mute. Please try again later.',
        });
    }
}

export async function unmuteParticipant(
    prisma: PrismaClient,
    eventId: string,
    userId: string,
    viewerId: string
): Promise<void> {
    try {
        // Validate that the viewer has permission to mute
        const isModerator = await prisma.eventModerator.findUnique({
            where: {
                eventId_userId: {
                    eventId,
                    userId: viewerId,
                },
            },
        });
        if (!isModerator) throw new ProtectedError({ userMessage: 'Insufficient permissions to unmute users.' });
        await prisma.eventParticipant.update({
            where: {
                eventId_userId: {
                    eventId,
                    userId,
                },
            },
            data: {
                isMuted: false,
            },
        });
    } catch (e) {
        console.error(e);
        throw new ProtectedError({
            userMessage: 'An unexpected error occured while attempting to unmute. Please try again later.',
        });
    }
}
