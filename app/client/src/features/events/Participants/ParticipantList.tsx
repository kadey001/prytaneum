import React from 'react';
import { Grid, Stack, Typography, Tooltip, List, ListItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import type { Participant } from './useParticipantList';
import { ParticipantCard } from './ParticipantCard';

interface Props {
    participants: Participant[];
    isVisible: boolean;
}

export default function ParticipantList({ participants, isVisible }: Props) {
    const numberOfParticipants = participants.length;

    if (!isVisible) return null;

    return (
        <Grid container display='grid' height={0} width='100%'>
            <Stack direction='row' justifyContent='space-between' alignItems='center' paddingY='0.5rem'>
                <div style={{ width: '45px' }} />
                <Typography variant='h6'>Participants List</Typography>
                <Stack direction='row' width='75px' justifySelf='flex-end'>
                    <Tooltip title='Total Active Participants' placement='top'>
                        <PersonIcon sx={{ color: 'red', marginLeft: '0.25rem' }} />
                    </Tooltip>
                    <Tooltip title={`${numberOfParticipants} Participants`} placement='top'>
                        <Typography color='error'>{numberOfParticipants}</Typography>
                    </Tooltip>
                </Stack>
            </Stack>
            {numberOfParticipants === 0 && (
                <Grid item container justifyContent='center'>
                    <Typography variant='body1'>No participants found...</Typography>
                </Grid>
            )}
            <List>
                {participants.map((participant) => (
                    <ListItem key={participant.id}>
                        <ParticipantCard participant={participant} />
                    </ListItem>
                ))}
            </List>
        </Grid>
    );
}
