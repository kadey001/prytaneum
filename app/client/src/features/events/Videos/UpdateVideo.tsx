import * as React from 'react';
import { graphql, useMutation } from 'react-relay';

import type { UpdateVideoMutation, UpdateVideoMutation$data } from '@local/__generated__/UpdateVideoMutation.graphql';
import { VideoForm, TVideoForm } from './VideoForm';
import { useSnack } from '@local/core';

interface CreateVideoProps {
    onSubmit: (res: UpdateVideoMutation$data['updateVideo']) => void;
    eventId: string;
    video: TVideoForm & { id: string };
}

export const UPDATE_VIDEO_MUTATION = graphql`
    mutation UpdateVideoMutation($input: UpdateVideo!) {
        updateVideo(input: $input) {
            isError
            message
            body {
                id
                url
                lang
            }
        }
    }
`;

export const UpdateVideo = ({ onSubmit, eventId, video }: CreateVideoProps) => {
    const [commit] = useMutation<UpdateVideoMutation>(UPDATE_VIDEO_MUTATION);
    const { displaySnack } = useSnack();

    function handleSubmit(form: TVideoForm) {
        commit({
            variables: { input: { ...form, eventId, videoId: video.id } },
            onCompleted(data) {
                if (data.updateVideo.isError) displaySnack(data.updateVideo.message, { variant: 'error' });
                else onSubmit(data.updateVideo);
            },
            onError(err) {
                displaySnack(err.message, { variant: 'error' });
            },
        });
    }

    return <VideoForm onSubmit={handleSubmit} form={{ url: video.url, lang: video.lang }} />;
};
