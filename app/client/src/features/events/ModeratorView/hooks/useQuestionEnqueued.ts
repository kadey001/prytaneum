// Subscription to the topic queue being updated
import { useQuestionEnqueuedSubscription } from '@local/__generated__/useQuestionEnqueuedSubscription.graphql';
import React from 'react';
import { useSubscription } from 'react-relay';
import { graphql, GraphQLSubscriptionConfig } from 'relay-runtime';

const USE_QUESTION_ENQUEUED = graphql`
    subscription useQuestionEnqueuedSubscription($eventId: String!, $topic: String!, $connections: [ID!]!) {
        questionEnqueued(eventId: $eventId, topic: $topic) {
            edge {
                node {
                    id @deleteEdge(connections: $connections)
                }
            }
        }
    }
`;

interface Props {
    eventId: string;
    topic: string;
    connections: string[];
}

export function useQuestionEnqueued({ eventId, topic, connections }: Props) {
    const config = React.useMemo<GraphQLSubscriptionConfig<useQuestionEnqueuedSubscription>>(
        () => ({
            subscription: USE_QUESTION_ENQUEUED,
            variables: { eventId, topic, connections },
        }),
        [connections, eventId, topic]
    );

    useSubscription<useQuestionEnqueuedSubscription>(config);
}
