import React from 'react';
import { useMutation } from 'react-relay';
import { graphql } from 'relay-runtime';

import type { useUpdateTopicQueuePositionMutation } from '@local/__generated__/useUpdateTopicQueuePositionMutation.graphql';
import { Question } from '../../types';

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

// TODO: Implement subscription
// export const USE_UPDATE_TOPIC_QUEUE_POSITION_SUBSCRIPTION = graphql`
//     subscription useUpdateTopicQueuePositionSubscription($eventId: ID!) {
//         topicQueuePositionUpdated(eventId: $eventId) {
//             cursor
//             node {
//                 id
//                 position
//                 topics {
//                     position
//                 }
//             }
//         }
//     }
// `;

interface Props {
    eventId: string;
    topic: string;
}

export function useUpdateTopicQueuePosition({ eventId, topic }: Props) {
    const [commit] = useMutation<useUpdateTopicQueuePositionMutation>(USE_UPDATE_ON_DECK_POSITION);

    // Gets the position of the question relative to what toic queue it is in
    // Otherwise, just use the question's position as it should be in the default queue
    const getTopicListPosition = (question: Question, currentTopic: string) => {
        const topicPosition = question?.topics?.find((t) => t.topic === currentTopic)?.position;
        if (!topicPosition) return parseInt(question.position);
        return parseInt(topicPosition);
    };

    // NOTE: At this point the list is already updated on client
    // So the destIndex is the list should give us the moved question (but pos is not updated yet)
    // Can use this index to find relative question's positions
    const calculateTopicQueuePosition = React.useCallback(
        (
            list: Question[],
            destIndex: number, // Destination index is where the question is going to
            currentQuestionPosition: number, // The current question's position (new pos never smaller than this)
            currentTopic: string
        ) => {
            // Since we are re-ordering, we can assume there are at least 2 questions to work with.
            // First handle if being moved to the top of the list
            if (destIndex === 0) {
                // Should be a question after this, but need to check if a current question exists first
                const nextQuestion = list[1];
                const nextQuestionTopicPosition = getTopicListPosition(nextQuestion, currentTopic);
                if (currentQuestionPosition === -1) {
                    return nextQuestionTopicPosition - 1000;
                } else {
                    // Can use both positions to calculate new position in between
                    const diff = Math.abs(nextQuestionTopicPosition - currentQuestionPosition);
                    const halfDiff = Math.round(diff / 2);
                    return currentQuestionPosition + halfDiff;
                }
            }

            // Handle if being moved to the bottom of the list
            if (destIndex === list.length - 1) {
                // Should be a question before this, can use that to calculate new position
                const prevQuestion = list[list.length - 2];
                const prevQuestionTopicPosition = getTopicListPosition(prevQuestion, currentTopic);
                return prevQuestionTopicPosition + 1000;
            }

            // Handle if being moved to the middle of the list
            const nextQuestion = list[destIndex + 1];
            const prevQuestion = list[destIndex - 1];

            const nextQuestionTopicPosition = getTopicListPosition(nextQuestion, currentTopic);
            const prevQuestionTopicPosition = getTopicListPosition(prevQuestion, currentTopic);

            const diff = Math.abs(nextQuestionTopicPosition - prevQuestionTopicPosition);
            const halfDiff = Math.round(diff / 2);
            return prevQuestionTopicPosition + halfDiff;
        },
        []
    );

    type UpdateTopicQueuePositionInput = {
        questionId: string;
        list: Question[];
        sourceIdx: number;
        destinationIdx: number; // the index where the question is being moved to
        currentQuestionPosition: number;
        currentTopic: string;
    };

    const updateTopicQueuePosition = React.useCallback(
        (input: UpdateTopicQueuePositionInput) => {
            const { list, sourceIdx, destinationIdx, currentQuestionPosition, currentTopic } = input;
            // No need to update if the source and destination are the same
            if (sourceIdx === destinationIdx) return;
            const newPosition = calculateTopicQueuePosition(
                list,
                destinationIdx,
                currentQuestionPosition,
                currentTopic
            );

            commit({
                variables: {
                    input: {
                        eventId,
                        questionId: input.questionId,
                        topic,
                        newPosition: newPosition.toString(),
                    },
                },
            });
        },
        [calculateTopicQueuePosition, commit, eventId, topic]
    );

    return {
        updateTopicQueuePosition,
    };
}
