import React from 'react';
import { Stack, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useSnack } from '@local/core';
import { useResponsiveDialog } from '@local/components';
import { TopicContext } from './EventTopicSettings';
import { useAddTopic } from './hooks/useAddTopic';
import type { Topic } from './types';
import { EVENT_TOPIC_DESCRIPTION_MAX_LENGTH, EVENT_TOPIC_TOPIC_MAX_LENGTH } from '@local/utils/rules';

interface Props {}

/**
 * AddTopic
 * @returns JSX.Element
 * @description Add a new topic to the event.
 */
export function AddTopic({}: Props) {
    const { isReadingMaterialsUploaded, setTopics } = React.useContext(TopicContext);
    const { displaySnack } = useSnack();
    const [newTopic, setNewTopic] = React.useState<Topic>({ topic: '', description: '', locked: true });
    const [isOpen, openDialog, closeDialog] = useResponsiveDialog();
    const { addTopic } = useAddTopic();

    const handleCloseAddDialog = () => {
        closeDialog();
    };

    const handleAddTopic = () => {
        if (!newTopic || !newTopic.topic || !newTopic.description) {
            displaySnack('Please enter a topic and description.', { variant: 'error' });
            return;
        }
        const onSuccess = () => {
            // All created topics are locked by default
            newTopic.locked = true;
            setTopics((prev) => [...prev, newTopic]);
            closeDialog();
        };
        if (isReadingMaterialsUploaded) addTopic(newTopic, onSuccess);
        else onSuccess();
    };

    const topicError = React.useMemo(() => {
        if (newTopic.topic.length > EVENT_TOPIC_TOPIC_MAX_LENGTH) return 'Topic is too long';
        if (newTopic.topic.length === 0) return 'Topic is required';
        return '';
    }, [newTopic.topic]);

    const descriptionError = React.useMemo(() => {
        if (newTopic.description.length > EVENT_TOPIC_DESCRIPTION_MAX_LENGTH) return 'Description is too long';
        if (newTopic.description.length === 0) return 'Description is required';
        return '';
    }, [newTopic.description]);

    const isInputValid = React.useMemo(() => {
        return topicError === '' && descriptionError === '';
    }, [topicError, descriptionError]);

    return (
        <React.Fragment>
            <Dialog open={isOpen} onClose={handleCloseAddDialog} maxWidth='sm' fullWidth>
                <DialogTitle>Add Topic</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} paddingTop='1rem'>
                        <TextField
                            required
                            label='Topic'
                            error={topicError !== ''}
                            helperText={topicError}
                            onChange={(e) => {
                                setNewTopic((prev) => ({
                                    topic: e.target.value,
                                    description: prev.description,
                                    locked: prev.locked,
                                }));
                            }}
                        />
                        <Typography
                            variant='caption'
                            color={newTopic.topic.length > EVENT_TOPIC_TOPIC_MAX_LENGTH ? 'red' : 'black'}
                            sx={{
                                display: 'block',
                                textAlign: 'right',
                            }}
                        >
                            {newTopic.topic.length}/{EVENT_TOPIC_TOPIC_MAX_LENGTH}
                        </Typography>
                        <TextField
                            required
                            multiline
                            minRows={3}
                            label='Description'
                            error={descriptionError !== ''}
                            onChange={(e) =>
                                setNewTopic((prev) => ({
                                    topic: prev.topic,
                                    description: e.target.value,
                                }))
                            }
                        />
                        <Typography
                            variant='caption'
                            color={newTopic.description.length > EVENT_TOPIC_DESCRIPTION_MAX_LENGTH ? 'red' : 'black'}
                            sx={{
                                display: 'block',
                                textAlign: 'right',
                            }}
                        >
                            {newTopic.description.length}/{EVENT_TOPIC_DESCRIPTION_MAX_LENGTH}
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color='inherit' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button disabled={!isInputValid} color='primary' onClick={handleAddTopic}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <Button variant='contained' onClick={openDialog}>
                <AddIcon />
                Add Topic
            </Button>
        </React.Fragment>
    );
}
