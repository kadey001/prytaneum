// Subscription to the topic queue being updated
import { useTopicQueuePushSubscription } from '@local/__generated__/useTopicQueuePushSubscription.graphql';
import React from 'react';
import { useSubscription } from 'react-relay';
import { ConnectionHandler, graphql, GraphQLSubscriptionConfig } from 'relay-runtime';

const USE_TOPIC_QUEUE_PUSH = graphql`
    subscription useTopicQueuePushSubscription($eventId: String!, $topic: String!, $connections: [ID!]!) {
        topicQueuePush(eventId: $eventId, topic: $topic) {
            edge @appendEdge(connections: $connections) {
                node {
                    id
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment
                    topics {
                        topic
                        position
                    }
                    position
                    onDeckPosition
                }
                cursor
            }
        }
    }
`;

interface Props {
    eventId: string;
    topic: string;
    connections: string[];
}

export function useTopicQueuePush({ eventId, topic, connections }: Props) {
    const config = React.useMemo<GraphQLSubscriptionConfig<useTopicQueuePushSubscription>>(
        () => ({
            subscription: USE_TOPIC_QUEUE_PUSH,
            variables: { eventId, topic, connections },
            updater: (store) => {
                // Remove the question from the current question list by topic
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Event Record not found');
                const connection = ConnectionHandler.getConnectionID(
                    eventRecord.getDataID(),
                    'useQuestionsByTopicFragment_questions'
                );
                // Need to do this workaround because the compiler in current version doesn't allow correctly naming the connection with _connection at the end.
                const connectionId = connection + `(topic:"${topic}")`;
                const connectionRecord = store.get(connectionId);
                if (!connectionRecord) return console.error('Update failed: Connection record not found!');
                const payload = store.getRootField('topicQueuePush');
                if (!payload) return console.error('Update failed: No payload found!');
                const serverEdge = payload.getLinkedRecord('edge');
                if (!serverEdge) return console.error('Update failed: No edge found!');
                const questionId = serverEdge.getLinkedRecord('node').getValue('id');
                ConnectionHandler.deleteNode(connectionRecord, questionId);
            },
        }),
        [connections, eventId, topic]
    );

    useSubscription<useTopicQueuePushSubscription>(config);
}
