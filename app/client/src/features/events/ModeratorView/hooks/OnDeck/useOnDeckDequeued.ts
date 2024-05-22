import * as React from 'react';
import { graphql, useMutation, useSubscription } from 'react-relay';
import { ConnectionHandler, GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useOnDeckDequeuedSubscription } from '@local/__generated__/useOnDeckDequeuedSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { Question, Topic } from '../../types';

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
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment
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

export const USE_ON_DECK_DEQUEUED = graphql`
    subscription useOnDeckDequeuedSubscription($eventId: ID!, $connections: [ID!]!) {
        enqueuedRemoveQuestion(eventId: $eventId) {
            edge {
                node {
                    id @deleteEdge(connections: $connections)
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment
                    position
                    onDeckPosition
                    topics {
                        topic
                        description
                        position
                    }
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

    const enqueuedPushConfig = React.useMemo<GraphQLSubscriptionConfig<useOnDeckDequeuedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
            },
            subscription: USE_ON_DECK_DEQUEUED,
            // TODO: Use updater, relative card position, and current topic to move the question to the correct position in the correct queue
            updater: (store) => {
                // Add question to the correct position in the correct queue
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Event Record not found');
                const connection = ConnectionHandler.getConnectionID(
                    eventRecord.getDataID(),
                    'useQuestionModQueueFragment_questionModQueue'
                );

                const payload = store.getRootField('enqueuedRemoveQuestion');
                if (!payload) return console.error('Payload not found');

                const serverEdge = payload.getLinkedRecord('body');
                if (!serverEdge) return console.error('Server edge not found');
                const questionId = serverEdge.getValue('id')?.toString();
                if (!questionId) return console.error('Question ID not found');

                const connectionRecord = store.get(connection);
                if (!connectionRecord) return console.error('Connection record not found');
                const question = store.get(questionId);
                if (!question) return console.error('Question not found');
                const newEdge = ConnectionHandler.buildConnectionEdge(store, connectionRecord, serverEdge);
                if (!newEdge) return console.error('New edge not found');
                ConnectionHandler.insertEdgeAfter(connectionRecord, newEdge, null);

                // Remove question from onDeck list
                const onDeckConnectionId = `client:${eventId}:questionQueue:__useOnDeckFragment_enqueuedQuestions_connection`;
                const onDeckConnection = store.get(onDeckConnectionId);
                if (!onDeckConnection) return console.error('onDeckConnection not found');
                ConnectionHandler.deleteNode(onDeckConnection, questionId);
            },
        }),
        [eventId, connections]
    );

    useSubscription<useOnDeckDequeuedSubscription>(enqueuedPushConfig);

    // NOTE: Should always order the onDeck list from lowest to highest
    // That way, whenever the list is empty and a new one is added (which is set to the time in ms),
    // it will always be after the current question.
    const calculatePosition = React.useCallback(
        (list: Question[], movedQuestionIndex: number) => {
            // If the list is length 1 then it is likely the first item added to the list, calculate a new position
            if (!list || list.length <= 1) {
                const currentTimeMs = new Date().getTime();
                const currentTimeMsStr = currentTimeMs.toString();
                const calculatedPosition = parseInt(currentTimeMsStr);
                return calculatedPosition;
            }

            console.log('Moved Question Index:', movedQuestionIndex);

            // The source indx is useless here since we are moving from a different list, can only use destination index
            // The destination index will be where the moved quesiton is as the list is updated while moving it.
            // Should check if there at the end of the list or the start of the list
            // If not, then calculate the position based on the two questions around it
            // Already handled case with it being the first, so if the index is 0 then there should be at least one question below it
            if (movedQuestionIndex === 0) {
                // If the index is 0 then the new position should be less than the next question in the list
                const nextQuestion = list[movedQuestionIndex + 1];
                console.log('nextQuestion:', nextQuestion);
                const nextQuestionTopic = nextQuestion?.topics?.find((t) => t.topic === currentTopic);
                if (!nextQuestionTopic) throw new Error('No topic found');
                const nextQuestionPosition = parseInt(nextQuestionTopic.position);
                // NOTE: race condition, since we're using time for ordering, then adding 1000 ms (1s) will mean that the order
                // at the very end may be messed up, but that's okay, the start is what's important
                return nextQuestionPosition - 1000;
            }

            // In this case we should have at least one question above it to reference and calculate the new position
            const prevQuestion = list[movedQuestionIndex - 1];
            console.log('prevQuestion:', prevQuestion);
            const previousQuestionTopic = prevQuestion?.topics?.find((t) => t.topic === currentTopic);
            if (!previousQuestionTopic) throw new Error('No topic found');
            const prevQuestionPosition = parseInt(previousQuestionTopic.position);
            console.log('prevQuestionPosition:', prevQuestionPosition);
            const nextQuestion = list[movedQuestionIndex + 1];
            console.log('nextQuestion:', nextQuestion);
            if (!nextQuestion) {
                // If there is no next question then the new position should be greater than the previous question
                return prevQuestionPosition + 1000;
            }
            // If there is a next question then the new position should be between the previous and next question
            const nextQuestionTopic = nextQuestion?.topics?.find((t) => t.topic === currentTopic);
            if (!nextQuestionTopic) throw new Error('No topic found');
            const position = Math.round(
                (parseInt(previousQuestionTopic.position) + parseInt(nextQuestionTopic.position)) / 2
            );
            if (position < -1) throw new Error('Invalid position');
            return position;
        },
        [currentTopic]
    );

    type MutationInput = {
        questionId: string;
        eventId: string;
        list: Question[];
        movedQuestionIndex: number;
    };

    const [commit] = useMutation(USE_ON_DECK_DEQUEUED_MUTATION);
    const removeFromOnDeck = React.useCallback(
        (input: MutationInput) => {
            const { list, movedQuestionIndex } = input;

            const newPosition = calculatePosition(list, movedQuestionIndex);
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
                // TODO: Use updater, relative card position, and current topic to move the question to the correct position in the correct queue
                updater: (store) => {
                    // Add question to the correct position in the correct queue
                    const eventRecord = store.get(eventId);
                    if (!eventRecord) return console.error('Event Record not found');
                    const connection = ConnectionHandler.getConnectionID(
                        eventRecord.getDataID(),
                        'useQuestionModQueueFragment_questionModQueue'
                    );
                    const connectionRecord = store.get(connection);
                    if (!connectionRecord) return console.error('Connection record not found');
                    const question = store.get(input.questionId);
                    if (!question) return console.error('Question not found');
                    const payload = store.getRootField('removeQuestionFromOnDeck');
                    if (!payload) return console.error('Payload not found');
                    const serverEdge = payload.getLinkedRecord('body');
                    if (!serverEdge) return console.error('Server edge not found');
                    const newEdge = ConnectionHandler.buildConnectionEdge(store, connectionRecord, serverEdge);
                    if (!newEdge) return console.error('New edge not found');
                    ConnectionHandler.insertEdgeAfter(connectionRecord, newEdge, null);

                    // Remove question from onDeck list
                    const onDeckConnectionId = `client:${eventId}:questionQueue:__useOnDeckFragment_enqueuedQuestions_connection`;
                    const onDeckConnection = store.get(onDeckConnectionId);
                    if (!onDeckConnection) return console.error('onDeckConnection not found');
                    ConnectionHandler.deleteNode(onDeckConnection, input.questionId);
                },
            });
        },
        [calculatePosition, commit, currentTopic, eventId]
    );

    return { removeFromOnDeck };
}
