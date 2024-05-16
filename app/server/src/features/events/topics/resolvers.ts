/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolvers, runMutation } from '@local/features/utils';
import { fromGlobalId } from 'graphql-relay';
import * as Topics from './methods';

export const resolvers: Resolvers = {
    Mutation: {
        async generateEventTopics(parent, args, ctx, info) {
            return runMutation(async () => {
                const { eventId, material } = args;
                const { id: globalEventId } = fromGlobalId(eventId);
                return Topics.generateEventTopics(globalEventId, material);
            });
        },
        async regenerateEventTopics(parent, args, ctx, info) {
            return runMutation(async () => {
                const { eventId } = args;
                const { id: globalEventId } = fromGlobalId(eventId);
                return Topics.regenerateEventTopics(globalEventId);
            });
        },
        async addTopic(parent, args, ctx, info) {
            return runMutation(async () => {
                const { eventId, topic, description } = args;
                const { id: globalEventId } = fromGlobalId(eventId);
                await Topics.addTopic(globalEventId, topic, description);
                return { topic, description };
            });
        },
        async updateTopic(parent, args, ctx, info) {
            return runMutation(async () => {
                const { eventId, oldTopic, newTopic, description } = args;
                const { id: globalEventId } = fromGlobalId(eventId);
                await Topics.updateTopic({ eventId, oldTopic, newTopic, description });
                return { topic: newTopic, description };
            });
        },
        async removeTopic(parent, args, ctx, info) {
            return runMutation(async () => {
                const { eventId, topic } = args;
                const { id: globalEventId } = fromGlobalId(eventId);
                await Topics.deleteTopic(globalEventId, topic);
                return { topic };
            });
        },
        async lockTopic(parent, args, ctx, info) {
            return runMutation(async () => {
                const { eventId, topic } = args;
                const { id: globalEventId } = fromGlobalId(eventId);
                await Topics.lockTopic(globalEventId, topic);
                return { topic };
            });
        },
        async unlockTopic(parent, args, ctx, info) {
            return runMutation(async () => {
                const { eventId, topic } = args;
                const { id: globalEventId } = fromGlobalId(eventId);
                await Topics.unlockTopic(globalEventId, topic);
                return { topic };
            });
        },
        async finalizeTopics(parent, args, ctx, info) {
            return runMutation(async () => {
                const { eventId, topics: topicList, descriptions } = args;
                const { id: globalEventId } = fromGlobalId(eventId);
                const topics = topicList.map((topic, index) => ({ topic, description: descriptions[index] }));
                await Topics.finalizeTopics(globalEventId, topics, ctx.prisma);
                return topics.map(({ topic, description }) => ({ topic, description }));
            });
        },
    },
};
