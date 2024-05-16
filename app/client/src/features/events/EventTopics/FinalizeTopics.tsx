import React from 'react';
import { Typography, Grid, Stack, Chip } from '@mui/material';

import { getHashedColor } from '@local/core/getHashedColor';
import { Topic } from './types';

interface Props {
    topics: Topic[];
}

export function FinalizeTopics({ topics }: Props) {
    return (
        <Stack direction='column' spacing={2} alignItems='center'>
            <Grid item xs={12}>
                <Typography variant='body1'>Are you sure you want to finalize the topics?</Typography>
            </Grid>
            <Grid container justifyContent='center'>
                {topics.map((topic, index) => (
                    <Chip
                        key={index}
                        label={topic.topic}
                        sx={{ color: 'white', backgroundColor: getHashedColor(topic.topic), margin: '0.25rem' }}
                    />
                ))}
            </Grid>
        </Stack>
    );
}
