import { fromGlobalId } from 'graphql-relay';
import { PrismaClient } from '@local/__generated__/prisma';
import { errors } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';
import type { CreateQuestion, AlterLike } from '@local/graphql-types';
import axios, { AxiosResponse } from 'axios';

/**
 * submit a question, in the future this may plug into an event broker like kafka or redis
 */
export async function createQuestion(userId: string, prisma: PrismaClient, input: CreateQuestion) {
    const { question, refQuestion: globalRefId, isFollowUp, isQuote, eventId } = input;
    const refQuestionId = globalRefId ? fromGlobalId(globalRefId).id : null;

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

    // it's okay to have both false, but both cannot be true
    if (isQuote === isFollowUp && isQuote === true) throw new ProtectedError({ userMessage: errors.invalidArgs });

    // Run through ben's algorithm
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
        throw new ProtectedError({
            userMessage: 'Unable to process question, please try again.',
            internalMessage: error instanceof Error ? error.message : `Error processing question: ${question}`,
        });
    }

    const data = response.data;
    // Get all the topis that are related to the question
    const topics = Object.keys(data.topics).filter((key) => data.topics[key]);
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
            lang: 'EN', // TODO:
            topics: {
                createMany: { data: topicIds.map(({ id }) => ({ topicId: id })) },
            },
            substantive: data.substantive || false,
            offensive: data.offensive || false,
            relevant: data.relevant || false,
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
