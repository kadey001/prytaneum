import { fromGlobalId } from 'graphql-relay';
import { Prisma, PrismaClient } from '@local/__generated__/prisma';
import { errors, getPreferredLang } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';
import type { CreateQuestion, AlterLike } from '@local/graphql-types';
import axios, { AxiosResponse } from 'axios';
import { detectLanguage, translateText } from '@local/core/utils';

async function createQuestionGuardCheck(userId: string, eventId: string, prisma: PrismaClient) {
    // Verify that user is not muted from asking questions
    const isMutedResult = await prisma.eventParticipant.findUnique({
        where: { eventId_userId: { eventId, userId } },
        select: { isMuted: true },
    });

    if (isMutedResult?.isMuted)
        throw new ProtectedError({
            userMessage: errors.muted,
            internalMessage: `User with id: ${userId} attempted to ask a question while muted.`,
        });
}

type TQuestionProcessingResult = {
    originalLanguage: string;
    questionTranslations: Prisma.JsonObject;
    topics: string[];
    substantive: boolean;
    offensive: boolean;
    relevant: boolean;
};

// Run through ben's algorithm, should still work if the api call fails
async function processQuestion(input: CreateQuestion): Promise<TQuestionProcessingResult> {
    const { question, eventId } = input;

    type ExpectedResponse = {
        question_en: string;
        question_es: string;
        original_lang: string;
        substantive: boolean;
        offensive: boolean;
        relevant: boolean;
        topics: {
            [key: string]: boolean;
        };
    };
    let response: AxiosResponse<ExpectedResponse> | null = null;
    try {
        response = await axios.post(
            process.env.MODERATION_URL,
            {
                stage: 'moderation',
                question: question,
                eventId: eventId,
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        if (!response) throw new Error('No response from moderation service');
    } catch (error) {
        console.error(error);
    }

    // If the api call fails, we will translate and create the question without any moderation data
    if (!response || !response.data) {
        const originalLanguage = await detectLanguage(question);
        const questionTranslations = { EN: '', ES: '' } as Prisma.JsonObject;
        if (originalLanguage === 'es') {
            questionTranslations.ES = question;
            questionTranslations.EN = await translateText(question, 'en');
        } else {
            questionTranslations.EN = question;
            questionTranslations.ES = await translateText(question, 'es');
        }
        console.log('GCloud Translation: ', questionTranslations);
        return {
            originalLanguage,
            questionTranslations,
            topics: [],
            substantive: false,
            offensive: false,
            relevant: false,
        };
    }

    const data = response.data;
    // Get all the topis that are related to the question
    const topics = Object.keys(data.topics).filter((key) => data.topics[key]);

    const questionTranslations = { EN: data.question_en, ES: data.question_es } as Prisma.JsonObject;

    return {
        originalLanguage: data.original_lang,
        questionTranslations,
        topics,
        substantive: data.substantive,
        offensive: data.offensive,
        relevant: data.relevant,
    };
}

/**
 * submit a question, in the future this may plug into an event broker like kafka or redis
 */
export async function createQuestion(userId: string, prisma: PrismaClient, input: CreateQuestion) {
    const { question, refQuestion: globalRefId, isFollowUp, isQuote, eventId } = input;
    const refQuestionId = globalRefId ? fromGlobalId(globalRefId).id : null;

    await createQuestionGuardCheck(userId, eventId, prisma);

    // it's okay to have both false, but both cannot be true
    if (isQuote === isFollowUp && isQuote === true) throw new ProtectedError({ userMessage: errors.invalidArgs });

    const { originalLanguage, questionTranslations, topics, substantive, offensive, relevant } = await processQuestion(
        input
    );

    // Get the topic ids (and ensure they are valid topics in the event)
    const topicIds = await prisma.eventTopic.findMany({
        where: { eventId, topic: { in: topics } },
        select: { id: true },
    });

    const newQuestion = await prisma.eventQuestion.create({
        data: {
            eventId,
            question,
            refQuestionId,
            isFollowUp: isFollowUp || false,
            isQuote: isQuote || false,
            createdById: userId,
            isVisible: true,
            isAsked: false,
            lang: originalLanguage.toUpperCase() || 'EN',
            topics: {
                createMany: { data: topicIds.map(({ id }) => ({ topicId: id })) },
            },
            substantive: substantive || false,
            offensive: offensive || false,
            relevant: relevant || false,
            translations: {
                create: {
                    questionTranslations,
                },
            },
        },
        include: {
            refQuestion: true,
        },
    });
    return { question: newQuestion, topics };
}
/**
 *  Remove a question from an event
 */
export async function updateQuestionVisibility(questionId: string, isVisible: boolean, prisma: PrismaClient) {
    return prisma.eventQuestion.update({
        where: { id: questionId },
        data: {
            isVisible,
        },
    });
}

/**
 * alters a like on a question question
 */
export async function alterLikeByQuestionId(userId: string, prisma: PrismaClient, input: AlterLike) {
    // unpack and rename
    const { to: likeQuestion, questionId } = input;

    // helper functions
    const addLike = () => prisma.eventQuestionLike.create({ data: { likedBy: userId, likedQuestion: questionId } });
    const removeLike = () =>
        prisma.eventQuestionLike.delete({
            where: { likedBy_likedQuestion: { likedBy: userId, likedQuestion: questionId } },
        });

    // perform the create or delete
    const results = likeQuestion ? await addLike() : await removeLike();

    if (results) return prisma.eventQuestion.findUnique({ where: { id: questionId } });
    return null;
}

/**
 * Filter function for event questions
 */
export async function doesEventMatch(eventId: string, questionId: string, prisma: PrismaClient) {
    // see if the event id matches the liked question
    const found = await prisma.eventQuestion.findFirst({
        where: { eventId, id: questionId },
        select: { id: true },
    });

    return Boolean(found);
}

/**
 * Find all questions relevant to the given event id
 */
export function findQuestionsByEventId(eventId: string, prisma: PrismaClient) {
    return prisma.eventQuestion.findMany({ where: { eventId } });
}

/**
 * find the submitter of a particular question
 */
export async function findSubmitterByQuestionId(questionId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventQuestion.findUnique({
        where: { id: questionId },
        select: { createdByUser: true },
    });
    if (!queryResult) return null;
    return queryResult.createdByUser;
}

/**
 * find the referenced question
 */
export async function findRefQuestion(questionId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventQuestion.findUnique({
        where: { id: questionId },
        select: { refQuestion: true },
    });
    if (!queryResult || !queryResult.refQuestion) return null;
    return queryResult.refQuestion;
}

/**
 * find the number of likes
 */
export async function countLikes(questionId: string, prisma: PrismaClient) {
    return prisma.eventQuestionLike.count({ where: { likedQuestion: questionId } });
}

/**
 * find the users who liked the question
 */
export async function findLikedByUsers(questionId: string, prisma: PrismaClient) {
    const likeResults = await prisma.eventQuestionLike.findMany({
        where: { likedQuestion: questionId },
        select: { user: true },
    });

    // format results and return
    return likeResults.map(({ user }) => user);
}

/**
 * is the question liked by the current user
 */
export async function isLikedByViewer(userId: string, questionId: string, prisma: PrismaClient) {
    const result = await prisma.eventQuestionLike.findUnique({
        where: { likedBy_likedQuestion: { likedBy: userId, likedQuestion: questionId } },
    });
    return Boolean(result);
}

export async function isMyQuestion(userId: string, questionId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventQuestion.findFirst({
        where: { createdById: userId, id: questionId },
        select: { id: true },
    });
    return Boolean(queryResult);
}

export async function isEnqueued(questionId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventQuestion.findFirst({
        where: { id: questionId },
        select: { position: true },
    });
    if (!queryResult)
        throw new ProtectedError({
            userMessage: ProtectedError.internalServerErrorMessage,
            internalMessage: `Could not find a question with id ${questionId}.`,
        });
    return parseInt(queryResult.position) !== -1;
}

export async function findTopicsByQuestionId(questionId: string, prisma: PrismaClient) {
    const queryResult = await prisma.eventQuestion.findUnique({
        where: { id: questionId },
        select: {
            topics: {
                select: {
                    topic: {
                        select: { topic: true, description: true, id: true, eventId: true },
                    },
                    position: true,
                },
            },
        },
    });
    if (!queryResult) return [];
    const topics = queryResult.topics.map(({ topic, position }) => {
        return { id: topic.id, eventId: topic.eventId, topic: topic.topic, description: topic.description, position };
    });
    return topics || [];
}

export async function getQuestionById(questionId: string, prisma: PrismaClient) {
    const result = await prisma.eventQuestion.findUnique({ where: { id: questionId }, select: { question: true } });
    return result?.question ?? 'No question found';
}

export async function getTranslatedQuestion(
    viewerId: string | null,
    questionId: string,
    prisma: PrismaClient,
    lang?: string
): Promise<{ question: string; originalLang: string }> {
    const preferredLang = lang ?? (await getPreferredLang(viewerId, prisma));
    const result = await prisma.eventQuestion.findUnique({
        where: { id: questionId },
        include: { translations: true },
    });
    // console.log('Translated Question Result: ', result);
    if (!result) throw new ProtectedError({ userMessage: 'Question not found' });

    let translatedQuestion = { question: result.question, originalLang: result.lang };
    const translationsObject = result.translations?.questionTranslations as Prisma.JsonObject | undefined;
    if (!translationsObject) return translatedQuestion;

    const translation = translationsObject[preferredLang.toUpperCase()] as string | undefined;
    if (!translation) return translatedQuestion;

    translatedQuestion.question = translation;
    // console.log('Translated Question: ', translatedQuestion);
    return translatedQuestion;
}
