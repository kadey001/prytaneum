import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, graphql } from 'react-relay';

import type { useBroadcastMessageCreatedSubscription } from '@local/__generated__/useBroadcastMessageCreatedSubscription.graphql';
import { useEvent } from '../../useEvent';
import { useUser } from '@local/features/accounts';
import { useSnack } from '@local/core';

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
                        id
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
    const { displaySnack } = useSnack();

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useBroadcastMessageCreatedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
                lang: user?.preferredLang ?? 'EN',
            },
            subscription: USE_BROADCAST_MESSAGE_CREATED_SUBSCRIPTION,
            onNext: (data) => {
                const broadcastMessage = data?.broadcastMessageCreated?.edge?.node?.broadcastMessage;
                const isBroadcaster = data?.broadcastMessageCreated?.edge?.node?.createdBy?.id === user?.id;
                if (broadcastMessage && !isBroadcaster) {
                    displaySnack(broadcastMessage, {
                        variant: 'info',
                        anchorOrigin: { vertical: 'top', horizontal: 'center' },
                    });
                }
            },
        }),
        [eventId, connections, user?.preferredLang, user?.id, displaySnack]
    );

    useSubscription<useBroadcastMessageCreatedSubscription>(createdConfig);
}
