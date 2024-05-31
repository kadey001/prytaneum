import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useEnqueuedPushSubscription } from '@local/__generated__/useEnqueuedPushSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { useUser } from '@local/features/accounts';

export const USE_ENQUEUED_PUSH_SUBSCRIPTION = graphql`
    subscription useEnqueuedPushSubscription($eventId: ID!, $connections: [ID!]!, $lang: String!) {
        enqueuedPushQuestion(eventId: $eventId) {
            edge @appendEdge(connections: $connections) {
                node {
                    id
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    position
                    onDeckPosition
                    topics {
                        topic
                        description
                        position
                    }
                }
                cursor
            }
        }
    }
`;

export function useEnqueuedPush({ connection }: { connection: string }) {
    const { eventId } = useEvent();
    const { user } = useUser();

    const enqueuedPushConfig = React.useMemo<GraphQLSubscriptionConfig<useEnqueuedPushSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: [connection],
                lang: user?.preferredLang ?? 'EN',
            },
            subscription: USE_ENQUEUED_PUSH_SUBSCRIPTION,
        }),
        [eventId, connection, user?.preferredLang]
    );

    useSubscription<useEnqueuedPushSubscription>(enqueuedPushConfig);
}
