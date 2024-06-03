import { detectLanguage, translateText } from '@local/core/utils';
import { getPreferredLang } from '@local/features/utils';
import { CreateBroadcastMessage } from '@local/graphql-types';
import { Prisma, PrismaClient } from '@local/__generated__/prisma';
import { ProtectedError } from '../../../../../cc2c/src/core/utils';

/**
 * submit a broadcast message
 */
export async function createBroadcastMessage(userId: string, prisma: PrismaClient, input: CreateBroadcastMessage) {
    const { eventId, broadcastMessage } = input;

    const messageLanguage = await detectLanguage(broadcastMessage);

    const translations: Prisma.JsonObject = {};
    translations[messageLanguage.toUpperCase()] = broadcastMessage;
    if (messageLanguage.toUpperCase() !== 'EN') {
        // Translate to English
        translations.EN = await translateText(broadcastMessage, 'en');
    } else {
        translations.ES = await translateText(broadcastMessage, 'es');
    }

    return prisma.eventBroadcastMessage.create({
        data: {
            eventId,
            broadcastMessage: broadcastMessage,
            createdById: userId,
            isVisible: true,
            lang: messageLanguage.toUpperCase(),
            broadcastMessageTranslations: translations,
        },
    });
}

/**
 * edit a broadcast message
 */
export async function editBroadcastMessage(broadcastMessageId: string, broadcastMessage: string, prisma: PrismaClient) {
    return prisma.eventBroadcastMessage.update({
        where: { id: broadcastMessageId },
        data: {
            broadcastMessage: broadcastMessage,
        },
    });
}

/**
 *  Remove a broadcastMessage from an event
 */
export async function updateBroadcastMessageVisibility(
    broadcastMessageId: string,
    isVisible: boolean,
    prisma: PrismaClient
) {
    return prisma.eventBroadcastMessage.update({
        where: { id: broadcastMessageId },
        data: {
            isVisible,
        },
    });
}

/**
 * find the submitter of a particular broadcast message
 */
export async function findSubmitterByBroadcastMessageId(broadcastMessageId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventBroadcastMessage.findUnique({
        where: { id: broadcastMessageId },
        select: { createdByUser: true },
    });
    if (!queryResult) return null;
    return queryResult.createdByUser;
}

/**
 * find broadcastMessages by event id
 */
export async function findBroadcastMessagesByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.eventBroadcastMessage.findMany({
        where: { eventId, isVisible: true },
        orderBy: { createdAt: 'asc' },
    });
}

export async function findTranslatedBroadcastMessage(
    broadcastMessageId: string,
    viewerId: string | null,
    prisma: PrismaClient
) {
    const userLang = await getPreferredLang(viewerId, prisma);
    const result = await prisma.eventBroadcastMessage.findUnique({
        where: { id: broadcastMessageId },
        select: { broadcastMessage: true, broadcastMessageTranslations: true, lang: true },
    });
    if (!result) throw new ProtectedError({ userMessage: 'Broadcast message not found' });

    const { broadcastMessage } = result;
    if (result.lang.toUpperCase() === userLang.toUpperCase()) return broadcastMessage;

    const translationsObject = result.broadcastMessageTranslations as Prisma.JsonObject | undefined;
    if (!translationsObject) return broadcastMessage;

    const translation = translationsObject[userLang.toUpperCase()] as string | undefined;
    return translation || broadcastMessage;
}
