import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useEnqueuedUnshiftSubscription } from '@local/__generated__/useEnqueuedUnshiftSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { useUser } from '../../../accounts/useUser';

export const USE_ENQUEUED_UNSHIFT_SUBSCRIPTION = graphql`
    subscription useEnqueuedUnshiftSubscription($eventId: ID!, $connections: [ID!]!, $lang: String!) {
        enqueuedUnshiftQuestion(eventId: $eventId) {
            edge @prependEdge(connections: $connections) {
                node {
                    id
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    position
                }
                cursor
            }
        }
    }
`;

export function useEnqueuedUnshift({ connection }: { connection: string }) {
    const { eventId } = useEvent();
    const { user } = useUser();

    const enqueuedUnshiftConfig = React.useMemo<GraphQLSubscriptionConfig<useEnqueuedUnshiftSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: [connection],
                lang: user?.preferredLang ?? 'EN',
            },
            subscription: USE_ENQUEUED_UNSHIFT_SUBSCRIPTION,
        }),
        [connection, eventId, user?.preferredLang]
    );
    useSubscription<useEnqueuedUnshiftSubscription>(enqueuedUnshiftConfig);
}
