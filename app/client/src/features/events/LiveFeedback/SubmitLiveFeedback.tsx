import * as React from 'react';
import { Button, DialogContent } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LockIcon from '@mui/icons-material/Lock';
import { useMutation, graphql } from 'react-relay';

import type { SubmitLiveFeedbackMutation } from '@local/__generated__/SubmitLiveFeedbackMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useUser } from '@local/features/accounts';
import { isURL } from '@local/utils/index';
import { FEEDBACK_MAX_LENGTH } from '@local/utils/rules';
import { useSnack } from '@local/features/core/useSnack';
import { LiveFeedbackForm, TLiveFeedbackFormState } from './LiveFeedbackForm';
import { EventInfoPopperStage, useEventInfoPopper } from '@local/components/EventInfoPoppers';
import { useEvent } from '../useEvent';

interface Props {
    eventId: string;
}

export const SUBMIT_LIVE_FEEDBACK_MUTATION = graphql`
    mutation SubmitLiveFeedbackMutation($input: CreateFeedback!) {
        createFeedback(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    createdAt
                    message
                    createdBy {
                        id
                        firstName
                        lastName
                    }
                }
            }
        }
    }
`;

export function SubmitLiveFeedback({ eventId }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const { user } = useUser();
    const { isModerator } = useEvent();
    const [commit] = useMutation<SubmitLiveFeedbackMutation>(SUBMIT_LIVE_FEEDBACK_MUTATION);
    const { displaySnack } = useSnack();

    const [currentPopper] = useEventInfoPopper();

    function handleSubmit(form: TLiveFeedbackFormState) {
        try {
            // Validate length and url presence before submitting to avoid unessisary serverside validation
            if (form.message.length > FEEDBACK_MAX_LENGTH) throw new Error('Question is too long!');
            if (isURL(form.message)) throw new Error('No links are allowed!');
            commit({
                variables: { input: { ...form, eventId } },
                onCompleted(payload) {
                    try {
                        if (payload.createFeedback.isError) throw new Error(payload.createFeedback.message);
                        close();
                        displaySnack('Feedback submitted!', { variant: 'success' });
                    } catch (err) {
                        if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
                        else displaySnack('Something went wrong!', { variant: 'error' });
                    }
                },
            });
        } catch (err) {
            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
            else displaySnack('Something went wrong!', { variant: 'error' });
        }
    }

    const buttonText = React.useMemo(() => {
        if (!user) return 'Sign in to submit live feedback';
        if (isModerator) return 'Send Message';
        return 'Submit Live Feedback';
    }, [user, isModerator]);

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <LiveFeedbackForm onCancel={close} onSubmit={handleSubmit} />
                </DialogContent>
            </ResponsiveDialog>

            <Button
                aria-label='Submit Live Feedback'
                fullWidth
                disabled={!user}
                variant='contained'
                color='primary'
                onClick={open}
                startIcon={user ? <QuestionAnswerIcon /> : <LockIcon />}
                sx={{
                    minWidth: '150px',
                    zIndex: (theme) => (currentPopper === EventInfoPopperStage.Feedback ? theme.zIndex.drawer + 2 : 0),
                }}
            >
                {buttonText}
            </Button>
        </>
    );
}
