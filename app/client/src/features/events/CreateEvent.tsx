import { graphql, useMutation } from 'react-relay';

import type { CreateEventMutation, CreateEventMutation$data } from '@local/__generated__/CreateEventMutation.graphql';
import { EventForm, TEventForm, EventFormProps } from './EventForm';
import { useSnack } from '@local/core';

export const CREATE_EVENT_MUTATION = graphql`
    mutation CreateEventMutation($input: CreateEvent!, $connections: [ID!]!) {
        createEvent(event: $input) {
            isError
            message
            body @prependNode(connections: $connections, edgeTypeName: "EventEdge") {
                id
                title
                topic
                startDateTime
            }
        }
    }
`;

export type TCreatedEvent = NonNullable<CreateEventMutation$data['createEvent']>;
export type CreateEventProps = {
    orgId: string;
    onSubmit?: (event: TCreatedEvent) => void;
    connections?: string[];
} & Omit<EventFormProps, 'onSubmit' | 'form'>;

export function CreateEvent({ orgId, onSubmit, connections, ...eventFormProps }: CreateEventProps) {
    const [commit] = useMutation<CreateEventMutation>(CREATE_EVENT_MUTATION);
    const { displaySnack } = useSnack();

    function handleSubmit(submittedForm: TEventForm) {
        commit({
            variables: {
                input: {
                    ...submittedForm,
                    orgId,
                },
                connections: connections || [],
            },
            onCompleted(results) {
                if (results.createEvent.isError) displaySnack(results.createEvent.message, { variant: 'error' });
                if (results.createEvent && onSubmit) onSubmit(results.createEvent);
            },
            onError(err) {
                displaySnack(err.message, { variant: 'error' });
            },
        });
    }

    return <EventForm {...eventFormProps} formType='Create' onSubmit={handleSubmit} title='Create Event' />;
}
