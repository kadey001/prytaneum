import * as React from 'react';
import { graphql, useMutation } from 'react-relay';
// import { GraphQLSubscriptionConfig } from 'relay-runtime';

// import type { useOnDeckEnqueuedSubscription } from '@local/__generated__/useOnDeckEnqueuedSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { Question, Topic } from '../../types';
import { useSnack } from '@local/core';
import { calculateOnDeckEnqueuePosition, onDeckEnqueuedMutationUpdater } from './utils';
import { useOnDeckEnqueuedMutation } from '@local/__generated__/useOnDeckEnqueuedMutation.graphql';
import { useUser } from '@local/features/accounts';

export const USE_ON_DECK_ENQUEUED_MUTATION = graphql`
    mutation useOnDeckEnqueuedMutation($input: AddQuestionToOnDeck!, $lang: String!) {
        addQuestionToOnDeck(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    question
                    position
                    onDeckPosition
                    refQuestion {
                        id
                        question
                        lang
                        questionTranslated(lang: $lang)
                        createdBy {
                            id
                            firstName
                            lastName
                            avatar
                        }
                        createdAt
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

interface Props {
    connections: string[];
    topic: string;
    topics: readonly Topic[];
}

export function useOnDeckEnqueued({ connections, topics }: Props) {
    const { eventId } = useEvent();
    const { user } = useUser();
    const { displaySnack } = useSnack();

    type AddQuestionToOnDeckInput = {
        question: Question;
        list: Question[];
        movedQuestionIndex: number; // Index of where the question was moved to in the on deck list
        cursor: string;
        currentQuestionPosition: number;
    };

    const [commit] = useMutation<useOnDeckEnqueuedMutation>(USE_ON_DECK_ENQUEUED_MUTATION);
    const addQuestionToOnDeck = React.useCallback(
        (input: AddQuestionToOnDeckInput) => {
            const { question, list, movedQuestionIndex, currentQuestionPosition } = input;
            const newPosition = calculateOnDeckEnqueuePosition({ list, movedQuestionIndex, currentQuestionPosition });
            if (newPosition <= -1) {
                displaySnack('Invalid new position', { variant: 'error' });
            }

            commit({
                variables: {
                    input: {
                        eventId,
                        questionId: question.id.toString(),
                        newPosition: newPosition.toString(),
                    },
                    lang: user?.preferredLang ?? 'EN',
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
                    onDeckEnqueuedMutationUpdater({
                        store,
                        connections,
                        eventId,
                        questionId: input.question.id.toString(),
                        topics,
                    });
                },
                optimisticUpdater: (store) => {
                    onDeckEnqueuedMutationUpdater({
                        store,
                        connections,
                        eventId,
                        questionId: question.id.toString(),
                        topics,
                    });
                },
                optimisticResponse: {
                    addQuestionToOnDeck: {
                        isError: false,
                        message: '',
                        body: {
                            cursor: question.cursor,
                            node: {
                                id: question.id,
                                question: question.question,
                                lang: question.lang,
                                questionTranslated: question.question,
                                position: '-1',
                                onDeckPosition: newPosition.toString(),
                                topics: question.topics?.map((_topic) => {
                                    return {
                                        ..._topic,
                                        position: '-1',
                                    };
                                }),
                                createdBy: {
                                    id: question.createdBy?.id ?? '',
                                    firstName: question.createdBy?.firstName ?? '',
                                    lastName: question.createdBy?.lastName ?? '',
                                    avatar: question.createdBy?.avatar ?? '',
                                },
                                createdAt: question.createdAt,
                                refQuestion: question.refQuestion
                                    ? {
                                          id: question.id,
                                          question: question.question,
                                          lang: question.lang,
                                          questionTranslated: question.question,
                                          createdBy: {
                                              id: question.createdBy?.id ?? '',
                                              firstName: question.createdBy?.firstName ?? '',
                                              lastName: question.createdBy?.lastName ?? '',
                                              avatar: question.createdBy?.avatar ?? '',
                                          },
                                          createdAt: question.createdAt,
                                      }
                                    : null,
                                likedByCount: question.likedByCount,
                                isLikedByViewer: question.isLikedByViewer,
                            },
                        },
                    },
                },
            });
        },
        [commit, connections, displaySnack, eventId, topics, user?.preferredLang]
    );

    return { addQuestionToOnDeck };
}
