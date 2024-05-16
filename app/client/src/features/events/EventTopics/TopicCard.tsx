import React from 'react';
import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';

import { Topic } from './types';
import { EditTopic } from './EditTopic';
import { DeleteTopic } from './DeleteTopic';
import { LockTopic } from './LockTopic';

interface Props {
    topic: Topic;
}

export function TopicCard({ topic }: Props) {
    return (
        <Card sx={{ maxWidth: '100%', minWidth: '60%', width: '80%', marginY: '0.5rem' }}>
            <CardHeader
                title={topic.topic}
                action={
                    <Stack direction='row' spacing={1}>
                        <LockTopic topic={topic} />
                        <EditTopic topic={topic} />
                        <DeleteTopic topic={topic} />
                    </Stack>
                }
            />
            <CardContent>
                <Typography variant='body1'>{topic.description}</Typography>
            </CardContent>
        </Card>
    );
}
