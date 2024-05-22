import { useQuestionDequeuedSubscription } from '@local/__generated__/useQuestionDequeuedSubscription.graphql';
import React from 'react';
import { useSubscription } from 'react-relay';
import { graphql, GraphQLSubscriptionConfig } from 'relay-runtime';

const USE_QUESTION_DEQUEUED = graphql`
    subscription useQuestionDequeuedSubscription($eventId: String!, $topic: String!, $connections: [ID!]!) {
        questionDequeued(eventId: $eventId, topic: $topic) {
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

export function useQuestionDequeued({ eventId, topic, connections }: Props) {
    const config = React.useMemo<GraphQLSubscriptionConfig<useQuestionDequeuedSubscription>>(
        () => ({
            subscription: USE_QUESTION_DEQUEUED,
            variables: { eventId, topic, connections },
        }),
        [connections, eventId, topic]
    );

    useSubscription<useQuestionDequeuedSubscription>(config);
}
