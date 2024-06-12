import * as React from 'react';
import {
    Avatar,
    Button,
    Card,
    CardHeader,
    DialogContent,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import { ResponsiveDialog, useResponsiveDialog } from '@local/components';
import { useSnack } from '@local/core';
import { useMuteParticipant } from './useMuteParticipant';
import { useEvent } from '../useEvent';
import { useUnmuteParticipant } from './useUnmuteParticipant';
import { Participant } from './ParticipantsList';
import { getHashedColor } from '@local/core/getHashedColor';

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
                onError(err) {
                    displaySnack(err.message, { variant: 'error' });
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
                onError(err) {
                    displaySnack(err.message, { variant: 'error' });
                },
            });
    }

    const authorName = React.useMemo(() => {
        let _authorName = 'Unknown User';
        if (participant.firstName) {
            _authorName = participant.firstName;
            if (participant.lastName) _authorName = `${_authorName} ${participant.lastName}`;
        }
        return _authorName;
    }, [participant]);
    const avatarColor = React.useMemo(() => {
        return getHashedColor(authorName);
    }, [authorName]);

    const participantActions = React.useMemo(() => {
        if (participant.moderatorOf) {
            return (
                <IconButton disabled={true}>
                    <VolumeUpIcon color='success' />
                </IconButton>
            );
        }
        if (participant.isMuted) {
            return (
                <IconButton onClick={open}>
                    <Tooltip title='Unmute Participant' placement='top'>
                        <VolumeOffIcon color='error' />
                    </Tooltip>
                </IconButton>
            );
        } else {
            return (
                <IconButton onClick={open}>
                    <Tooltip title='Mute Participant' placement='top'>
                        <VolumeUpIcon color='success' />
                    </Tooltip>
                </IconButton>
            );
        }
    }, [participant, open]);

    return (
        <React.Fragment>
            <Card style={{ width: '100%' }}>
                <CardHeader
                    avatar={<Avatar sx={{ bgcolor: avatarColor }}>{authorName[0]}</Avatar>}
                    title={
                        participant.moderatorOf ? (
                            <Stack direction='row' alignItems='center'>
                                <Tooltip title='Verified Moderator' placement='top'>
                                    <VerifiedUserIcon
                                        fontSize='small'
                                        sx={{ color: (theme) => theme.palette.primary.main }}
                                    />
                                </Tooltip>
                                {authorName}
                            </Stack>
                        ) : (
                            authorName
                        )
                    }
                    action={participantActions}
                />
            </Card>
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
