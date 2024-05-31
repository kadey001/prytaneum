import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { Topic } from './types';
import { useResponsiveDialog } from '@local/components';
import { TopicContext } from './EventTopicSettings';
import { useDeleteTopic } from './hooks/useDeleteTopic';

interface Props {
    topic: Topic;
}

export function DeleteTopic({ topic }: Props) {
    const { setTopics, isReadingMaterialsUploaded } = React.useContext(TopicContext);
    const [isOpen, openDialog, closeDialog] = useResponsiveDialog();
    const { deleteTopic } = useDeleteTopic();

    const handleDeleteTopic = () => {
        const onSuccess = () => {
            setTopics((prev) => prev.filter((_topic) => _topic.topic !== topic.topic));
            closeDialog();
        };
        if (isReadingMaterialsUploaded) deleteTopic(topic, onSuccess);
        else onSuccess();
    };

    return (
        <React.Fragment>
            <Dialog open={isOpen} onClose={closeDialog} maxWidth='sm' fullWidth>
                <DialogTitle>Delete Topic</DialogTitle>
                <DialogContent>
                    <Typography variant='body1'>
                        Are you sure you want to delete the topic: <b>{topic.topic}</b>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Stack direction='row' spacing={2}>
                        <Stack direction='row' spacing={2}>
                            <Button onClick={closeDialog} color='inherit'>
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteTopic} variant='contained' color='error'>
                                Delete
                            </Button>
                        </Stack>
                    </Stack>
                </DialogActions>
            </Dialog>
            <Tooltip title='Delete'>
                <IconButton onClick={openDialog}>
                    <DeleteIcon color='error' />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}
