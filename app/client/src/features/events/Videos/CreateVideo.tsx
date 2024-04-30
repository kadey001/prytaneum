import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import type { CreateVideoMutation, CreateVideoMutation$data } from '@local/__generated__/CreateVideoMutation.graphql';
import { VideoForm, TVideoForm } from './VideoForm';
import { useSnack } from '@local/core';

interface CreateVideoProps {
    onSubmit: (res: CreateVideoMutation$data['createVideo']['body']) => void;
    eventId: string;
    connections: string[];
}

export const CREATE_VIDEO_MUTATION = graphql`
    mutation CreateVideoMutation($input: CreateVideo!, $connections: [ID!]!) {
        createVideo(input: $input) {
            isError
            message
            body @appendNode(connections: $connections, edgeTypeName: "VideoEdge") {
                id
                url
                lang
            }
        }
    }
`;

export const CreateVideo = ({ onSubmit, eventId, connections }: CreateVideoProps) => {
    const [commit] = useMutation<CreateVideoMutation>(CREATE_VIDEO_MUTATION);
    const { displaySnack } = useSnack();

    function handleSubmit(form: TVideoForm) {
        commit({
            variables: { input: { ...form, eventId }, connections },
            onCompleted(data) {
                if (data.createVideo.isError) displaySnack(data.createVideo.message, { variant: 'error' });
                else if (data.createVideo.body) onSubmit(data.createVideo.body);
            },
            onError(err) {
                displaySnack(err.message, { variant: 'error' });
            },
        });
    }

    return <VideoForm onSubmit={handleSubmit} />;
};
