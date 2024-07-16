import * as React from 'react';
import { Button, Grid, DialogContent } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { StyledDialogTitle, StyledDialog } from '@local/components';
import { useLiveFeedbackPromptsFragment$key } from '@local/__generated__/useLiveFeedbackPromptsFragment.graphql';
import { FeedbackPromptsList } from './LiveFeedbackPrompt/FeedbackPromptsList';

interface ShareFeedbackResultsProps {
    fragmentRef: useLiveFeedbackPromptsFragment$key;
}

/**
 * A modal that opens when moderators click on the "Share Feedback Results" button
 * A list of previous feedback prompts are displayed, and moderators can click on each one to see the responses
 * A button can be pressed to share the results card for one of the prompts with the audience
 */
export function ShareFeedbackResults({ fragmentRef }: ShareFeedbackResultsProps) {
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <Button variant='contained' color='primary' onClick={handleOpen} startIcon={<DashboardIcon />}>
                Feedback Dashboard
            </Button>
            <StyledDialog
                fullScreen={fullscreen}
                maxWidth='md'
                fullWidth
                scroll='paper'
                open={open}
                onClose={handleClose}
                aria-labelledby='share-feedback-results-dialog'
            >
                <StyledDialogTitle id='share-feedback-results-dialog-title' onClose={handleClose}>
                    Feedback Dashboard
                </StyledDialogTitle>
                <DialogContent dividers>
                    <Grid container direction='column' alignItems='center'>
                        <FeedbackPromptsList fragmentRef={fragmentRef} isShareResultsOpen={open} />
                    </Grid>
                </DialogContent>
            </StyledDialog>
        </React.Fragment>
    );
}
