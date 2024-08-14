import React from 'react';
import { Typography, Grid, Stack, Chip, Tooltip } from '@mui/material';

import { getHashedColor } from '@local/core/getHashedColor';
import { Topic } from './types';

interface Props {
    topics: Topic[];
    issue: string;
}

export function FinalizeTopics({ topics, issue }: Props) {
    const finalizedTopics = React.useMemo(() => topics, [topics]);

    const memoizedTopicChips = React.useMemo(() => {
        return finalizedTopics.map((topic, index) => (
            <Tooltip key={index} title={topic.description}>
                <Chip
                    label={topic.topic}
                    sx={{ color: 'white', backgroundColor: getHashedColor(topic.topic), margin: '0.25rem' }}
                />
            </Tooltip>
        ));
    }, [finalizedTopics]);

    return (
        <Stack direction='column' spacing={2} alignItems='center'>
            <Grid item xs={12}>
                <Typography variant='body1'>Are you sure you want to finalize these topics?</Typography>
            </Grid>
            <Typography variant='body1'>
                <b>Event Issue:</b> {issue}
            </Typography>
            <Grid container justifyContent='center'>
                {memoizedTopicChips}
            </Grid>
        </Stack>
    );
}
