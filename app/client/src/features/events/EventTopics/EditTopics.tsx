import React from 'react';
import { Stack, Typography } from '@mui/material';

import { Topic } from './types';
import { AddTopic } from './AddTopic';
import { RegenerateTopics } from './RegenerateTopics';
import { TopicCard } from './TopicCard';
import { TopicContext } from './EventTopicSettings';

interface Props {
    topics: Topic[];
    setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export function EditTopics({ topics, setTopics }: Props) {
    const { isReadingMaterialsUploaded } = React.useContext(TopicContext);
    return (
        <React.Fragment>
            <Stack direction='column' width='100%' alignItems='center'>
                <Typography variant='body2'>Add, Edit, and Lock Topics</Typography>
                <Typography variant='caption' marginBottom={topics.length === 0 ? '1rem' : 0}>
                    {'(locking ensures the topic remains after re-generating)'}
                </Typography>
                {topics.map((topic, index) => (
                    <React.Fragment key={index}>
                        <TopicCard topic={topic} />
                    </React.Fragment>
                ))}
                <Stack direction='row' spacing={2} justifyContent='center'>
                    <AddTopic setTopics={setTopics} />
                    {isReadingMaterialsUploaded && <RegenerateTopics />}
                </Stack>
            </Stack>
        </React.Fragment>
    );
}
