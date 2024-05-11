import React from 'react';
import { useRouter } from 'next/router';
import { graphql, useFragment } from 'react-relay';

import {
    Grid,
    Button,
    Tooltip,
    IconButton,
    DialogContent,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Typography,
    FormHelperText,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useSnack } from '@local/core';
import { EventIssueGuideViewer } from './EventIssueGuideViewer';
import { EventIssueGuideSettingsFragment$key } from '@local/__generated__/EventIssueGuideSettingsFragment.graphql';
import { ResponsiveDialog } from '@local/components';

interface ReadingMaterialsEventSettingsProps {
    fragmentRef: EventIssueGuideSettingsFragment$key;
}

export const EVENT_ISSUE_GUIDE_SETTINGS_FRAGMENT = graphql`
    fragment EventIssueGuideSettingsFragment on Event {
        id
        title
        issueGuideUrl
    }
`;

export function EventIssueGuideSettings({ fragmentRef }: ReadingMaterialsEventSettingsProps) {
    const router = useRouter();
    const { id: eventId, issueGuideUrl, title } = useFragment(EVENT_ISSUE_GUIDE_SETTINGS_FRAGMENT, fragmentRef);
    const [pdfFile, setPDFFile] = React.useState<File | null>(null);
    const [isUploading, setIsUploading] = React.useState(false);
    const [isUrlDialogOpen, setIsUrlDialogOpen] = React.useState(false);
    const [newUrl, setNewUrl] = React.useState<string>('');
    const [isUpdatingUrl, setIsUpdatingUrl] = React.useState(false);
    const { displaySnack } = useSnack();

    const openDialog = React.useCallback(() => {
        setIsUrlDialogOpen(true);
    }, []);
    const closeDialog = React.useCallback(() => {
        setIsUrlDialogOpen(false);
    }, []);

    const setEventIssueGuideUrl = () => {
        setIsUpdatingUrl(true);
        const formData = new FormData();
        formData.append('eventId', eventId);
        formData.append('url', newUrl);
        fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL + '/set-issue-guide-url', {
            method: 'POST',
            body: formData,
        })
            .then((res) => {
                setIsUpdatingUrl(false);
                if (res.status === 200) {
                    res.json().then((data: unknown) => {
                        if (!data) {
                            displaySnack('Something went wrong, please try again later.', { variant: 'error' });
                            return;
                        }
                        const { isError, message } = data as { isError: boolean; message: string };
                        if (isError) displaySnack(message, { variant: 'error' });
                        else {
                            displaySnack('Issue Guide Uploaded.', { variant: 'success' });
                            // TODO: Update to refetch fragment instead of reloading page
                            router.reload();
                        }
                    });
                } else {
                    displaySnack('Issue Guide url failed to update.', { variant: 'error' });
                }
            })
            .catch((err) => {
                console.error(err);
                setIsUpdatingUrl(false);
            });
    };

    const attachPDF = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            // Validate csv file
            const limit = 5 * 1024 * 1024; // 5 MB
            if (e.target.files[0]?.size > limit) {
                displaySnack('File size too large. Max 5MB.', { variant: 'error' });
                const file = document.getElementById('issue-guide') as HTMLInputElement;
                file.value = file.defaultValue;
                return;
            }
            setPDFFile(e.target.files[0]);
        }
    };

    const uploadEventIssueGuide = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (pdfFile === null) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('eventId', eventId);
        formData.append('issue-guide', pdfFile);
        fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL + '/upload-issue-guide', {
            method: 'POST',
            body: formData,
        })
            .then((res) => {
                // Remove file from input upon success
                setPDFFile(null);
                const file = document.getElementById('issue-guide') as HTMLInputElement;
                file.value = file.defaultValue;
                setIsUploading(false);
                if (res.status === 200) {
                    res.json().then((data: unknown) => {
                        if (!data) {
                            displaySnack('Something went wrong, please try again later.', { variant: 'error' });
                            return;
                        }
                        const { isError, message } = data as { isError: boolean; message: string };
                        if (isError) displaySnack(message, { variant: 'error' });
                        else {
                            displaySnack('Issue Guide Uploaded.', { variant: 'success' });
                            router.reload();
                        }
                    });
                } else {
                    displaySnack('Issue Guide failed to upload.', { variant: 'error' });
                }
            })
            .catch((err) => {
                console.error(err);
                setIsUploading(false);
            });
    };

    const PDF_TOOLTIP_TEXT = 'File Must be a PDF. | NOTE: New uploads will replace any existing ones.';
    const URL_TOOLTIP_TEXT =
        'Instead of a PDF, you can add a URL to a site page with Issue Guide. NOTE: This will override any uploaded PDF.';

    return (
        <Grid container>
            <EventIssueGuideViewer url={issueGuideUrl} title={title} />
            <Grid container direction='row' alignItems='center' justifyContent='right'>
                <Tooltip title={PDF_TOOLTIP_TEXT} enterTouchDelay={0}>
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
                <input id='issue-guide' type='file' accept='.pdf' onChange={attachPDF} />
                <Button disabled={pdfFile === null || isUploading} onClick={uploadEventIssueGuide} variant='outlined'>
                    Upload Issue Guide
                </Button>
            </Grid>
            <Grid container direction='row' alignItems='center' justifyContent='right'>
                <Tooltip title={URL_TOOLTIP_TEXT} enterTouchDelay={0}>
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
                <Button onClick={openDialog} variant='outlined'>
                    Set Issue Guide URL
                </Button>
            </Grid>
            <ResponsiveDialog open={isUrlDialogOpen} onClose={closeDialog}>
                <DialogContent>
                    <Grid container direction='column' alignItems='center'>
                        <Typography marginBottom='1rem' variant='h5'>
                            Set Issue Guide URL
                        </Typography>
                        <FormControl required fullWidth variant='outlined'>
                            <InputLabel>Url</InputLabel>
                            <OutlinedInput
                                id='issue-guide-url-input'
                                label='Issue Guide URL'
                                name='title'
                                // error={Boolean(errors.title)}
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <Typography
                                            variant='caption'
                                            color={newUrl.length > 500 ? 'red' : 'black'}
                                            sx={{
                                                display: 'block',
                                                textAlign: 'right',
                                            }}
                                        >
                                            {newUrl.length}/{500}
                                        </Typography>
                                    </InputAdornment>
                                }
                                aria-describedby='issue-guide-url-input'
                                aria-label='Issue Guide URL'
                            />
                            <FormHelperText style={{ color: 'red' }}></FormHelperText>
                        </FormControl>
                        <Button disabled={isUpdatingUrl} onSubmit={setEventIssueGuideUrl} variant='outlined'>
                            Set
                        </Button>
                    </Grid>
                </DialogContent>
            </ResponsiveDialog>
        </Grid>
    );
}
