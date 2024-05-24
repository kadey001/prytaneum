import React from 'react';
import { useRouter } from 'next/router';
import { graphql, useMutation } from 'react-relay';
import { Button, IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import type { ModeratorActionsStartEventMutation } from '@local/__generated__/ModeratorActionsStartEventMutation.graphql';
import type { ModeratorActionsEndEventMutation } from '@local/__generated__/ModeratorActionsEndEventMutation.graphql';
import { useSnack } from '@local/core';
import { ConfirmationDialog } from '@local/components/ConfirmationDialog';

export const START_EVENT_MUTATION = graphql`
    mutation ModeratorActionsStartEventMutation($eventId: String!) {
        startEvent(eventId: $eventId) {
            message
        }
    }
`;

export const END_EVENT_MUTATION = graphql`
    mutation ModeratorActionsEndEventMutation($eventId: String!) {
        endEvent(eventId: $eventId) {
            message
        }
    }
`;

export interface ModeratorActionsProps {
    isLive: Boolean;
    setIsLive: React.Dispatch<React.SetStateAction<boolean>>;
    eventId: string;
}

export function ModeratorActions({ isLive, setIsLive, eventId }: ModeratorActionsProps) {
    const theme = useTheme();
    const { displaySnack } = useSnack();
    const router = useRouter();
    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = React.useState(false);

    const openConfirmationDialog = React.useCallback(() => {
        setIsConfirmationDialogOpen(true);
    }, []);

    const closeConfirmationDialog = React.useCallback(() => {
        setIsConfirmationDialogOpen(false);
    }, []);

    const [commitEventEndMutation] = useMutation<ModeratorActionsStartEventMutation>(END_EVENT_MUTATION);
    const [commitEventStartMutation] = useMutation<ModeratorActionsEndEventMutation>(START_EVENT_MUTATION);

    const updateEventStatus = () => {
        if (isLive) {
            commitEventEndMutation({
                variables: {
                    eventId,
                },
                onCompleted() {
                    closeConfirmationDialog();
                    displaySnack(
                        'Event has ended! Please note that it may take up to 30 seconds for participants to be routed to the post event page.',
                        { variant: 'info', anchorOrigin: { vertical: 'top', horizontal: 'center' } }
                    );
                    setIsLive(false);
                },
            });
        } else {
            commitEventStartMutation({
                variables: {
                    eventId,
                },
                onCompleted() {
                    closeConfirmationDialog();
                    displaySnack(
                        'Event has started! Please note that it may take up to 30 seconds for participants to enter.',
                        { variant: 'info', anchorOrigin: { vertical: 'top', horizontal: 'center' } }
                    );
                    setIsLive(true);
                },
            });
        }
    };

    return (
        <Stack direction='column' paddingTop='1rem'>
            <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                {/* <Button variant='contained' onClick={() => console.log('TODO')}>
                    Intermission
                </Button> */}
                <Button variant='contained' color={isLive ? 'error' : 'success'} onClick={openConfirmationDialog}>
                    {isLive ? 'End Event' : 'Start Event'}
                </Button>
            </Stack>
            <ConfirmationDialog
                title='Update Event Status'
                open={isConfirmationDialogOpen}
                onConfirm={updateEventStatus}
                onClose={closeConfirmationDialog}
            >
                <React.Fragment>Are you sure you want to {isLive ? 'end' : 'start'} the event?</React.Fragment>
            </ConfirmationDialog>
        </Stack>
    );
}
