import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useBroadcastMessageCreatedSubscription } from '@local/__generated__/useBroadcastMessageCreatedSubscription.graphql';
import { useEvent } from '../../useEvent';
import { useUser } from '@local/features/accounts';

export const USE_BROADCAST_MESSAGE_CREATED_SUBSCRIPTION = graphql`
    subscription useBroadcastMessageCreatedSubscription($eventId: ID!, $connections: [ID!]!, $lang: String!) {
        broadcastMessageCreated(eventId: $eventId) {
            edge @prependEdge(connections: $connections) {
                cursor
                node {
                    id
                    broadcastMessage
                    position
                    isVisible
                    createdBy {
                        firstName
                    }
                    ...BroadcastMessageActionsFragment
                    ...BroadcastMessageAuthorFragment
                    ...BroadcastMessageContentFragment @arguments(lang: $lang)
                }
            }
        }
    }
`;

export function useBroadcastMessageCreated({ connections }: { connections: string[] }) {
    const { eventId } = useEvent();
    const { user } = useUser();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useBroadcastMessageCreatedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
                lang: user?.preferredLang ?? 'EN',
            },
            subscription: USE_BROADCAST_MESSAGE_CREATED_SUBSCRIPTION,
        }),
        [eventId, connections, user?.preferredLang]
    );

    useSubscription<useBroadcastMessageCreatedSubscription>(createdConfig);
}
