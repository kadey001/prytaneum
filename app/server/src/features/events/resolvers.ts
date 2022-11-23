/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectionFromArray, fromGlobalId } from 'graphql-relay';
import * as Event from './methods';
import { Resolvers, toGlobalId, errors, runMutation, withFilter } from '@local/features/utils';
import { ProtectedError } from '@local/lib/ProtectedError';
import type { Event as TEvent, EventQuestion } from '@local/graphql-types';

const toEventId = toGlobalId('Event');
const toUserId = toGlobalId('User');
const toVideoId = toGlobalId('EventVideo');
const toQuestionId = toGlobalId('EventQuestion');
const toSpeakerId = toGlobalId('EventSpeaker');
const toOrgId = toGlobalId('Organization');
const toFeedbackId = toGlobalId('EventLiveFeedback');

export const resolvers: Resolvers = {
    Query: {
        async events(parent, args, ctx, info) {
            const foundEvents = await Event.findPublicEvents(ctx.prisma);
            return foundEvents.map(toEventId);
        },
        // async isEventPrivate(parent, args, ctx, info) {
        //     const isPrivateEvent = await Event.isEventPrivate(ctx.prisma,{ ...args.event, eventId }, status);
        //     if
        //     return isPrivateEvent.map(toEventId);
        // },
    },
    Mutation: {
        async createEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: orgId } = fromGlobalId(args.event.orgId);
                const createdEvent = await Event.createEvent(ctx.viewer.id, ctx.prisma, {
                    ...args.event,
                    orgId,
                });
                return toEventId(createdEvent);
            });
        },
        async updateEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.event.eventId);
                const updatedEvent = await Event.updateEvent(ctx.viewer.id, ctx.prisma, { ...args.event, eventId });
                const eventWithGlobalId = toEventId(updatedEvent);
                ctx.pubsub.publish({
                    topic: 'eventUpdates',
                    payload: eventWithGlobalId,
                });
                return eventWithGlobalId;
            });
        },
        async deleteEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.event.eventId);
                const deletedEvent = await Event.deleteEvent(ctx.viewer.id, ctx.prisma, { ...args.event, eventId });
                return toEventId(deletedEvent);
            });
        },
        async startEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.eventId);
                const updatedEvent = await Event.changeEventStatus(ctx.viewer.id, ctx.prisma, eventId, true);
                const eventWithGlobalId = toEventId(updatedEvent);
                ctx.pubsub.publish({
                    topic: 'eventUpdates',
                    payload: eventWithGlobalId,
                });
                return eventWithGlobalId;
            });
        },
        async endEvent(parent, args, ctx, info) {
            return runMutation(async () => {
                if (!ctx.viewer.id) throw new ProtectedError({ userMessage: errors.noLogin });
                const { id: eventId } = fromGlobalId(args.eventId);
                const updatedEvent = await Event.changeEventStatus(ctx.viewer.id, ctx.prisma, eventId, false);
                const eventWithGlobalId = toEventId(updatedEvent);
                ctx.pubsub.publish({
                    topic: 'eventUpdates',
                    payload: eventWithGlobalId,
                });
                return eventWithGlobalId;
            });
        },
    },
    Subscription: {
        eventUpdates: {
            subscribe: withFilter<{ eventUpdates: TEvent }>(
                (parent, args, ctx) => ctx.pubsub.subscribe('eventUpdates'),
                (payload, args, ctx) => {
                    const { id: eventId } = fromGlobalId(payload.eventUpdates.id);
                    const { id: argEventId } = fromGlobalId(args.eventId);
                    return eventId === argEventId;
                }
            ),
        },
    },
    Event: {
        async speakers(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const speakers = await Event.findSpeakersByEventId(eventId, ctx.prisma);
            return connectionFromArray(speakers.map(toSpeakerId), args);
        },
        async videos(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const videos = await Event.findVideosByEventId(eventId, ctx.prisma);
            return connectionFromArray(videos.map(toVideoId), args);
        },
        async moderators(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const mods = await Event.findModeratorsByEventId(eventId, ctx.prisma);
            return connectionFromArray(mods.map(toUserId), args);
        },
        async organization(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const org = await Event.findOrgByEventId(eventId, ctx.prisma);
            return toOrgId(org);
        },
        async questions(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const { first, after } = args;
            if (first === undefined || after === undefined)
                throw new ProtectedError({
                    userMessage: 'Unexpected Error Occured',
                    internalMessage: 'first or after is undefined',
                });
            const { id: afterId } = fromGlobalId(after || '');
            const { eventQuestions, hasNextPage, hasPreviousPage } = await Event.findQuestionsByEventIdPagination(
                eventId,
                first as number,
                afterId,
                ctx.prisma
            );
            const formattedEventQuestions = eventQuestions
                .map(toQuestionId)
                .map((question) => ({ node: question, cursor: question.id }));
            const connection = {
                edges: formattedEventQuestions,
                pageInfo: {
                    hasNextPage: hasNextPage,
                    hasPreviousPage: hasPreviousPage,
                    startCursor: formattedEventQuestions[0]?.cursor,
                    endCursor: formattedEventQuestions[formattedEventQuestions.length - 1]?.cursor,
                },
            };
            return connection;
        },
        isViewerModerator(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            return Event.isModerator(ctx.viewer.id, eventId, ctx.prisma);
        },
        async liveFeedback(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const queryResult = await Event.findLiveFeedbackByEventId(eventId, ctx.prisma);
            if (!queryResult) return connectionFromArray([], args);
            const { feedback: liveFeedback } = queryResult;
            const edges = liveFeedback
                .map(toFeedbackId)
                .map((feedback) => ({ node: feedback, cursor: feedback.createdAt.getTime().toString() }));
            // TODO Filter the results if viewer is not a moderator
            return {
                edges,
                pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    startCursor: edges[0]?.cursor,
                    endCursor: edges[liveFeedback.length - 1]?.cursor,
                },
            };
        },
        async questionQueue(parent, args, ctx, info) {
            const { id: eventId } = fromGlobalId(parent.id);
            const queryResult = await Event.findQuestionQueueByEventId(eventId, ctx.prisma);
            const toQuestionEdge = (question: EventQuestion) => ({
                node: question,
                cursor: question.id,
            });
            const makeConnection = <T extends ReturnType<typeof toQuestionEdge>[]>(edges: T) => ({
                edges,
                pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    startCursor: edges[0]?.cursor,
                    endCursor: edges[edges.length - 1]?.cursor,
                },
            });
            if (!queryResult) return null;

            // many ways to do the following, done in similar ways for clarity
            const questionRecordEdges = queryResult.questions
                .filter((question) => question.position <= queryResult.currentQuestion)
                .map(toQuestionId)
                .map(toQuestionEdge);
            const enqueuedQuestionsEdges = queryResult.questions
                .filter((question) => question.position > queryResult.currentQuestion)
                .map(toQuestionId)
                .map(toQuestionEdge);
            return {
                questionRecord: makeConnection(questionRecordEdges),
                enqueuedQuestions: makeConnection(enqueuedQuestionsEdges),
            };
        },
    },
};
