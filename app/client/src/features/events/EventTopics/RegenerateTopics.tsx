import React from 'react';
import { Button, CircularProgress, Grid } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

import { TopicContext } from './EventTopicSettings';
import { useRegenerateTopics } from './hooks/useRegenerateTopics';
import { Topic } from './types';

/**
 * RegenerateTopics
 * @returns JSX.Element
 * @description Regenerate the topics for the event based on the uploaded reading materials.
 *  Excludes any locked topics.
 */
export function RegenerateTopics() {
    const { topics, setTopics } = React.useContext(TopicContext);
    const { regenerateTopics } = useRegenerateTopics();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleRegenerateTopics = () => {
        setIsLoading(true);
        const onSuccess = (newTopics: Topic[]) => {
            const filteredNewTopics = [...newTopics].filter((topic) => {
                const isAlreadyLockedTopic = topics.some((_topic) => _topic.topic === topic.topic && _topic.locked);
                return !isAlreadyLockedTopic;
            });
            const updatedTopicList = [...topics].filter((topic) => topic.locked).concat(filteredNewTopics);
            setTopics(updatedTopicList);
            setIsLoading(false);
        };
        const onFailure = () => {
            setIsLoading(false);
        };
        regenerateTopics(onSuccess, onFailure);
    };

    return (
        <React.Fragment>
            <Button
                variant='contained'
                color={isLoading ? 'inherit' : 'success'}
                sx={{ width: '150px' }}
                onClick={handleRegenerateTopics}
            >
                {isLoading && (
                    <Grid container justifyContent='center' width='100%' height='100%'>
                        <CircularProgress color='inherit' size={25} />
                    </Grid>
                )}
                {!isLoading && (
                    <React.Fragment>
                        <CachedIcon />
                        Re-Generate
                    </React.Fragment>
                )}
            </Button>
        </React.Fragment>
    );
}
