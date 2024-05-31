import * as React from 'react';
import { Button, DialogContent } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LockIcon from '@mui/icons-material/Lock';
import { useMutation, graphql, ConnectionHandler } from 'react-relay';
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

export interface AskQuestionProps {
    className?: string;
    eventId: string;
    viewerOnly?: boolean;
}

export const ASK_QUESTION_MUTATION = graphql`
    mutation AskQuestionMutation($input: CreateQuestion!, $lang: String!) @raw_response_type {
        createQuestion(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    createdAt
                    question
                    ...QuestionContentFragment @arguments(lang: $lang)
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

function AskQuestion({ className, eventId, viewerOnly = false }: AskQuestionProps) {
    const [isOpen, open, close] = useResponsiveDialog();
    const [isLoading, setIsLoading] = React.useState(false);
    const { user } = useUser();
    const [commit] = useMutation<AskQuestionMutation>(ASK_QUESTION_MUTATION);
    const { displaySnack } = useSnack();

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
                updater: (store) => {
                    const eventRecord = store.get(eventId);
                    if (!eventRecord) return console.error('Update failed: Event record not found!');

                    let connectionId = '';
                    // If the viewerOnly flag is set, we want to update the viewerOnlyQuestionList instead
                    if (viewerOnly) {
                        connectionId =
                            ConnectionHandler.getConnectionID(
                                eventRecord.getDataID(),
                                'useViewerOnlyQuestionListFragment_questions'
                            ) + '(viewerOnly:true)';
                    } else {
                        connectionId = ConnectionHandler.getConnectionID(
                            eventRecord.getDataID(),
                            'useQuestionListFragment_questions'
                        );
                    }

                    // Need to do this workaround because the compiler in current version doesn't allow correctly naming the connection with _connection at the end.
                    const connectionRecord = store.get(connectionId);
                    if (!connectionRecord) return console.error('Update failed: Connection record not found!');

                    const payload = store.getRootField('createQuestion');
                    if (!payload) return console.error('Update failed: No payload found!');

                    const serverEdge = payload.getLinkedRecord('body');
                    if (!serverEdge) return console.error('Update failed: No edge found!');

                    const newEdge = ConnectionHandler.buildConnectionEdge(store, connectionRecord, serverEdge);
                    if (!newEdge) return console.error('Update failed: Could not build new edge!');

                    ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge);
                },
                optimisticUpdater: (store) => {
                    // Get the record for the Feedback object
                    const eventRecord = store.get(eventId);
                    if (!eventRecord) return console.error('Optimistic update failed: Event record not found!');

                    let connectionId = '';
                    // If the viewerOnly flag is set, we want to update the viewerOnlyQuestionList instead
                    if (viewerOnly) {
                        connectionId =
                            ConnectionHandler.getConnectionID(
                                eventRecord.getDataID(),
                                'useViewerOnlyQuestionListFragment_questions'
                            ) + '(viewerOnly:true)';
                    } else {
                        // Get the connection for the question list
                        connectionId = ConnectionHandler.getConnectionID(
                            eventRecord.getDataID(),
                            'useQuestionListFragment_questions'
                        );
                    }

                    // Need to do this workaround because the compiler in current version doesn't allow correctly naming the connection with _connection at the end.
                    const connectionRecord = store.get(connectionId);
                    if (!connectionRecord)
                        return console.error('Optimistic update failed: Connection record not found!');

                    // Create a new local EventQuestion from scratch
                    const id = `client:createQuestion:${generatedId}`;
                    const newQuestionRecord = store.create(id, 'EventQuestion');
                    const userRecord = store.get(user?.id || '');
                    if (!userRecord) return console.error('Optimistic update failed: User record not found!');
                    // Set the values for the new question (doesn't display values otherwise even though they are in the optimistic response for some reason)
                    newQuestionRecord.setValue(form.question, 'question');
                    newQuestionRecord.setValue(user?.preferredLang || 'EN', 'lang');
                    newQuestionRecord.setValue('', 'questionTranslated');
                    newQuestionRecord.setValue(new Date().toISOString(), 'createdAt');
                    newQuestionRecord.setLinkedRecord(userRecord, 'createdBy');

                    // Create new edge from scratch
                    const newEdge = ConnectionHandler.createEdge(
                        store,
                        connectionRecord,
                        newQuestionRecord,
                        'EventQuestionEdge' /* GraphQl Type for edge */
                    );

                    // Add edge to the start of the connection (top of the list)
                    ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge);
                    // Should be safe to close the dialog now that the optimistic question should be visible
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
                                createdAt: null,
                                question: form.question,
                                lang: user?.preferredLang || 'EN',
                                questionTranslated: '',
                                createdBy: {
                                    id: user?.id || '',
                                    firstName: user?.firstName || '',
                                    lastName: user?.lastName || '',
                                },
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
                }}
            >
                {user ? 'Ask My Question' : 'Sign in to ask a question'}
            </Button>
        </React.Fragment>
    );
}

export default React.memo(AskQuestion);
