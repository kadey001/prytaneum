import React from 'react';
import { useMutation } from 'react-relay';
import { graphql } from 'relay-runtime';

import { useSnack } from '@local/core';
import type { useUpdateTopicQueuePositionMutation } from '@local/__generated__/useUpdateTopicQueuePositionMutation.graphql';
import { Question } from '../../types';
import { calculateUpdatedTopicQueuePosition } from './utils';

export const USE_UPDATE_ON_DECK_POSITION = graphql`
    mutation useUpdateTopicQueuePositionMutation($input: UpdateTopicQueuePosition!) {
        updateTopicQueuePosition(input: $input) {
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

interface Props {
    eventId: string;
    topic: string;
}

export function useUpdateTopicQueuePosition({ eventId, topic }: Props) {
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useUpdateTopicQueuePositionMutation>(USE_UPDATE_ON_DECK_POSITION);

    type UpdateTopicQueuePositionInput = {
        question: Question;
        list: Question[];
        sourceIdx: number;
        destinationIdx: number; // the index where the question is being moved to
        currentQuestionPosition: number;
        currentTopic: string;
    };

    const updateTopicQueuePosition = React.useCallback(
        (input: UpdateTopicQueuePositionInput) => {
            const { question, list, sourceIdx, destinationIdx, currentQuestionPosition, currentTopic } = input;
            // No need to update if the source and destination are the same
            if (sourceIdx === destinationIdx) return;
            const newPosition = calculateUpdatedTopicQueuePosition({
                list,
                destinationIdx,
                currentQuestionPosition,
                currentTopic,
            });

            commit({
                variables: {
                    input: {
                        eventId,
                        questionId: question.id.toString(),
                        topic,
                        newPosition: newPosition.toString(),
                    },
                },
                onCompleted: (response) => {
                    if (response.updateTopicQueuePosition.isError) {
                        return displaySnack(response.updateTopicQueuePosition.message, { variant: 'error' });
                    }
                },
                onError: (error) => {
                    displaySnack(error.message, { variant: 'error' });
                },
                optimisticResponse: {
                    updateTopicQueuePosition: {
                        isError: false,
                        message: '',
                        body: {
                            cursor: question.cursor,
                            node: {
                                id: question.id.toString(),
                                position: newPosition.toString(),
                                onDeckPosition: '-1',
                                topics:
                                    topic !== 'default'
                                        ? [{ topic, description: '', position: newPosition.toString() }]
                                        : null,
                            },
                        },
                    },
                },
            });
        },
        [commit, displaySnack, eventId, topic]
    );

    return {
        updateTopicQueuePosition,
    };
}
