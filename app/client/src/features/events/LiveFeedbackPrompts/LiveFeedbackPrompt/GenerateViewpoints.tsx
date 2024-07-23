import * as React from 'react';
import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import Button from '@mui/material/Button';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components';
import { Grid, Typography, DialogContent } from '@mui/material';
import { useEvent } from '../../useEvent';
import { Prompt } from './LiveFeedbackPromptList';

export const GENERATE_VIEWPOINTS_MUTATION = graphql`
    mutation GenerateViewpointsMutation($eventId: ID!, $promptId: ID!) {
        generateViewpoints(eventId: $eventId, promptId: $promptId) {
            isError
            message
            body {
                cursor
                node {
                    id
                    viewpoints
                }
            }
        }
    }
`;

interface Props {
    promptId: string;
    setSelectedPrompt: React.Dispatch<React.SetStateAction<Prompt | null>>;
}

export default function GenerateViewpoints({ promptId, setSelectedPrompt }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [commit] = useMutation(GENERATE_VIEWPOINTS_MUTATION);
    const { eventId } = useEvent();

    const handleSubmit = () => {
        commit({
            variables: { eventId, promptId },
            onCompleted: () => {
                close();
            },
            updater: (store) => {
                const payload = store.getRootField('generateViewpoints');
                if (!payload) return console.error('No payload returned from generateViewpoints mutation');
                const body = payload.getLinkedRecord('body');
                if (!body) return console.error('No body returned from generateViewpoints mutation');
                const node = body.getLinkedRecord('node');
                if (!node) return console.error('No node returned from generateViewpoints mutation');
                const viewpoints = node.getValue('viewpoints');
                if (!viewpoints) return console.error('No viewpoints returned from generateViewpoints mutation');
                const promptRecord = store.get(promptId);
                if (!promptRecord) return console.error('No prompt found in store');
                promptRecord.setValue(viewpoints, 'viewpoints');
                setSelectedPrompt((prev) => {
                    if (!prev) return prev;
                    return { ...prev, viewpoints: viewpoints as string[] };
                });
            },
            onError: (error) => {
                console.error(error);
            },
        });
    };

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close} title='Share Results With Participants'>
                <DialogContent>
                    <Grid container>
                        <Grid container item justifyContent='center'>
                            <Typography>Are you sure you would like to generate/re-generate viewpoints?</Typography>
                        </Grid>
                        <Grid container item justifyContent='center'>
                            <Button onClick={close}>Cancel</Button>
                            <Button onClick={handleSubmit}>Generate</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </ResponsiveDialog>
            <Grid item paddingBottom='1rem'>
                <Button variant='contained' color='primary' onClick={open}>
                    Generate Viewpoints
                </Button>
            </Grid>
        </React.Fragment>
    );
}
