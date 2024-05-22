import React from 'react';
import { useMutation } from 'react-relay';
import { graphql } from 'relay-runtime';

import type { useUpdateOnDeckPositionMutation } from '@local/__generated__/useUpdateOnDeckPositionMutation.graphql';
import { Question } from '../../types';

export const USE_UPDATE_ON_DECK_POSITION = graphql`
    mutation useUpdateOnDeckPositionMutation($input: UpdateOnDeckPosition!) @raw_response_type {
        updateOnDeckPosition(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    question
                    createdBy {
                        firstName
                    }
                    position
                }
            }
        }
    }
`;

interface Props {
    eventId: string;
}

export function useUpdateOnDeckPosition({ eventId }: Props) {
    const [commit] = useMutation<useUpdateOnDeckPositionMutation>(USE_UPDATE_ON_DECK_POSITION);

    type UpdateOnDeckPositionInput = {
        questionId: string;
        list: Question[];
        sourceIdx: number;
        destinationIdx: number;
        minPosition: number;
    };

    const updateOnDeckPosition = React.useCallback(
        (input: UpdateOnDeckPositionInput) => {
            const { list, sourceIdx, destinationIdx, minPosition } = input;
            const isMovingTowardsStart = sourceIdx > destinationIdx;
            const maxIdx = isMovingTowardsStart ? destinationIdx : destinationIdx + 1;
            const minIdx = maxIdx - 1;

            // if maxIdx === list.length, then we're moving to the end of the list, hence special logic
            // NOTE: race condition, since we're using time for ordering, then adding 1000 ms (1s) will mean that the order
            // at the very end may be messed up, but that's okay, the start is what's important
            const lastQuestion = list[list.length - 1];
            const endPosition = lastQuestion.onDeckPosition;
            const maxIndexPosition = list[maxIdx].onDeckPosition;
            const maxPos =
                maxIdx === list.length ? parseInt(endPosition ?? '0') + 1000 : parseInt(maxIndexPosition ?? '0');

            // if minIdx === -1, then we're moving to the start of the list, hence special logic
            const minIndexPosition = parseInt(list[minIdx]?.onDeckPosition ?? '0');
            const minPos = minIdx === -1 ? minPosition : minIndexPosition;

            if (!maxPos || minPos === null) return;

            const newPosition = Math.round(minPos + (maxPos - minPos) / 2);

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
        [commit, eventId]
    );

    return {
        updateOnDeckPosition,
    };
}
