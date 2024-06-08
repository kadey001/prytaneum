import * as React from 'react';
import { graphql, useMutation, useSubscription } from 'react-relay';
import { ConnectionHandler, GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useOnDeckDequeuedSubscription } from '@local/__generated__/useOnDeckDequeuedSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { Question, Topic } from '../../types';
import { calculateOnDeckDequeuePosition } from './utils';
import { useOnDeckDequeuedMutation } from '@local/__generated__/useOnDeckDequeuedMutation.graphql';
import { useSnack } from '@local/core';
import { useUser } from '@local/features/accounts';

export const USE_ON_DECK_DEQUEUED_MUTATION = graphql`
    mutation useOnDeckDequeuedMutation($input: RemoveQuestionFromOnDeck!, $connections: [ID!]!, $lang: String!) {
        removeQuestionFromOnDeck(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id @deleteEdge(connections: $connections)
                    question
                    position
                    onDeckPosition
                    refQuestion {
                        ...QuestionQuoteFragment @arguments(lang: $lang)
                    }
                    ...QuestionActionsFragment @arguments(lang: $lang)
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    ...QuestionStatsFragment
                    ...QuestionTopicsFragment
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
    const { user } = useUser();
    const { displaySnack } = useSnack();

    //-- Subscription --//
    const enqueuedPushConfig = React.useMemo<GraphQLSubscriptionConfig<useOnDeckDequeuedSubscription>>(
        () => ({
            variables: {
                eventId,
                connections,
            },
            subscription: USE_ON_DECK_DEQUEUED,
        }),
        [connections, eventId]
    );

    useSubscription<useOnDeckDequeuedSubscription>(enqueuedPushConfig);

    //-- Mutation --//
    type MutationInput = {
        question: Question;
        list: Question[];
        movedQuestionIndex: number;
        revertChange: () => void;
    };

    const [commit] = useMutation<useOnDeckDequeuedMutation>(USE_ON_DECK_DEQUEUED_MUTATION);
    const removeFromOnDeck = React.useCallback(
        (input: MutationInput) => {
            const { question, list, movedQuestionIndex, revertChange } = input;

            // Guard against moving a question to a queue it has no associated topic with
            let questionHasQueueTopic = false;
            question.topics?.forEach((_topic) => {
                if (_topic.topic === currentTopic) questionHasQueueTopic = true;
            });

            if (!questionHasQueueTopic && currentTopic !== 'default') {
                revertChange();
                return displaySnack(
                    `Cannot move to topic queue "${currentTopic}" when the question is not assigned to that topic.`,
                    { variant: 'error' }
                );
            }

            const newPosition = calculateOnDeckDequeuePosition({
                list,
                movedQuestionIndex,
                currentTopic,
            });

            commit({
                variables: {
                    input: {
                        questionId: question.id.toString(),
                        eventId: eventId,
                        topic: currentTopic,
                        newPosition: newPosition.toString(),
                    },
                    connections,
                    lang: user?.preferredLang ?? 'EN',
                },
                onCompleted: (response) => {
                    if (response.removeQuestionFromOnDeck.isError) {
                        return displaySnack(response.removeQuestionFromOnDeck.message, { variant: 'error' });
                    }
                },
                onError: (error) => {
                    displaySnack(error.message, { variant: 'error' });
                },
                updater: (store) => {
                    const eventRecord = store.get(eventId);
                    if (!eventRecord) return console.error('Event not found');
                    const payload = store.getRootField('removeQuestionFromOnDeck');
                    if (!payload) return console.error('Payload not found');
                    const questionEdge = payload.getLinkedRecord('body');
                    if (!questionEdge) return console.error('Question not found');
                    const modQueueConnection = ConnectionHandler.getConnection(
                        eventRecord,
                        'useQuestionModQueueFragment_questionModQueue'
                    );
                    if (!modQueueConnection) return console.error('modQueueConnection not found');
                    const newEdge = ConnectionHandler.buildConnectionEdge(store, modQueueConnection, questionEdge);
                    if (!newEdge) return console.error('newEdge not found');
                    ConnectionHandler.insertEdgeAfter(modQueueConnection, newEdge);
                },
                optimisticUpdater: (store) => {
                    const eventRecord = store.get(eventId);
                    if (!eventRecord) return console.error('Event not found');
                    const payload = store.getRootField('removeQuestionFromOnDeck');
                    if (!payload) return console.error('Payload not found');
                    const questionEdge = payload.getLinkedRecord('body');
                    if (!questionEdge) return console.error('Question not found');
                    const modQueueConnection = ConnectionHandler.getConnection(
                        eventRecord,
                        'useQuestionModQueueFragment_questionModQueue'
                    );
                    if (!modQueueConnection) return console.error('modQueueConnection not found');
                    const newEdge = ConnectionHandler.buildConnectionEdge(store, modQueueConnection, questionEdge);
                    if (!newEdge) return console.error('newEdge not found');
                    ConnectionHandler.insertEdgeAfter(modQueueConnection, newEdge);
                },
                optimisticResponse: {
                    removeQuestionFromOnDeck: {
                        isError: false,
                        message: '',
                        body: {
                            cursor: question.createdAt
                                ? new Date(question.createdAt).getTime().toString()
                                : new Date().getTime().toString(),
                            node: {
                                id: question.id,
                                question: question.question,
                                lang: question.lang,
                                questionTranslated: question.question,
                                position: currentTopic === 'default' ? newPosition.toString() : '-1',
                                onDeckPosition: currentTopic === 'default' ? '-1' : newPosition.toString(),
                                topics: question.topics?.map((_topic) => {
                                    if (_topic.topic === currentTopic) {
                                        return {
                                            ..._topic,
                                            position: newPosition.toString(),
                                        };
                                    }
                                    return _topic;
                                }),
                                createdBy: {
                                    id: question.createdBy?.id ?? '',
                                    firstName: question.createdBy?.firstName ?? '',
                                    lastName: question.createdBy?.lastName ?? '',
                                    avatar: question.createdBy?.avatar ?? '',
                                },
                                createdAt: question.createdAt,
                                refQuestion: question.refQuestion,
                                likedByCount: question.likedByCount,
                                isLikedByViewer: question.isLikedByViewer,
                            },
                        },
                    },
                },
            });
        },
        [commit, connections, currentTopic, displaySnack, eventId, user?.preferredLang]
    );

    return { removeFromOnDeck };
}
