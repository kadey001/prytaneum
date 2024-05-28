// Subscription to the topic queue being updated
import { useTopicQueuePushSubscription } from '@local/__generated__/useTopicQueuePushSubscription.graphql';
import React from 'react';
import { useSubscription } from 'react-relay';
import { graphql, GraphQLSubscriptionConfig } from 'relay-runtime';

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
        }),
        [connections, eventId, topic]
    );

    useSubscription<useTopicQueuePushSubscription>(config);
}
