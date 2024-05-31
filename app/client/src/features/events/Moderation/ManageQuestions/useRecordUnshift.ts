import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useRecordUnshiftSubscription } from '@local/__generated__/useRecordUnshiftSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { useUser } from '@local/features/accounts';

export const USE_RECORD_UNSHIFT_SUBSCRIPTION = graphql`
    subscription useRecordUnshiftSubscription($eventId: ID!, $connections: [ID!]!, $lang: String!) {
        recordUnshiftQuestion(eventId: $eventId) {
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

export function useRecordUnshift({ connection }: { connection: string }) {
    const { eventId } = useEvent();
    const { user } = useUser();

    const recordUnshiftConfig = React.useMemo<GraphQLSubscriptionConfig<useRecordUnshiftSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: [connection],
                lang: user?.preferredLang ?? 'EN',
            },
            subscription: USE_RECORD_UNSHIFT_SUBSCRIPTION,
        }),
        [connection, eventId, user?.preferredLang]
    );
    useSubscription<useRecordUnshiftSubscription>(recordUnshiftConfig);
}
