import { useUser } from '@local/features/accounts';
import { useQuestionDequeuedSubscription } from '@local/__generated__/useQuestionDequeuedSubscription.graphql';
import React from 'react';
import { useSubscription } from 'react-relay';
import { graphql, GraphQLSubscriptionConfig } from 'relay-runtime';

const USE_QUESTION_DEQUEUED = graphql`
    subscription useQuestionDequeuedSubscription(
        $eventId: String!
        $topic: String!
        $connections: [ID!]!
        $lang: String!
    ) {
        questionDequeued(eventId: $eventId, topic: $topic) {
            edge @appendEdge(connections: $connections) {
                node {
                    id
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
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

export function useQuestionDequeued({ eventId, topic, connections }: Props) {
    const { user } = useUser();

    const config = React.useMemo<GraphQLSubscriptionConfig<useQuestionDequeuedSubscription>>(
        () => ({
            subscription: USE_QUESTION_DEQUEUED,
            variables: { eventId, topic, connections, lang: user?.preferredLang ?? 'EN' },
        }),
        [connections, eventId, topic, user?.preferredLang]
    );

    useSubscription<useQuestionDequeuedSubscription>(config);
}
