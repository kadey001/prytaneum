import React from 'react';
import { graphql, useMutation } from 'react-relay';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useResponsiveDialog } from '@local/components';
import { LoadingButton } from '@local/components/LoadingButton';
import { EVENT_READING_MATERIALS_MAX_LENGTH } from '@local/utils/rules';
import { UploadReadingMaterialsMutation } from '@local/__generated__/UploadReadingMaterialsMutation.graphql';
import { Topic } from './types';

const UPLOAD_READING_MATERIALS = graphql`
    mutation UploadReadingMaterialsMutation($eventId: String!, $material: String!) {
        generateEventTopics(eventId: $eventId, material: $material) {
            body {
                topic
                description
            }
            isError
            message
        }
    }
`;

interface Props {
    onSuccess: () => void;
    setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export function UploadReadingMaterials({ onSuccess, setTopics }: Props) {
    const { displaySnack } = useSnack();
    const { eventId } = useEvent();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isOpen, openDialog, closeDialog] = useResponsiveDialog();
    const [readingMaterials, setReadingMaterials] = React.useState<string>('');
    const [commit] = useMutation<UploadReadingMaterialsMutation>(UPLOAD_READING_MATERIALS);

    const handleUpload = () => {
        try {
            setIsLoading(true);
            commit({
                variables: { eventId, material: readingMaterials },
                onCompleted: (response) => {
                    console.log('Response: ', response.generateEventTopics);
                    if (!response.generateEventTopics)
                        throw new Error('An error occurred while uploading reading materials.');
                    if (response.generateEventTopics.isError) {
                        displaySnack(response.generateEventTopics.message, { variant: 'error' });
                        setIsLoading(false);
                        return;
                    }
                    const topics = response.generateEventTopics.body as Topic[];
                    setTopics(topics);
                    displaySnack('Reading materials uploaded successfully', { variant: 'success' });
                    setReadingMaterials('');
                    setIsLoading(false);
                    onSuccess();
                    closeDialog();
                },
                onError: (error) => {
                    throw error;
                },
            });
        } catch (error) {
            console.error(error);
            if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
            else displaySnack('An error occurred while uploading reading materials.', { variant: 'error' });
            setIsLoading(false);
        }
    };

    const errorMessage = React.useMemo(() => {
        if (readingMaterials.length > EVENT_READING_MATERIALS_MAX_LENGTH) return 'Reading materials is too long.';
        if (!readingMaterials) return 'Reading materials is required.';
        return '';
    }, [readingMaterials]);

    // Add description for this step
    return (
        <React.Fragment>
            <Button variant='contained' onClick={openDialog}>
                Input Background Materials
            </Button>
            <Dialog open={isOpen} maxWidth='lg' fullWidth>
                <DialogTitle>Input Background Materials</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        multiline
                        minRows={10}
                        required
                        id='reading-materials'
                        label='Reading Materials'
                        type='text'
                        helperText={errorMessage}
                        error={Boolean(errorMessage)}
                        value={readingMaterials}
                        onChange={(e) => setReadingMaterials(e.target.value)}
                        fullWidth
                    />
                    <Typography
                        variant='body2'
                        color={readingMaterials.length > EVENT_READING_MATERIALS_MAX_LENGTH ? 'error' : 'inherit'}
                        sx={{ display: 'block', textAlign: 'right' }}
                    >
                        {readingMaterials.length}/{EVENT_READING_MATERIALS_MAX_LENGTH}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button color='inherit' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <LoadingButton loading={isLoading}>
                        <Button color='primary' disabled={Boolean(errorMessage) || isLoading} onClick={handleUpload}>
                            Upload
                        </Button>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}