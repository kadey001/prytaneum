import React from 'react';
import { useMutation } from 'react-relay';
import { graphql } from 'relay-runtime';

import type { useUpdateOnDeckPositionMutation } from '@local/__generated__/useUpdateOnDeckPositionMutation.graphql';
import { Question } from '../../types';

export const USE_UPDATE_ON_DECK_POSITION = graphql`
    mutation useUpdateOnDeckPositionMutation($input: UpdateOnDeckPosition!) {
        updateOnDeckPosition(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    position
                    onDeckPosition
                    topics {
                        topic
                        description
                        position
                    }
                }
            }
        }
    }
`;

// TODO: Implement subscription
// export const USE_UPDATE_ON_DECK_POSITION_SUBSCRIPTION = graphql`
//     subscription useUpdateOnDeckPositionSubscription($eventId: ID!) {
//         onDeckPositionUpdated(eventId: $eventId) {
//             cursor
//             node {
//                 id
//                 position
//                 onDeckPosition
//                 topics {
//                     topic
//                     description
//                     position
//                 }
//             }
//         }
//     }
// `;

interface Props {
    eventId: string;
}

export function useUpdateOnDeckPosition({ eventId }: Props) {
    const [commit] = useMutation<useUpdateOnDeckPositionMutation>(USE_UPDATE_ON_DECK_POSITION);

    // NOTE: At this point the list is already updated on client
    // So the destIndex is the list should give us the moved question (but pos is not updated yet)
    // Can use this index to find relative question's positions
    const calculatePosition = React.useCallback(
        (
            list: Question[],
            // sourceIndex: number, // Source index is where the question is coming from
            destIndex: number, // Destination index is where the question is going to
            currentQuestionPosition: number // The current question's position (new pos never smaller than this)
        ) => {
            // Since we are re-ordering, we can assume there are at least 2 questions to work with.
            // First handle if being moved to the top of the list
            if (destIndex === 0) {
                // Should be a question after this, but need to check if a current question exists first
                const nextQuestion = list[1];
                const nextQuestionPosition = parseInt(nextQuestion.onDeckPosition);
                if (currentQuestionPosition === -1) {
                    return nextQuestionPosition - 1000;
                } else {
                    // Can use both positions to calculate new position in between
                    const diff = Math.abs(nextQuestionPosition - currentQuestionPosition);
                    const halfDiff = Math.round(diff / 2);
                    return currentQuestionPosition + halfDiff;
                }
            }

            // Handle if being moved to the bottom of the list
            if (destIndex === list.length - 1) {
                // Should be a question before this, can use that to calculate new position
                const prevQuestion = list[list.length - 2];
                const prevQuestionPosition = parseInt(prevQuestion.onDeckPosition);
                return prevQuestionPosition + 1000;
            }

            // Handle if being moved to the middle of the list
            const nextQuestion = list[destIndex + 1];
            const prevQuestion = list[destIndex - 1];
            // console.log('Next Question:', nextQuestion);
            // console.log('Prev Question:', prevQuestion);
            const nextQuestionPosition = parseInt(nextQuestion.onDeckPosition);
            const prevQuestionPosition = parseInt(prevQuestion.onDeckPosition);
            const diff = Math.abs(nextQuestionPosition - prevQuestionPosition);
            const halfDiff = Math.round(diff / 2);
            return prevQuestionPosition + halfDiff;
        },
        []
    );

    type UpdateOnDeckPositionInput = {
        questionId: string;
        list: Question[];
        sourceIdx: number;
        destinationIdx: number; // the index where the question is being moved to
        currentQuestionPosition: number;
    };

    const updateOnDeckPosition = React.useCallback(
        (input: UpdateOnDeckPositionInput) => {
            const { list, sourceIdx, destinationIdx, currentQuestionPosition } = input;
            // No need to update if the source and destination are the same
            if (sourceIdx === destinationIdx) return;
            const newPosition = calculatePosition(list, destinationIdx, currentQuestionPosition);

            commit({
                variables: {
                    input: {
                        eventId,
                        questionId: input.questionId,
                        newPosition: newPosition.toString(),
                    },
                },
            });
        },
        [calculatePosition, commit, eventId]
    );

    return {
        updateOnDeckPosition,
    };
}
