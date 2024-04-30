import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import type { DeleteVideoMutation } from '@local/__generated__/DeleteVideoMutation.graphql';
import { ConfirmationDialog, ConfirmationDialogProps } from '@local/components/ConfirmationDialog';
import type { EventVideo } from '@local/graphql-types';
import { useSnack } from '@local/core';

export const DELETE_VIDEO_MUTATION = graphql`
    mutation DeleteVideoMutation($input: DeleteVideo!, $connections: [ID!]!) {
        deleteVideo(input: $input) {
            isError
            message
            body {
                id @deleteEdge(connections: $connections)
            }
        }
    }
`;

type DeleteVideoProps = ConfirmationDialogProps & { video: EventVideo | null; eventId: string; connections: string[] };

export function DeleteVideo(props: DeleteVideoProps) {
    const { children, connections, onConfirm, video, eventId, ...propsSubset } = props;
    const [commit] = useMutation<DeleteVideoMutation>(DELETE_VIDEO_MUTATION);
    const { displaySnack } = useSnack();

    const curryOnConfirm = () => {
        if (!video) return;
        commit({
            variables: { input: { id: video.id, eventId }, connections },
            onCompleted(data) {
                if (data.deleteVideo.isError) displaySnack(data.deleteVideo.message, { variant: 'error' });
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
