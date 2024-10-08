import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';
import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import type { useEventTypeMutation } from '@local/__generated__/useEventTypeMutation.graphql';
import type { EventType } from '@local/graphql-types';

const UPDATE_EVENT_TYPE = graphql`
    mutation useEventTypeMutation($input: UpdateEventType!) {
        updateEventType(input: $input) {
            isError
            message
            body
        }
    }
`;

export function useEventType() {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useEventTypeMutation>(UPDATE_EVENT_TYPE);

    const updateEventType = (newEventType: EventType, onSuccess: () => void, onFailure?: () => void) => {
        commit({
            variables: { input: { eventId, eventType: newEventType } },
            onCompleted: (response) => {
                if (response.updateEventType.isError) {
                    displaySnack(response.updateEventType.message, { variant: 'error' });
                    if (onFailure) onFailure();
                } else {
                    displaySnack('Event type updated successfully', { variant: 'success' });
                    onSuccess();
                }
            },
            onError: (error) => {
                displaySnack(error.message, { variant: 'error' });
                if (onFailure) onFailure();
            },
        });
    };

    return { updateEventType };
}
