import React from 'react';
import {
    Chip,
    Stack,
    Button,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Topic } from './types';
import { useResponsiveDialog } from '@local/components';
import { useLockTopics } from './hooks/useLockTopics';

interface Props {
    selectedTopics: Topic[];
    setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
    setSelectedTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export function LockTopics({ selectedTopics, setTopics, setSelectedTopics }: Props) {
    const theme = useTheme();
    const lgBreakpointDown = useMediaQuery(theme.breakpoints.down('lg'));
    const [isConfirmDialogOpen, openConfirmDialog, closeConfirmDialog] = useResponsiveDialog();
    const { lockTopics } = useLockTopics();

    const handleCloseConfirmDialog = () => {
        closeConfirmDialog();
    };

    const onSuccess = React.useCallback(() => {
        setTopics((prev) => prev.map((topic) => ({ ...topic, locked: true })));
        setSelectedTopics([]);
    }, [setTopics, setSelectedTopics]);

    const handleLockTopics = () => {
        console.log('Locking topics: ', selectedTopics);
        lockTopics(selectedTopics, onSuccess);
        closeConfirmDialog();
    };

    return (
        <React.Fragment>
            <Dialog open={isConfirmDialogOpen} onClose={handleCloseConfirmDialog} maxWidth='sm' fullWidth>
                <DialogTitle>Are you sure you want to Lock the selected topics?</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} paddingTop='1rem'>
                        {selectedTopics.map((topic, index) => (
                            <Tooltip
                                key={index}
                                title={topic.description}
                                placement={lgBreakpointDown ? 'bottom' : 'right'}
                            >
                                <Chip label={topic.topic} color='success' />
                            </Tooltip>
                        ))}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color='inherit' onClick={closeConfirmDialog}>
                        Cancel
                    </Button>
                    <Button color='primary' onClick={handleLockTopics}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant='contained' onClick={openConfirmDialog}>
                Lock Topics
            </Button>
        </React.Fragment>
    );
}
