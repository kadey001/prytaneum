import { graphql, useMutation } from 'react-relay';

import type {
    CreateSpeakerMutation,
    CreateSpeakerMutation$data,
} from '@local/__generated__/CreateSpeakerMutation.graphql';
import { SpeakerForm, TSpeakerForm } from './SpeakerForm';
import { useSnack } from '@local/core';

const CREATE_SPEAKER_MUTATION = graphql`
    mutation CreateSpeakerMutation($input: CreateSpeaker!, $connections: [ID!]!) {
        createSpeaker(input: $input) {
            isError
            message
            body @appendNode(connections: $connections, edgeTypeName: "EventSpeakerEdge") {
                id
                eventId
                name
                description
                title
                pictureUrl
                email
            }
        }
    }
`;

export type TCreatedSpeaker = CreateSpeakerMutation$data['createSpeaker'];
export interface CreateSpeakerProps {
    eventId: string;
    onSubmit: (speaker: TCreatedSpeaker) => void;
    connections?: string[];
}

export function CreateSpeaker({ eventId, onSubmit, connections }: CreateSpeakerProps) {
    const [commit] = useMutation<CreateSpeakerMutation>(CREATE_SPEAKER_MUTATION);
    const { displaySnack } = useSnack();

    function handleSubmit(form: TSpeakerForm) {
        commit({
            variables: {
                input: {
                    ...form,
                    eventId,
                },
                connections: connections ?? [],
            },
            onCompleted(results) {
                if (results.createSpeaker.isError) displaySnack(results.createSpeaker.message, { variant: 'error' });
                else if (results.createSpeaker) onSubmit(results.createSpeaker);
            },
            onError(err) {
                displaySnack(err.message, { variant: 'error' });
            },
        });
    }

    return <SpeakerForm onSubmit={handleSubmit} />;
}
