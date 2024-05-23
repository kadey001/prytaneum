import * as React from 'react';
import { graphql, useMutation, useSubscription, ConnectionHandler } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useOnDeckEnqueuedSubscription } from '@local/__generated__/useOnDeckEnqueuedSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { Question, Topic } from '../../types';
import { useSnack } from '@local/core';

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

export const USE_ON_DECK_ENQUEUED = graphql`
    subscription useOnDeckEnqueuedSubscription($eventId: ID!, $connections: [ID!]!) {
        enqueuedPushQuestion(eventId: $eventId) {
            edge @appendEdge(connections: $connections) {
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

// TODO: Fix the local client not updaing the data in store properly
// Causes an issue since it is stuck at -1 but if you add another it will make a negative number
interface Props {
    connections: string[];
    topics: readonly Topic[];
}

export function useOnDeckEnqueued({ connections, topics }: Props) {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();

    const enqueuedPushConfig = React.useMemo<GraphQLSubscriptionConfig<useOnDeckEnqueuedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
            },
            subscription: USE_ON_DECK_ENQUEUED,
            updater: (store) => {
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Event Record not found');

                const payload = store.getRootField('enqueuedPushQuestion');
                if (!payload) return console.error('Payload not found');

                const serverEdge = payload.getLinkedRecord('edge');
                if (!serverEdge) return console.error('Edge not found');

                const questionId = serverEdge.getValue('id')?.toString();
                if (!questionId) return console.error('Question ID not found');

                // Remove from modQueue
                const modQueueConnection = ConnectionHandler.getConnectionID(
                    eventRecord.getDataID(),
                    'useQuestionModQueueFragment_questionModQueue'
                );
                const modQueueConnectionRecord = store.get(modQueueConnection);
                if (!modQueueConnectionRecord) return console.error('Mod Queue Connection record not found');
                ConnectionHandler.deleteNode(modQueueConnectionRecord, questionId);

                // Start with default, then remove the question from all question lists
                const defaultConnection = ConnectionHandler.getConnectionID(
                    eventRecord.getDataID(),
                    'useQuestionsByTopicFragment_questions'
                );
                eventRecord.setValue(null, 'modQueueCursor');
                const defaultConnectionId = defaultConnection + '(topic:"default")';
                const defaultConnectionRecord = store.get(defaultConnectionId);
                if (!defaultConnectionRecord) return console.error('Default Connection record not found');
                ConnectionHandler.deleteNode(defaultConnectionRecord, questionId);

                topics.forEach(({ topic }) => {
                    const connection = ConnectionHandler.getConnectionID(
                        eventRecord.getDataID(),
                        'useQuestionsByTopicFragment_questions'
                    );
                    if (!connection) return console.error('Connection not found');
                    const connectionId = connection + `(topic:"${topic}")`;
                    const connectionRecord = store.get(connectionId);
                    if (!connectionRecord) return console.error(`Connection record ${connectionId} not found`);
                    ConnectionHandler.deleteNode(connectionRecord, questionId);
                });
            },
        }),
        [eventId, connections, topics]
    );

    useSubscription<useOnDeckEnqueuedSubscription>(enqueuedPushConfig);

    // NOTE: Should always order the onDeck list from lowest to highest
    // That way, whenever the list is empty and a new one is added (which is set to the time in ms),
    // it will always be after the current question.
    const calculatePosition = React.useCallback(
        (list: Question[], movedQuestionIndex: number, currentQuestionPosition: number) => {
            // If the list is length 1 then it is likely the first item added to the list, calculate a new position
            if (!list || (list.length <= 1 && currentQuestionPosition === -1)) {
                const currentTimeMs = new Date().getTime();
                const currentTimeMsStr = currentTimeMs.toString();
                const calculatedPosition = parseInt(currentTimeMsStr);
                return calculatedPosition;
            } else if (!list || list.length <= 1) {
                // If the list is length 1 and the current question position is not -1 then there is a curr question and an empty on Deck queue
                // so we can use the current question position to calculate the new position or just use time since it will be later
                const currentTimeMs = new Date().getTime();
                const currentTimeMsStr = currentTimeMs.toString();
                const calculatedPosition = parseInt(currentTimeMsStr);
                if (calculatedPosition < currentQuestionPosition) throw new Error('Invalid position');
                return calculatedPosition;
            }

            // The source indx is useless here since we are moving from a different list, can only use destination index
            // The destination index will be where the moved quesiton is as the list is updated while moving it.
            // Should check if there at the end of the list or the start of the list
            // If not, then calculate the position based on the two questions around it
            // Already handled case with it being the first, so if the index is 0 then there should be at least one question below it
            if (movedQuestionIndex === 0) {
                // If the index is 0 then the new position should be less than the next question in the list
                const nextQuestion = list[movedQuestionIndex + 1];
                // console.log('nextQuestion:', nextQuestion);
                if (nextQuestion.onDeckPosition === '-1') throw new Error('Invalid next question position');
                const nextQuestionPosition = parseInt(nextQuestion.onDeckPosition);
                // NOTE: race condition, since we're using time for ordering, then adding 1000 ms (1s) will mean that the order
                // at the very end may be messed up, but that's okay, the start is what's important

                // If there is no next question then the new position just needs to be less than the current question
                if (currentQuestionPosition === -1) return nextQuestionPosition - 1000;
                const diff = Math.abs(nextQuestionPosition - currentQuestionPosition);
                return Math.round(currentQuestionPosition + diff / 2);
            }

            // In this case we should have at least one question above it to reference and calculate the new position
            const prevQuestion = list[movedQuestionIndex - 1];
            console.log('prevQuestion:', prevQuestion);
            const prevQuestionPosition = parseInt(prevQuestion.onDeckPosition);
            if (prevQuestionPosition === -1) throw new Error('Invalid previous question position');
            const nextQuestion = list[movedQuestionIndex + 1];
            console.log('nextQuestion:', nextQuestion);
            // If there is no next question then we should be at the end of the list
            if (!nextQuestion) {
                // If there is no next question then the new position should be greater than the previous question
                return prevQuestionPosition + 1000;
            }
            const nextQuestionPosition = parseInt(nextQuestion.onDeckPosition);
            // console.log('Next Question Position:', nextQuestionPosition);
            // console.log('Prev Question Position:', prevQuestionPosition);
            // If there is a next question then the new position should be between the previous and next question
            // Since the numbers are so large (time in ms) then we can just find the difference and add half of it to the previous question
            const diff = Math.abs(nextQuestionPosition - prevQuestionPosition);
            console.log('diff:', diff);
            if (diff <= 0) throw new Error('Invalid difference');
            const position = Math.round(prevQuestionPosition + diff / 2);
            // const position = Math.round((prevQuestionPosition + parseInt(nextQuestion.onDeckPosition)) / 2);
            if (position < -1) throw new Error('Invalid position');
            return position;
        },
        []
    );

    type AddQuestionToOnDeckInput = {
        questionId: string;
        eventId: string;
        list: Question[];
        movedQuestionIndex: number; // Index of where the question was moved to in the on deck list
        cursor: string;
        currentQuestionPosition: number;
    };

    // TODO: Improve with optimistic updater
    const [commit] = useMutation(USE_ON_DECK_ENQUEUED_MUTATION);
    const addQuestionToOnDeck = React.useCallback(
        (input: AddQuestionToOnDeckInput) => {
            const { list, movedQuestionIndex } = input;
            const newPosition = calculatePosition(list, movedQuestionIndex, input.currentQuestionPosition);
            console.log('newPosition:', newPosition);
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
                    console.log('onCompleted', response);
                },
                updater: (store) => {
                    // Remove the question from all topic queues and lists when added to On Deck
                    const eventRecord = store.get(eventId);
                    if (!eventRecord) return console.error('Event Record not found');

                    // Remove from modQueue
                    const modQueueConnection = ConnectionHandler.getConnectionID(
                        eventRecord.getDataID(),
                        'useQuestionModQueueFragment_questionModQueue'
                    );
                    const modQueueConnectionRecord = store.get(modQueueConnection);
                    if (!modQueueConnectionRecord) return console.error('Mod Queue Connection record not found');
                    ConnectionHandler.deleteNode(modQueueConnectionRecord, input.questionId);

                    // Start with default, then remove the question from all question lists
                    const defaultConnection = ConnectionHandler.getConnectionID(
                        eventRecord.getDataID(),
                        'useQuestionsByTopicFragment_questions'
                    );
                    eventRecord.setValue(null, 'modQueueCursor');
                    const defaultConnectionId = defaultConnection + '(topic:"default")';
                    const defaultConnectionRecord = store.get(defaultConnectionId);
                    if (!defaultConnectionRecord) return console.error('Default Connection record not found');
                    ConnectionHandler.deleteNode(defaultConnectionRecord, input.questionId);

                    topics.forEach(({ topic }) => {
                        const connection = ConnectionHandler.getConnectionID(
                            eventRecord.getDataID(),
                            'useQuestionsByTopicFragment_questions'
                        );
                        if (!connection) return console.error('Connection not found');
                        const connectionId = connection + `(topic:"${topic}")`;
                        const connectionRecord = store.get(connectionId);
                        if (!connectionRecord) return console.error(`Connection record ${connectionId} not found`);
                        ConnectionHandler.deleteNode(connectionRecord, input.questionId);
                    });

                    // const onDeckConnectionId = `client:${eventId}:questionQueue:__useOnDeckFragment_enqueuedQuestions_connection`;
                    // console.log('onDeckConnection:', onDeckConnectionId);
                    // const onDeckConnectionRecord = store.get(onDeckConnectionId);
                    // if (!onDeckConnectionRecord) return console.error('On Deck Connection record not found');

                    // const payload = store.getRootField('addQuestionToOnDeck');
                    // if (!payload) return console.error('Payload not found');
                    // const serverEdge = payload.getLinkedRecord('body');
                    // if (!serverEdge) return console.error('Edge not found');
                    // const newEdge = ConnectionHandler.buildConnectionEdge(store, onDeckConnectionRecord, serverEdge);
                    // if (!newEdge) return console.error('New Edge not found');
                    // ConnectionHandler.insertEdgeBefore(onDeckConnectionRecord, newEdge);
                },
                // optimisticResponse: {
                //     addQuestionToOnDeck: {
                //         isError: false,
                //         message: '',
                //         body: {
                //             cursor: input.cursor,
                //             node: {
                //                 id: input.questionId,
                //                 position: '-1',
                //                 onDeckPosition: newPosition.toString(),
                //             },
                //         },
                //     },
                // },
                // optimisticUpdater: (store) => {
                //     // const questionRecord = store.get(input.questionId);
                //     // if (!questionRecord) return console.error('Question Record not found');
                //     // questionRecord.setValue(newPosition.toString(), 'onDeckPosition');
                //     const eventRecord = store.get(eventId);
                //     if (!eventRecord) return console.error('Event Record not found');
                //     const onDeckConnection = `client:${eventId}:questionQueue:__useOnDeckFragment_enqueuedQuestions_connection`;
                //     console.log('onDeckConnection:', onDeckConnection);
                //     const onDeckConnectionRecord = store.get(onDeckConnection);
                //     if (!onDeckConnectionRecord) return console.error('On Deck Connection record not found');

                //     const payload = store.getRootField('addQuestionToOnDeck');
                //     if (!payload) return console.error('Payload not found');
                //     const serverEdge = payload.getLinkedRecord('body');
                //     if (!serverEdge) return console.error('Edge not found');
                //     const newEdge = ConnectionHandler.buildConnectionEdge(store, onDeckConnectionRecord, serverEdge);
                //     if (!newEdge) return console.error('New Edge not found');
                //     ConnectionHandler.insertEdgeBefore(onDeckConnectionRecord, newEdge);
                // },
            });
        },
        [commit, displaySnack, eventId, topics]
    );

    return { addQuestionToOnDeck };
}
