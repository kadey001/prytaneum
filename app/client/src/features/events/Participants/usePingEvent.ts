import React, { useEffect } from 'react';
import { useMutation, graphql } from 'react-relay';

import type { usePingEventMutation } from '@local/__generated__/usePingEventMutation.graphql';

export const PING_EVENT_MUTATION = graphql`
    mutation usePingEventMutation($eventId: ID!) @raw_response_type {
        participantPingEvent(eventId: $eventId) {
            isError
            message
        }
    }
`;

/**
 * @description Ping the server every 20 seconds to keep the participant active in the event participants list
 * @param eventId
 */
export function usePingEvent(eventId: string) {
    const [commit] = useMutation<usePingEventMutation>(PING_EVENT_MUTATION);
    const [pingPaused, setPingPaused] = React.useState(false);
    const PING_INTERVAL = 20000; // 20 seconds

    const pingEvent = React.useCallback(() => {
        commit({
            variables: { eventId },
            optimisticResponse: {
                participantPingEvent: {
                    isError: false,
                    message: '',
                },
            },
        });
    }, [commit, eventId]);

    const pausePingEvent = React.useCallback(() => {
        setPingPaused(true);
    }, [setPingPaused]);

    const resumePingEvent = React.useCallback(() => {
        setPingPaused(false);
    }, [setPingPaused]);

    const startPingEvent = React.useCallback(() => {
        pingEvent();
        setPingPaused(false);
    }, [pingEvent]);

    // Ping the server every 20 seconds to keep the participant active in the event participants list
    useEffect(() => {
        const pingInterval = setInterval(() => {
            if (pingPaused) return;
            commit({
                variables: { eventId },
            });
        }, PING_INTERVAL);

        return () => clearInterval(pingInterval);
    }, [pingPaused, eventId, commit]);

    // Send initial ping on initial load
    useEffect(() => {
        pingEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { pingEvent: commit, pausePingEvent, resumePingEvent, startPingEvent };
}
