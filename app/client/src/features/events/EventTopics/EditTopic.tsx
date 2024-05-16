import React from 'react';
import {
    Stack,
    Button,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Topic } from './types';
import { useResponsiveDialog } from '@local/components';
import { useUpdateTopic } from './hooks/useUpdateTopic';
import { TopicContext } from './EventTopicSettings';
import { EVENT_TOPIC_TOPIC_MAX_LENGTH, EVENT_TOPIC_DESCRIPTION_MAX_LENGTH } from '@local/utils/rules';

interface Props {
    topic: Topic;
}

export function EditTopic({ topic: oldTopic }: Props) {
    const { setTopics, isReadingMaterialsUploaded } = React.useContext(TopicContext);
    const [isEditDialogOpen, openEditDialog, closeEditDialog] = useResponsiveDialog();
    const [topic, setTopic] = React.useState<Topic>(oldTopic);
    const { updateTopic } = useUpdateTopic();

    const handleCloseEditDialog = () => {
        closeEditDialog();
    };

    const handleUpdateTopic = () => {
        const newTopic = topic;

        const onSuccess = () => {
            setTopics((prev) => {
                const index = prev.findIndex((_topic) => _topic.topic === oldTopic.topic);
                if (index === -1) return prev;
                const newTopics = [...prev];
                newTopics[index] = newTopic;
                return newTopics;
            });
            closeEditDialog();
        };
        if (isReadingMaterialsUploaded) updateTopic(oldTopic, newTopic, onSuccess);
        else onSuccess();
    };

    const topicError = React.useMemo(() => {
        if (topic.topic.length > EVENT_TOPIC_TOPIC_MAX_LENGTH) return 'Topic is too long';
        if (topic.topic.length === 0) return 'Topic is required';
        return '';
    }, [topic.topic]);

    const descriptionError = React.useMemo(() => {
        if (topic.description.length > EVENT_TOPIC_DESCRIPTION_MAX_LENGTH) return 'Description is too long';
        if (topic.description.length === 0) return 'Description is required';
        return '';
    }, [topic.description]);

    const isInputValid = React.useMemo(() => {
        return topicError === '' && descriptionError === '';
    }, [topicError, descriptionError]);

    return (
        <React.Fragment>
            <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} maxWidth='sm' fullWidth>
                <DialogTitle>Edit Topic</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} paddingTop='1rem'>
                        <TextField
                            required
                            label='Topic'
                            value={topic.topic}
                            error={topicError !== ''}
                            helperText={topicError}
                            onChange={(e) =>
                                setTopic((prev) => ({
                                    topic: e.target.value,
                                    description: prev?.description || '',
                                }))
                            }
                        />
                        <Typography
                            variant='caption'
                            color={topic.topic.length > EVENT_TOPIC_TOPIC_MAX_LENGTH ? 'red' : 'black'}
                            sx={{
                                display: 'block',
                                textAlign: 'right',
                            }}
                        >
                            {topic.topic.length}/{EVENT_TOPIC_TOPIC_MAX_LENGTH}
                        </Typography>
                        <TextField
                            required
                            multiline
                            minRows={3}
                            label='Description'
                            value={topic.description}
                            error={descriptionError !== ''}
                            helperText={descriptionError}
                            onChange={(e) =>
                                setTopic((prev) => ({ topic: prev?.topic || '', description: e.target.value }))
                            }
                        />
                        <Typography
                            variant='caption'
                            color={topic.description.length > EVENT_TOPIC_DESCRIPTION_MAX_LENGTH ? 'red' : 'black'}
                            sx={{
                                display: 'block',
                                textAlign: 'right',
                            }}
                        >
                            {topic.description.length}/{EVENT_TOPIC_DESCRIPTION_MAX_LENGTH}
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color='inherit' onClick={closeEditDialog}>
                        Cancel
                    </Button>
                    <Button disabled={!isInputValid} color='primary' variant='contained' onClick={handleUpdateTopic}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            <Tooltip title='Edit Topic'>
                <IconButton onClick={openEditDialog}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}
