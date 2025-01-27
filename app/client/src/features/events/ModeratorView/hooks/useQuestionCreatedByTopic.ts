import { useMemo } from 'react';
import { ConnectionHandler, GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useQuestionCreatedByTopicSubscription } from '@local/__generated__/useQuestionCreatedByTopicSubscription.graphql';
import { useEvent } from '../../useEvent';
import { useUser } from '@local/features/accounts';

export const USE_QUESTION_CREATED_SUBSCRIPTION = graphql`
    subscription useQuestionCreatedByTopicSubscription($eventId: ID!, $lang: String!) {
        questionCreatedByTopic(eventId: $eventId) {
            edge {
                cursor
                node {
                    id
                    question
                    position
                    onDeckPosition
                    topics {
                        topic
                        description
                        position
                    }
                    createdBy {
                        firstName
                    }
                    refQuestion {
                        ...QuestionQuoteFragment @arguments(lang: $lang)
                    }
                    ...QuestionActionsFragment @arguments(lang: $lang)
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

// Attempt to filter questions being added to the list by topic
// Should only be added to the lists that are related to the question's topics & default
export function useQuestionCreatedByTopic() {
    const { eventId } = useEvent();
    const { user } = useUser();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useQuestionCreatedByTopicSubscription>>(
        () => ({
            variables: {
                eventId,
                lang: user?.preferredLang ?? 'EN',
            },
            subscription: USE_QUESTION_CREATED_SUBSCRIPTION,
            // Need to use a custom updater because a single asked question can be added to multiple lists by topic
            // This is because a question should always be in the default list along with any topics it is related to
            // This updater ensures that all the connections are updated at the same time so it is in every spot it should be.
            updater: (store) => {
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Update failed: Event record not found!');
                // Update all the proper topic lists with the new question (default, and the question's topics)

                const payload = store.getRootField('questionCreatedByTopic');
                if (!payload) return console.error('Update failed: No payload found!');
                const serverEdge = payload.getLinkedRecord('edge');
                const topics = serverEdge.getLinkedRecord('node').getLinkedRecords('topics');
                const topicNames = topics.map((_topic) => _topic.getValue('topic'));

                // Always update the default topic list
                const questionsByTopicConnection = ConnectionHandler.getConnectionID(
                    eventRecord.getDataID(),
                    'useQuestionsByTopicFragment_questionsByTopic'
                );
                const connectionId = questionsByTopicConnection + '(topic:"default")';
                const connectionRecord = store.get(connectionId);
                if (!connectionRecord)
                    return console.error(`Update failed: Connection record ${connectionId} not found!`);
                ConnectionHandler.insertEdgeBefore(connectionRecord, serverEdge);

                // Update the topic lists that are in the question's topics
                topicNames.forEach((_topic) => {
                    const _connectionId = questionsByTopicConnection + `(topic:"${_topic}")`;
                    const _connectionRecord = store.get(_connectionId);
                    if (!_connectionRecord)
                        return console.error(`Update failed: Connection record ${_connectionId} not found!`);
                    ConnectionHandler.insertEdgeBefore(_connectionRecord, serverEdge);
                });
            },
        }),
        [eventId, user?.preferredLang]
    );

    useSubscription<useQuestionCreatedByTopicSubscription>(createdConfig);
}
