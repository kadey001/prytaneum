import * as React from 'react';
import { Button, DialogContent } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LockIcon from '@mui/icons-material/Lock';
import { useMutation, graphql } from 'react-relay';
import { toGlobalId } from 'graphql-relay';

import type { AskQuestionMutation } from '@local/__generated__/AskQuestionMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useSnack } from '@local/core';
import { useUser } from '@local/features/accounts';
import * as ga from '@local/utils/ga/index';
import { isURL } from '@local/utils';
import { QUESTIONS_MAX_LENGTH } from '@local/utils/rules';
import { QuestionForm, TQuestionFormState } from '../QuestionForm';
import { generateUUID } from '@local/core/utils';
import { useEventInfoPopper } from '@local/components/EventInfoPoppers';

export interface AskQuestionProps {
    className?: string;
    eventId: string;
    connections: string[];
    viewerOnly?: boolean;
}

export const ASK_QUESTION_MUTATION = graphql`
    mutation AskQuestionMutation($input: CreateQuestion!, $connections: [ID!]!, $lang: String!) @raw_response_type {
        createQuestion(input: $input) {
            isError
            message
            body @prependEdge(connections: $connections) {
                cursor
                node {
                    id
                    question
                    position
                    onDeckPosition
                    createdBy {
                        firstName
                    }
                    refQuestion {
                        ...QuestionQuoteFragment @arguments(lang: $lang)
                    }
                    ...QuestionActionsFragment @arguments(lang: $lang)
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

function AskQuestion({ className, eventId, connections }: AskQuestionProps) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [isLoading, setIsLoading] = React.useState(false);
    const { user } = useUser();
    const [commit] = useMutation<AskQuestionMutation>(ASK_QUESTION_MUTATION);
    const { displaySnack } = useSnack();
    const [currentPopper] = useEventInfoPopper();

    function handleSubmit(form: TQuestionFormState) {
        try {
            // Used for optimistic update
            const generatedId = toGlobalId('EventQuestion', generateUUID());
            // Validate length and url presence before submitting to avoid unessisary serverside validation
            if (form.question.length > QUESTIONS_MAX_LENGTH) throw new Error('Question is too long!');
            if (isURL(form.question)) throw new Error('no links are allowed!');
            setIsLoading(true);
            commit({
                variables: {
                    input: { ...form, eventId, isFollowUp: false, isQuote: false },
                    connections,
                    lang: user?.preferredLang || 'EN',
                },
                onCompleted(payload) {
                    try {
                        if (payload.createQuestion.isError) throw new Error(payload.createQuestion.message);
                        ga.event({
                            action: 'submit_question',
                            category: 'questions',
                            label: 'live event',
                            value: form.question,
                        });
                        if (isOpen) close();
                        setIsLoading(false);
                        displaySnack('Question submitted!', { variant: 'success' });
                    } catch (err) {
                        setIsLoading(false);
                        displaySnack(err instanceof Error ? err.message : 'Something went wrong!', {
                            variant: 'error',
                        });
                    }
                },
                onError(err) {
                    setIsLoading(false);
                    displaySnack(err.message, { variant: 'error' });
                },
                optimisticUpdater: () => {
                    if (isOpen) close();
                },
                optimisticResponse: {
                    createQuestion: {
                        isError: false,
                        message: '',
                        body: {
                            cursor: new Date().getTime().toString(),
                            node: {
                                id: generatedId,
                                createdAt: new Date(),
                                question: form.question,
                                lang: user?.preferredLang || 'EN',
                                questionTranslated: form.question,
                                position: '-1',
                                onDeckPosition: '-1',
                                createdBy: {
                                    id: user?.id || '',
                                    firstName: user?.firstName || '',
                                    lastName: user?.lastName || '',
                                    avatar: user?.avatar || '',
                                },
                                topics: [],
                                likedByCount: 0,
                                refQuestion: null,
                                isLikedByViewer: false,
                            },
                        },
                    },
                },
            });
        } catch (err) {
            setIsLoading(false);
            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
            else displaySnack('Something went wrong!');
        }
    }

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <QuestionForm onCancel={close} onSubmit={handleSubmit} isLoading={isLoading} />
                </DialogContent>
            </ResponsiveDialog>
            <Button
                className={className}
                fullWidth
                disabled={!user}
                variant='contained'
                color='primary'
                onClick={open}
                startIcon={user ? <QuestionAnswerIcon /> : <LockIcon />}
                sx={{
                    minWidth: '150px',
                    zIndex: (theme) => (currentPopper === 1 ? theme.zIndex.drawer + 1 : 0),
                }}
            >
                {user ? 'Ask My Question' : 'Sign in to ask a question'}
            </Button>
        </React.Fragment>
    );
}

export default React.memo(AskQuestion);
