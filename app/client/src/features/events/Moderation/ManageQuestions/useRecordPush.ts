import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useRecordPushSubscription } from '@local/__generated__/useRecordPushSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { useUser } from '@local/features/accounts';

export const RECORD_PUSH_CONFIG = graphql`
    subscription useRecordPushSubscription($eventId: ID!, $connections: [ID!]!, $lang: String!) {
        recordPushQuestion(eventId: $eventId) {
            edge @appendEdge(connections: $connections) {
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

export function useRecordPush({ connection }: { connection: string }) {
    const { eventId } = useEvent();
    const { user } = useUser();

    const recordPushConfig = React.useMemo<GraphQLSubscriptionConfig<useRecordPushSubscription>>(
        () => ({
            variables: {
                eventId,
                connections: [connection],
                lang: user?.preferredLang ?? 'EN',
            },
            subscription: RECORD_PUSH_CONFIG,
        }),
        [eventId, connection, user?.preferredLang]
    );
    useSubscription<useRecordPushSubscription>(recordPushConfig);
}
