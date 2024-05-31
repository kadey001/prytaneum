import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useViewerOnlyQuestionCreatedSubscription } from '@local/__generated__/useViewerOnlyQuestionCreatedSubscription.graphql';
import { useEvent } from '../../useEvent';
import { useUser } from '@local/features/accounts';

export const USE_VIEWER_ONLY_CREATED_SUBSCRIPTION = graphql`
    subscription useViewerOnlyQuestionCreatedSubscription(
        $eventId: ID!
        $connections: [ID!]!
        $viewerOnly: Boolean
        $lang: String!
    ) {
        questionCreated(eventId: $eventId, viewerOnly: $viewerOnly) {
            edge @prependEdge(connections: $connections) {
                cursor
                node {
                    id
                    position
                    isVisible
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    ...QuestionStatsFragment
                    refQuestion {
                        ...QuestionQuoteFragment @arguments(lang: $lang)
                    }
                }
            }
        }
    }
`;

export function useViewerOnlyQuestionCreated({ connections }: { connections: string[] }) {
    const { eventId } = useEvent();
    const { user } = useUser();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useViewerOnlyQuestionCreatedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
                viewerOnly: true,
                lang: user?.preferredLang ?? 'EN',
            },
            subscription: USE_VIEWER_ONLY_CREATED_SUBSCRIPTION,
        }),
        [eventId, connections, user?.preferredLang]
    );

    useSubscription<useViewerOnlyQuestionCreatedSubscription>(createdConfig);
}
