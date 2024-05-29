import * as React from 'react';
import { graphql, useMutation } from 'react-relay';
// import { GraphQLSubscriptionConfig } from 'relay-runtime';

// import type { useOnDeckEnqueuedSubscription } from '@local/__generated__/useOnDeckEnqueuedSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { Question, Topic } from '../../types';
import { useSnack } from '@local/core';
import { calculateOnDeckEnqueuePosition, onDeckEnqueuedMutationUpdater } from './utils';
import { useOnDeckEnqueuedMutation } from '@local/__generated__/useOnDeckEnqueuedMutation.graphql';

export const USE_ON_DECK_ENQUEUED_MUTATION = graphql`
    mutation useOnDeckEnqueuedMutation($input: AddQuestionToOnDeck!) {
        addQuestionToOnDeck(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    position
                    onDeckPosition
                }
            }
        }
    }
`;

interface Props {
    connections: string[];
    topics: readonly Topic[];
}

export function useOnDeckEnqueued({ topics }: Props) {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();

    type AddQuestionToOnDeckInput = {
        questionId: string;
        eventId: string;
        list: Question[];
        movedQuestionIndex: number; // Index of where the question was moved to in the on deck list
        cursor: string;
        currentQuestionPosition: number;
    };

    const [commit] = useMutation<useOnDeckEnqueuedMutation>(USE_ON_DECK_ENQUEUED_MUTATION);
    const addQuestionToOnDeck = React.useCallback(
        (input: AddQuestionToOnDeckInput) => {
            const { list, movedQuestionIndex, currentQuestionPosition } = input;
            const newPosition = calculateOnDeckEnqueuePosition({ list, movedQuestionIndex, currentQuestionPosition });
            if (newPosition <= -1) {
                displaySnack('Invalid new position', { variant: 'error' });
            }

            commit({
                variables: {
                    input: {
                        eventId,
                        questionId: input.questionId,
                        newPosition: newPosition.toString(),
                    },
                },
                onCompleted: (response) => {
                    if (response.addQuestionToOnDeck.isError) {
                        return displaySnack(response.addQuestionToOnDeck.message, { variant: 'error' });
                    }
                },
                onError: (error) => {
                    displaySnack(error.message, { variant: 'error' });
                },
                updater: (store) => {
                    onDeckEnqueuedMutationUpdater({ store, eventId, questionId: input.questionId, topics });
                },
                optimisticResponse: {
                    addQuestionToOnDeck: {
                        isError: false,
                        message: '',
                        body: {
                            cursor: input.cursor,
                            node: {
                                id: input.questionId,
                                position: '-1',
                                onDeckPosition: newPosition.toString(),
                            },
                        },
                    },
                },
                optimisticUpdater: (store) => {
                    onDeckEnqueuedMutationUpdater({ store, eventId, questionId: input.questionId, topics });
                },
            });
        },
        [commit, displaySnack, eventId, topics]
    );

    return { addQuestionToOnDeck };
}
