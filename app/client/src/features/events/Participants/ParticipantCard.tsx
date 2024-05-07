import * as React from 'react';
import { Button, DialogContent, Grid, IconButton, Paper, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import { ResponsiveDialog, useResponsiveDialog } from '@local/components';
import { useSnack } from '@local/core';
import { useMuteParticipant } from './useMuteParticipant';
import { useEvent } from '../useEvent';
import { useUnmuteParticipant } from './useUnmuteParticipant';
import { Participant } from './ParticipantsList';

export interface ParticipantCardProps {
    participant: Participant;
}

export function ParticipantCard({ participant }: ParticipantCardProps) {
    const [isOpen, open, close] = useResponsiveDialog();
    const { muteParticipant } = useMuteParticipant();
    const { unmuteParticipant } = useUnmuteParticipant();
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();

    function handleToggleParticipantMute() {
        try {
            if (!participant.isMuted)
                muteParticipant({
                    variables: { eventId, userId: participant.id },
                    onCompleted(payload) {
                        try {
                            if (payload.muteParticipant.isError) throw new Error(payload.muteParticipant.message);
                            close();
                            displaySnack('Participant Muted', { variant: 'success' });
                        } catch (err) {
                            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
                            else displaySnack('Something went wrong!');
                        }
                    },
                });
            else
                unmuteParticipant({
                    variables: { eventId, userId: participant.id },
                    onCompleted(payload) {
                        try {
                            if (payload.unmuteParticipant.isError) throw new Error(payload.unmuteParticipant.message);
                            close();
                            displaySnack('Participant Unmuted', { variant: 'success' });
                        } catch (err) {
                            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
                            else displaySnack('Something went wrong!');
                        }
                    },
                });
        } catch (err) {
            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
            else displaySnack('Something went wrong!');
        }
    }

    return (
        <React.Fragment>
            <Paper style={{ width: '100%' }}>
                <Grid container direction='row' alignItems='center' display='grid'>
                    <Grid item justifySelf='center' width='50px'>
                        <img src='/static/participant_icon.svg' alt='avatar' width='50px' height='50px' />
                    </Grid>
                    <Grid item maxWidth='200px' minWidth='100px' gridColumn='2/5'>
                        <Typography variant='body1'>{participant.firstName + ' ' + participant.lastName}</Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {participant.moderatorOf ? 'Moderator' : 'Participant'}
                        </Typography>
                    </Grid>
                    <Grid item gridColumn='5/6' justifySelf='center' width='50px'>
                        <IconButton disabled={participant.moderatorOf} onClick={open}>
                            {participant.isMuted ? <VolumeOffIcon color='error' /> : <VolumeUpIcon color='success' />}
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <Typography variant='h6'>
                        Are you sure you want to {participant?.isMuted ? 'unmute ' : 'mute '}
                        {`"${participant?.firstName} ${participant?.lastName}"`} for this event?
                    </Typography>
                    <Grid container justifyContent='end'>
                        <Button onClick={close}>Cancel</Button>
                        <Button variant='contained' onClick={handleToggleParticipantMute}>
                            {participant?.isMuted ? 'unmute ' : 'mute '}
                        </Button>
                    </Grid>
                </DialogContent>
            </ResponsiveDialog>
        </React.Fragment>
    );
}
