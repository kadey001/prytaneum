import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { Topic } from './types';
import { TopicContext } from './EventTopicSettings';
import { useLockTopic } from './hooks/useLockTopic';
import { useUnlockTopic } from './hooks/useUnlockTopic';

interface Props {
    topic: Topic;
}

export function LockTopic({ topic }: Props) {
    const { setTopics } = React.useContext(TopicContext);
    const { lockTopic } = useLockTopic();
    const { unlockTopic } = useUnlockTopic();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleToggleLock = () => {
        if (isLoading) return;
        setIsLoading(true);
        const isCurrentlyLocked = Boolean(topic.locked);
        const onSuccess = () => {
            const newTopic = { ...topic, locked: !isCurrentlyLocked };
            setTopics((prev) => {
                const index = prev.findIndex((_topic) => _topic.topic === topic.topic);
                if (index === -1) return prev;
                const newTopics = [...prev];
                newTopics[index] = newTopic;
                return newTopics;
            });
            setIsLoading(false);
        };
        const onFailure = () => setIsLoading(false);
        if (isCurrentlyLocked) unlockTopic(topic, onSuccess, onFailure);
        else lockTopic(topic, onSuccess, onFailure);
    };

    return (
        <Tooltip title={topic.locked ? 'Topic Locked' : 'Topic Unlocked'}>
            <IconButton onClick={handleToggleLock}>
                {topic.locked ? <LockIcon color='success' /> : <LockOpenIcon />}
            </IconButton>
        </Tooltip>
    );
}
