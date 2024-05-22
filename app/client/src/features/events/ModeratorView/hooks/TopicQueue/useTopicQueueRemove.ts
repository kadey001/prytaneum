// Subscription to the topic queue being updated
import { useTopicQueueRemoveSubscription } from '@local/__generated__/useTopicQueueRemoveSubscription.graphql';
import React from 'react';
import { useSubscription } from 'react-relay';
import { ConnectionHandler, graphql, GraphQLSubscriptionConfig } from 'relay-runtime';

const USE_TOPIC_QUEUE_REMOVE = graphql`
    subscription useTopicQueueRemoveSubscription($eventId: String!, $topic: String!, $connections: [ID!]!) {
        topicQueueRemove(eventId: $eventId, topic: $topic) {
            edge {
                node {
                    id @deleteEdge(connections: $connections)
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

export function useTopicQueueRemove({ eventId, topic, connections }: Props) {
    const config = React.useMemo<GraphQLSubscriptionConfig<useTopicQueueRemoveSubscription>>(
        () => ({
            subscription: USE_TOPIC_QUEUE_REMOVE,
            variables: { eventId, topic, connections },
            // This updater should fix the unexpected behavior where sometimes the question list subscription isn't updating it.
            // This is a workaround until we can figure out why the subscription isn't updating the list consistantly.
            updater: (store) => {
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Update failed: Event record not found!');
                // Ensure that the question is added back to the question list
                const questionsByTopicConnection = ConnectionHandler.getConnectionID(
                    eventRecord.getDataID(),
                    'useQuestionsByTopicFragment_questions'
                );
                const questionsByTopicConnectionId = questionsByTopicConnection + `(topic:"${topic}")`;
                const questionsByTopicConnectionRecord = store.get(questionsByTopicConnectionId);
                if (!questionsByTopicConnectionRecord)
                    return console.error('Update failed: Connection record not found!');
                const payload = store.getRootField('topicQueueRemove');
                if (!payload) return console.error('Update failed: No payload found!');
                const serverEdge = payload.getLinkedRecord('edge');
                // Check if the question has already been added back to the question list
                // Need to do this or it can create duplicates when the question list subscription did receive the update
                // const questionId = serverEdge.getLinkedRecord('node').getValue('id');
                // const questionAlreadyExists = store.get(questionId);
                // if (questionAlreadyExists) {
                //     return console.error('Update failed: Question already exists!');
                // }
                if (!serverEdge) return console.error('Update failed: No edge found!');
                ConnectionHandler.insertEdgeAfter(questionsByTopicConnectionRecord, serverEdge);
            },
        }),
        [eventId, topic, connections]
    );

    useSubscription<useTopicQueueRemoveSubscription>(config);
}
