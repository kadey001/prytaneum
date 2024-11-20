import { useSnack } from '@local/core';
import { useBroadcastMessageSnackSubscription } from '@local/__generated__/useBroadcastMessageSnackSubscription.graphql';
import { useMemo } from 'react';
import { useSubscription, graphql } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useEvent } from '../useEvent';

export const USE_BROADCAST_MESSAGE_SNACK_SUBSCRIPTION = graphql`
    subscription useBroadcastMessageSnackSubscription($eventId: ID!) {
        broadcastMessageCreated(eventId: $eventId) {
            edge {
                node {
                    id
                    broadcastMessage
                }
            }
        }
    }
`;

export function useBroadcastMessageSnack() {
    const { displaySnack } = useSnack();
    const { eventId } = useEvent();

    const snackConfig = useMemo<GraphQLSubscriptionConfig<useBroadcastMessageSnackSubscription>>(
        () => ({
            variables: { eventId },
            subscription: USE_BROADCAST_MESSAGE_SNACK_SUBSCRIPTION,
            onNext: (data) => {
                const broadcastMessage = data?.broadcastMessageCreated?.edge?.node?.broadcastMessage;
                if (broadcastMessage) {
                    displaySnack(broadcastMessage, {
                        variant: 'info',
                        anchorOrigin: { vertical: 'top', horizontal: 'center' },
                    });
                }
            },
        }),
        [displaySnack, eventId]
    );

    useSubscription(snackConfig);
}
