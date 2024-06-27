// Subscription to the topic queue being updated
import { useQuestionEnqueuedSubscription } from '@local/__generated__/useQuestionEnqueuedSubscription.graphql';
import React from 'react';
import { useSubscription } from 'react-relay';
import { ConnectionHandler, graphql, GraphQLSubscriptionConfig } from 'relay-runtime';
import { useEvent } from '../../useEvent';
import { useTopic } from '../useTopic';

const USE_QUESTION_ENQUEUED = graphql`
    subscription useQuestionEnqueuedSubscription($eventId: String!) {
        questionEnqueued(eventId: $eventId) {
            edge {
                node {
                    id
                }
            }
        }
    }
`;

export function useQuestionEnqueued() {
    const { eventId } = useEvent();
    const { topics } = useTopic();

    const config = React.useMemo<GraphQLSubscriptionConfig<useQuestionEnqueuedSubscription>>(
        () => ({
            subscription: USE_QUESTION_ENQUEUED,
            variables: { eventId },
            updater: (store) => {
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Update failed: Event record not found!');

                const payload = store.getRootField('questionEnqueued');
                if (!payload) return console.error('Update failed: No payload found!');
                const serverEdge = payload.getLinkedRecord('edge');
                if (!serverEdge) return console.error('Update failed: No edge found!');
                const node = serverEdge.getLinkedRecord('node');
                if (!node) return console.error('Update failed: No node found!');
                const nodeId = node.getValue('id') as string;

                // Always delete from default list
                const questionsByTopicConnection = ConnectionHandler.getConnectionID(
                    eventRecord.getDataID(),
                    'useQuestionsByTopicFragment_questionsByTopic'
                );
                const connectionId = questionsByTopicConnection + '(topic:"default")';
                const connectionRecord = store.get(connectionId);
                if (!connectionRecord)
                    return console.error(`Update failed: Connection record ${connectionId} not found!`);
                ConnectionHandler.deleteNode(connectionRecord, nodeId);

                // Delete from all topic lists
                topics.forEach(({ topic }) => {
                    const _connectionId = questionsByTopicConnection + `(topic:"${topic}")`;
                    const _connectionRecord = store.get(_connectionId);
                    if (!_connectionRecord)
                        return console.error(`Update failed: Connection record ${_connectionId} not found!`);
                    ConnectionHandler.deleteNode(_connectionRecord, nodeId);
                });
            },
        }),
        [eventId, topics]
    );

    useSubscription<useQuestionEnqueuedSubscription>(config);
}
