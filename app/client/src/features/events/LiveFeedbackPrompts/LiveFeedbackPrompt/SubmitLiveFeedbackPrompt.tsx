import * as React from 'react';
import { Button, DialogContent } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LockIcon from '@mui/icons-material/Lock';
import { useMutation, graphql } from 'react-relay';

import type { SubmitLiveFeedbackPromptMutation } from '@local/__generated__/SubmitLiveFeedbackPromptMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useUser } from '@local/features/accounts';
import { LiveFeedbackPromptForm, TLiveFeedbackPromptFormState } from './LiveFeedbackPromptForm';
import { useSnack } from '@local/core';
import { FEEDBACK_PROMPT_MAX_LENGTH } from '@local/utils/rules';
import { isURL } from '@local/utils';
import type { FeedbackDashboardTab } from './LiveFeedbackPromptList';
import { useEvent } from '@local/features/events';

export const SUBMIT_LIVE_FEEDBACK_PROMPT_MUTATION = graphql`
    mutation SubmitLiveFeedbackPromptMutation($input: CreateFeedbackPrompt!, $connections: [ID!]!) {
        createFeedbackPrompt(input: $input) {
            isError
            message
            body @appendEdge(connections: $connections) {
                cursor
                node {
                    id
                    prompt
                    isVote
                    isOpenEnded
                    isMultipleChoice
                    multipleChoiceOptions
                    createdAt
                    isDraft
                    ...useLiveFeedbackPromptResponsesFragment
                }
            }
        }
    }
`;

interface Props {
    className?: string;
    connections: string[];
    selectedTab: FeedbackDashboardTab;
}

export function SubmitLiveFeedbackPrompt({ className, connections, selectedTab }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const { user } = useUser();
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<SubmitLiveFeedbackPromptMutation>(SUBMIT_LIVE_FEEDBACK_PROMPT_MUTATION);

    function handleSubmit(form: TLiveFeedbackPromptFormState, isDraft: boolean = false) {
        try {
            // Validate length and url presence before submitting to avoid unessisary serverside validation
            if (form.prompt.length > FEEDBACK_PROMPT_MAX_LENGTH) throw new Error('Prompt is too long!');
            if (isURL(form.prompt)) throw new Error('no links are allowed!');
            commit({
                variables: { input: { ...form, eventId, isDraft }, connections },
                onCompleted(payload) {
                    try {
                        if (payload.createFeedbackPrompt.isError) throw new Error(payload.createFeedbackPrompt.message);
                        close();
                        displaySnack('Prompt submitted successfully!', { variant: 'success' });
                    } catch (err) {
                        if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
                        else displaySnack('Something went wrong!');
                    }
                },
            });
        } catch (err) {
            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
            else displaySnack('Something went wrong!');
        }
    }

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <LiveFeedbackPromptForm onCancel={close} onSubmit={handleSubmit} selectedTab={selectedTab} />
                </DialogContent>
            </ResponsiveDialog>

            <Button
                className={className}
                disabled={!user}
                variant='contained'
                color='primary'
                onClick={open}
                startIcon={user ? <QuestionAnswerIcon /> : <LockIcon />}
            >
                Prompt Feedback
            </Button>
        </React.Fragment>
    );
}
