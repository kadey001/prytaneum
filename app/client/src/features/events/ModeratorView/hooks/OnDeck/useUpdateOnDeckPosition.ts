import React from 'react';
import { useMutation } from 'react-relay';
import { graphql } from 'relay-runtime';

import type { useUpdateOnDeckPositionMutation } from '@local/__generated__/useUpdateOnDeckPositionMutation.graphql';
import { Question } from '../../types';
import { calculateUpdateOnDeckPosition } from './utils';
import { useSnack } from '@local/core';

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
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useUpdateOnDeckPositionMutation>(USE_UPDATE_ON_DECK_POSITION);

    type UpdateOnDeckPositionInput = {
        question: Question;
        list: Question[];
        sourceIdx: number;
        destinationIdx: number; // the index where the question is being moved to
        currentQuestionPosition: number;
    };

    const updateOnDeckPosition = React.useCallback(
        (input: UpdateOnDeckPositionInput) => {
            const { question, list, sourceIdx, destinationIdx, currentQuestionPosition } = input;
            // No need to update if the source and destination are the same
            if (sourceIdx === destinationIdx) return;
            const newPosition = calculateUpdateOnDeckPosition(list, destinationIdx, currentQuestionPosition);

            commit({
                variables: {
                    input: {
                        eventId,
                        questionId: question.id.toString(),
                        newPosition: newPosition.toString(),
                    },
                },
                onCompleted: (response) => {
                    if (response.updateOnDeckPosition.isError) {
                        return displaySnack(response.updateOnDeckPosition.message, { variant: 'error' });
                    }
                },
                onError: (error) => {
                    displaySnack(error.message, { variant: 'error' });
                },
                optimisticResponse: {
                    updateOnDeckPosition: {
                        isError: false,
                        message: '',
                        body: {
                            cursor: question.cursor,
                            node: {
                                id: question.id.toString(),
                                position: '-1',
                                onDeckPosition: newPosition.toString(),
                                topics: question.topics,
                            },
                        },
                    },
                },
            });
        },
        [commit, displaySnack, eventId]
    );

    return {
        updateOnDeckPosition,
    };
}
