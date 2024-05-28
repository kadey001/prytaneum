import React from 'react';
import { PreloadedQuery, useQueryLoader } from 'react-relay';
import { Typography, Grid, Stack, Chip, Skeleton, Box, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import { getHashedColor } from '@local/core/getHashedColor';
import { useEvent } from '../useEvent';
import { useTopicList, USE_TOPIC_LIST } from './hooks/useTopicList';
import { Loader } from '@local/components';
import { useTopicListQuery } from '@local/__generated__/useTopicListQuery.graphql';

const TopicListSkeleton = () => (
    <Stack direction='column' spacing={2} alignItems='center'>
        <Grid item xs={12}>
            <Typography variant='body1'>
                Current Event Topics
                <IconButton disabled={true} size='small'>
                    <RefreshIcon />
                </IconButton>
            </Typography>
        </Grid>
        <Box sx={{ width: 800 }}>
            <Skeleton animation='wave' height='32px' />
            <Skeleton animation='wave' height='32px' />
            <div style={{ height: '16px' }} />
        </Box>
    </Stack>
);

interface Props {
    queryRef: PreloadedQuery<useTopicListQuery>;
    refresh: () => void;
}

// TODO: Add ability to click on chip and view a card with the description (allow editing of topic/description)
// TODO Add ability to delete a topic
export function TopicList({ queryRef, refresh }: Props) {
    const { eventTopics } = useTopicList({ queryRef });
    const topicColor = React.useCallback((topic: string) => getHashedColor(topic), []);

    if (eventTopics.length === 0)
        return (
            <Grid container justifyContent='center'>
                <Typography variant='body1'>No topics setup yet, please run topic setup.</Typography>
            </Grid>
        );

    return (
        <Grid container justifyContent='center'>
            <Stack direction='column' spacing={2} alignItems='center' maxWidth='md'>
                <Grid item xs={12}>
                    <Typography variant='body1'>
                        Current Event Topics{' '}
                        <Tooltip title='Refresh Topic List' placement='top'>
                            <IconButton onClick={refresh} size='small'>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </Grid>
                <Grid container justifyContent='center'>
                    {eventTopics.map((topic, index) => (
                        <Tooltip key={index} title={topic.description} placement='bottom'>
                            <Chip
                                label={topic.topic}
                                sx={{ color: 'white', backgroundColor: topicColor(topic.topic), margin: '0.25rem' }}
                            />
                        </Tooltip>
                    ))}
                </Grid>
            </Stack>
        </Grid>
    );
}

export function PreloadedTopicList() {
    const { eventId } = useEvent();
    const [query, loadQuery, disposeQuery] = useQueryLoader<useTopicListQuery>(USE_TOPIC_LIST);

    const refresh = React.useCallback(() => {
        loadQuery({ eventId }, { fetchPolicy: 'network-only' });
    }, [eventId, loadQuery]);

    React.useEffect(() => {
        if (!query) loadQuery({ eventId });
    }, [query, loadQuery, eventId]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!query) return <Loader />;
    return (
        <React.Suspense fallback={<TopicListSkeleton />}>
            <TopicList queryRef={query} refresh={refresh} />
        </React.Suspense>
    );
}
