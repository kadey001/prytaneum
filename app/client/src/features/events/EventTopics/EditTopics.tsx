import React from 'react';
import { Stack, Typography } from '@mui/material';

import { AddTopic } from './AddTopic';
import { RegenerateTopics } from './RegenerateTopics';
import { TopicCard } from './TopicCard';
import { TopicContext } from './EventTopicSettings';

interface Props {}

export function EditTopics({}: Props) {
    const { isReadingMaterialsUploaded, topics } = React.useContext(TopicContext);

    const topicList = React.useMemo(() => topics, [topics]);

    const memoizedTopicCards = React.useMemo(() => {
        return topicList.map((topic, index) => (
            <React.Fragment key={index}>
                <TopicCard topic={topic} />
            </React.Fragment>
        ));
    }, [topicList]);

    return (
        <React.Fragment>
            <Stack direction='column' width='100%' alignItems='center'>
                <Typography variant='body2'>Add, Edit, and Lock Topics</Typography>
                <Typography variant='caption' marginBottom={topics.length === 0 ? '1rem' : 0}>
                    {'(locking ensures the topic remains after re-generating)'}
                </Typography>
                {memoizedTopicCards}
                <Stack direction='row' spacing={2} justifyContent='center'>
                    <AddTopic />
                    {isReadingMaterialsUploaded && <RegenerateTopics />}
                </Stack>
            </Stack>
        </React.Fragment>
    );
}
