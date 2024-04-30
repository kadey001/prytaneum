import { graphql, useMutation } from 'react-relay';

import type {
    UpdateSpeakerMutation,
    UpdateSpeakerMutation$data,
} from '@local/__generated__/UpdateSpeakerMutation.graphql';
import { NullableFields } from '@local/utils/ts-utils';
import { SpeakerForm, TSpeakerForm } from './SpeakerForm';
import { useSnack } from '@local/core';

const UPDATE_SPEAKER_MUTATION = graphql`
    mutation UpdateSpeakerMutation($input: UpdateSpeaker!) {
        updateSpeaker(input: $input) {
            isError
            message
            body {
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

export type TUpdatedSpeaker = UpdateSpeakerMutation$data['updateSpeaker'];
export interface UpdateSpeakerProps {
    form: NullableFields<TSpeakerForm>;
    speakerId: string;
    eventId: string;
    onSubmit: (speaker: TUpdatedSpeaker) => void;
}

export function UpdateSpeaker({ form, speakerId, eventId, onSubmit }: UpdateSpeakerProps) {
    const [commit] = useMutation<UpdateSpeakerMutation>(UPDATE_SPEAKER_MUTATION);
    const { displaySnack } = useSnack();

    function handleSubmit(submittedForm: TSpeakerForm) {
        if (!eventId) return;
        commit({
            variables: {
                input: {
                    ...submittedForm,
                    eventId,
                    id: speakerId,
                },
            },
            onCompleted(results) {
                if (results.updateSpeaker.isError) displaySnack(results.updateSpeaker.message, { variant: 'error' });
                else if (results.updateSpeaker) onSubmit(results.updateSpeaker);
            },
            onError(err) {
                displaySnack(err.message, { variant: 'error' });
            },
        });
    }

    return <SpeakerForm onSubmit={handleSubmit} form={form} />;
}
