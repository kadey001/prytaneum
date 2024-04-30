import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import type { DeleteSpeakerMutation } from '@local/__generated__/DeleteSpeakerMutation.graphql';
import { ConfirmationDialog, ConfirmationDialogProps } from '@local/components/ConfirmationDialog';
import { useSnack } from '@local/core';

export const DELETE_SPEAKER_MUTATION = graphql`
    mutation DeleteSpeakerMutation($input: DeleteSpeaker!, $connections: [ID!]!) {
        deleteSpeaker(input: $input) {
            isError
            message
            body {
                id @deleteEdge(connections: $connections)
            }
        }
    }
`;

type DeleteSpeakerProps = ConfirmationDialogProps & { speakerId?: string; eventId: string; connections: string[] };

export function DeleteSpeaker(props: DeleteSpeakerProps) {
    const { children, connections, onConfirm, speakerId, eventId, ...propsSubset } = props;
    const [commit] = useMutation<DeleteSpeakerMutation>(DELETE_SPEAKER_MUTATION);
    const { displaySnack } = useSnack();

    const curryOnConfirm = () => {
        if (!speakerId) return;
        commit({
            variables: { input: { id: speakerId, eventId }, connections },
            onCompleted(results) {
                if (results.deleteSpeaker.isError) displaySnack(results.deleteSpeaker.message, { variant: 'error' });
                else onConfirm();
            },
            onError(err) {
                displaySnack(err.message, { variant: 'error' });
            },
        });
    };
    return (
        <ConfirmationDialog onConfirm={curryOnConfirm} {...propsSubset}>
            {children}
        </ConfirmationDialog>
    );
}
