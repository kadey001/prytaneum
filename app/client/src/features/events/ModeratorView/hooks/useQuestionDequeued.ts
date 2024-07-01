import { useUser } from '@local/features/accounts';
import { useQuestionDequeuedSubscription } from '@local/__generated__/useQuestionDequeuedSubscription.graphql';
import React from 'react';
import { useSubscription } from 'react-relay';
import { ConnectionHandler, graphql, GraphQLSubscriptionConfig } from 'relay-runtime';
import { useEvent } from '../../useEvent';

const USE_QUESTION_DEQUEUED = graphql`
    subscription useQuestionDequeuedSubscription($eventId: ID!, $lang: String!) {
        questionDequeued(eventId: $eventId) {
            edge {
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
                cursor
            }
        }
    }
`;

export function useQuestionDequeued() {
    const { user } = useUser();
    const { eventId } = useEvent();

    const config = React.useMemo<GraphQLSubscriptionConfig<useQuestionDequeuedSubscription>>(
        () => ({
            subscription: USE_QUESTION_DEQUEUED,
            variables: { eventId, lang: user?.preferredLang ?? 'EN' },
            updater: (store) => {
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Update failed: Event record not found!');
                // Update all the proper topic lists with the new question (default, and the question's topics)

                const payload = store.getRootField('questionDequeued');
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
                ConnectionHandler.insertEdgeAfter(connectionRecord, serverEdge);

                // Update the topic lists that are in the question's topics
                topicNames.forEach((_topic) => {
                    const _connectionId = questionsByTopicConnection + `(topic:"${_topic}")`;
                    const _connectionRecord = store.get(_connectionId);
                    if (!_connectionRecord)
                        return console.error(`Update failed: Connection record ${_connectionId} not found!`);
                    ConnectionHandler.insertEdgeAfter(_connectionRecord, serverEdge);
                });
            },
        }),
        [eventId, user?.preferredLang]
    );

    useSubscription<useQuestionDequeuedSubscription>(config);
}
