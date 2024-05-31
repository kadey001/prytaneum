import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useQuestionCreatedSubscription } from '@local/__generated__/useQuestionCreatedSubscription.graphql';
import { useEvent } from '../../useEvent';
import { useUser } from '@local/features/accounts';

export const USE_QUESTION_CREATED_SUBSCRIPTION = graphql`
    subscription useQuestionCreatedSubscription($eventId: ID!, $connections: [ID!]!, $lang: String!) {
        questionCreated(eventId: $eventId) {
            edge @prependEdge(connections: $connections) {
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
                    # ...TranslatedQuestionContentFragment @arguments(lang: $lang)
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

export function useQuestionCreated({ connections }: { connections: string[] }) {
    const { eventId } = useEvent();
    const { user } = useUser();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useQuestionCreatedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
                lang: user?.preferredLang ?? 'EN',
            },
            subscription: USE_QUESTION_CREATED_SUBSCRIPTION,
        }),
        [eventId, connections, user?.preferredLang]
    );

    useSubscription<useQuestionCreatedSubscription>(createdConfig);
}
