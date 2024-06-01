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

    const isTopicLocked = React.useMemo(() => Boolean(topic.locked), [topic.locked]);

    const handleToggleLock = () => {
        if (isLoading) return;
        setIsLoading(true);
        const onSuccess = () => {
            const newTopic = { ...topic, locked: !isTopicLocked };
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
        if (isTopicLocked) unlockTopic(topic, onSuccess, onFailure);
        else lockTopic(topic, onSuccess, onFailure);
    };

    return (
        <Tooltip title={isTopicLocked ? 'Topic Locked' : 'Topic Unlocked'}>
            <IconButton onClick={handleToggleLock}>
                {isTopicLocked ? <LockIcon color='success' /> : <LockOpenIcon />}
            </IconButton>
        </Tooltip>
    );
}
