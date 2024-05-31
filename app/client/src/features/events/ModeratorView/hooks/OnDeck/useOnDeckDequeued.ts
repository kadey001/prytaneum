import * as React from 'react';
import { graphql, useMutation, useSubscription } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useOnDeckDequeuedSubscription } from '@local/__generated__/useOnDeckDequeuedSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { Question, Topic } from '../../types';
import { calculateOnDeckDequeuePosition } from './utils';
import { useOnDeckDequeuedMutation } from '@local/__generated__/useOnDeckDequeuedMutation.graphql';
import { useSnack } from '@local/core';

export const USE_ON_DECK_DEQUEUED_MUTATION = graphql`
    mutation useOnDeckDequeuedMutation($input: RemoveQuestionFromOnDeck!) {
        removeQuestionFromOnDeck(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    position
                    onDeckPosition
                    topics {
                        position
                    }
                }
            }
        }
    }
`;

export const USE_ON_DECK_DEQUEUED = graphql`
    subscription useOnDeckDequeuedSubscription($eventId: ID!, $connections: [ID!]!) {
        enqueuedRemoveQuestion(eventId: $eventId) {
            edge {
                node {
                    id @deleteEdge(connections: $connections)
                }
                cursor
            }
        }
    }
`;

interface Props {
    connections: string[];
    topics: readonly Topic[];
    topic: string;
}

export function useOnDeckDequeued({ connections, topic: currentTopic }: Props) {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();

    //-- Subscription --//
    const enqueuedPushConfig = React.useMemo<GraphQLSubscriptionConfig<useOnDeckDequeuedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
            },
            subscription: USE_ON_DECK_DEQUEUED,
            cacheConfig: { force: true, poll: 1000 },
        }),
        [eventId, connections]
    );

    useSubscription<useOnDeckDequeuedSubscription>(enqueuedPushConfig);

    //-- Mutation --//
    type MutationInput = {
        questionId: string;
        eventId: string;
        list: Question[];
        movedQuestionIndex: number;
    };

    const [commit] = useMutation<useOnDeckDequeuedMutation>(USE_ON_DECK_DEQUEUED_MUTATION);
    const removeFromOnDeck = React.useCallback(
        (input: MutationInput) => {
            const { list, movedQuestionIndex } = input;

            const newPosition = calculateOnDeckDequeuePosition({ list, movedQuestionIndex, currentTopic });
            if (newPosition <= 0) throw new Error('Invalid position');

            commit({
                variables: {
                    input: {
                        questionId: input.questionId,
                        eventId: input.eventId,
                        topic: currentTopic,
                        newPosition: newPosition.toString(),
                    },
                },
                onCompleted: (response) => {
                    if (response.removeQuestionFromOnDeck.isError) {
                        return displaySnack(response.removeQuestionFromOnDeck.message, { variant: 'error' });
                    }
                },
                onError: (error) => {
                    displaySnack(error.message, { variant: 'error' });
                },
            });
        },
        [commit, currentTopic, displaySnack]
    );

    return { removeFromOnDeck };
}
