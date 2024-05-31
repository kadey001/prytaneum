import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useViewerOnlyQuestionUpdatedSubscription } from '@local/__generated__/useViewerOnlyQuestionUpdatedSubscription.graphql';
import { useEvent } from '../../useEvent';
import { useUser } from '@local/features/accounts';

export const USE_VIEWER_ONLY_QUESTION_UPDATED_SUBSCRIPTION = graphql`
    subscription useViewerOnlyQuestionUpdatedSubscription($eventId: ID!, $viewerOnly: Boolean, $lang: String!) {
        questionUpdated(eventId: $eventId, viewerOnly: $viewerOnly) {
            edge {
                cursor
                node {
                    id
                    position
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

export function useViewerOnlyQuestionUpdated() {
    const { eventId } = useEvent();
    const { user } = useUser();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useViewerOnlyQuestionUpdatedSubscription>>(
        () => ({
            variables: {
                eventId,
                viewerOnly: true,
                lang: user?.preferredLang ?? 'EN',
            },
            subscription: USE_VIEWER_ONLY_QUESTION_UPDATED_SUBSCRIPTION,
        }),
        [eventId, user?.preferredLang]
    );

    useSubscription<useViewerOnlyQuestionUpdatedSubscription>(createdConfig);
}
