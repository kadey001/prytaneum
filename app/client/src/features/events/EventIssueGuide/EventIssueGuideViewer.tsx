import React from 'react';
import { Grid, Typography, Button, Dialog, AppBar, Toolbar, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArticleIcon from '@mui/icons-material/Article';

import { useSnack } from '@local/core';
import { PdfViewer } from '@local/components/PdfViewer';
import { useEvent } from '../useEvent';

interface EventIssueGuideViewerProps {
    url: string | null;
    title: string | null;
}

export function EventIssueGuideViewer({ url, title }: EventIssueGuideViewerProps) {
    const theme = useTheme();
    const lgBreakpointUp = useMediaQuery(theme.breakpoints.up('lg'));
    const { displaySnack } = useSnack();
    const { isModerator } = useEvent();
    const [open, setOpen] = React.useState(false);

    const openDialog = React.useCallback(() => setOpen(true), []);
    const handleClose = React.useCallback(() => setOpen(false), []);

    const issueGuideUrl = React.useMemo(() => {
        if (!url) return '';
        return url;
    }, [url]);

    const displayNoUrlSnack = React.useCallback(() => {
        displaySnack('No reading materials found', { variant: 'error' });
    }, [displaySnack]);

    const isPdf = React.useMemo(() => {
        return issueGuideUrl.includes('storage.googleapis.com');
    }, [issueGuideUrl]);

    if (isModerator && issueGuideUrl === '') {
        return (
            <Grid container alignItems='center' direction='column' paddingY='1.5rem'>
                <Typography variant='body1' align='center'>
                    No reading materials found, please upload some to view them here.
                </Typography>
            </Grid>
        );
    }

    const issueGuideText = title ? `${title} Issue Guide` : 'Issue Guide';

    return (
        <Grid container alignItems='center' direction='column'>
            {!isPdf && (
                <Grid container alignItems='center' direction='column'>
                    {issueGuideUrl === '' ? (
                        <Button onClick={displayNoUrlSnack} variant='contained'>
                            <ArticleIcon sx={{ marginRight: '0.5rem' }} />
                            Event Issue Guide
                        </Button>
                    ) : (
                        <a target='_blank' href={issueGuideUrl} rel='noopener noreferrer'>
                            <Button variant='contained'>
                                <ArticleIcon sx={{ marginRight: '0.5rem' }} />
                                Event Issue Guide
                            </Button>
                        </a>
                    )}
                </Grid>
            )}
            {isPdf && (
                <React.Fragment>
                    <Dialog fullScreen onClose={handleClose} open={open}>
                        <AppBar sx={{ position: 'relative' }}>
                            <Toolbar sx={{ justifyContent: 'space-between', paddingY: '1rem' }}>
                                <IconButton edge='end' color='inherit' onClick={handleClose} aria-label='close'>
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant={lgBreakpointUp ? 'h3' : 'h4'}>{issueGuideText}</Typography>
                                <div />
                            </Toolbar>
                        </AppBar>
                        <Grid container justifyContent='center'>
                            <Grid item>
                                <PdfViewer url={url} />
                            </Grid>
                        </Grid>
                    </Dialog>
                    <Button onClick={openDialog} variant='contained'>
                        <ArticleIcon sx={{ marginRight: '0.5rem' }} />
                        Event Issue Guide
                    </Button>
                </React.Fragment>
            )}
        </Grid>
    );
}
