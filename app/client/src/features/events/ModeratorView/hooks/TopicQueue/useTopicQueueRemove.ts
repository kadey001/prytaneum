// Subscription to the topic queue being updated
import { useTopicQueueRemoveSubscription } from '@local/__generated__/useTopicQueueRemoveSubscription.graphql';
import React from 'react';
import { useSubscription } from 'react-relay';
import { graphql, GraphQLSubscriptionConfig } from 'relay-runtime';

const USE_TOPIC_QUEUE_REMOVE = graphql`
    subscription useTopicQueueRemoveSubscription($eventId: String!, $topic: String!, $connections: [ID!]!) {
        topicQueueRemove(eventId: $eventId, topic: $topic) {
            edge {
                node {
                    id @deleteEdge(connections: $connections)
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
        }),
        [eventId, topic, connections]
    );

    useSubscription<useTopicQueueRemoveSubscription>(config);
}
