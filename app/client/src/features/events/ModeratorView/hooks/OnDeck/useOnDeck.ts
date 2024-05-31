// Gets the list of all questions that are in onDeck
import { graphql, useFragment } from 'react-relay';

import type { useOnDeckFragment$key } from '@local/__generated__/useOnDeckFragment.graphql';
import React from 'react';
import { Question } from '../../types';

export const USE_ON_DECK_FRAGMENT = graphql`
    fragment useOnDeckFragment on Event
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 1000 }
        after: { type: "String", defaultValue: "" }
        userLang: { type: "String!" }
    ) {
        id
        currentQuestion
        questionQueue {
            questionRecord(first: $first, after: $after) @connection(key: "useOnDeckFragment_questionRecord") {
                __id
                edges {
                    cursor
                    node {
                        id
                        question
                        topics {
                            topic
                            description
                            position
                        }
                        createdBy {
                            firstName
                        }
                        ...QuestionActionsFragment @arguments(lang: $userLang)
                        ...QuestionAuthorFragment
                        ...QuestionStatsFragment
                        ...QuestionContentFragment @arguments(lang: $userLang)
                        ...QuestionTopicsFragment
                        position
                        onDeckPosition
                        refQuestion {
                            ...QuestionQuoteFragment @arguments(lang: $userLang)
                        }
                    }
                }
            }
            enqueuedQuestions(first: $first, after: $after) @connection(key: "useOnDeckFragment_enqueuedQuestions") {
                __id
                edges {
                    cursor
                    node {
                        id
                        question
                        topics {
                            topic
                            description
                            position
                        }
                        createdBy {
                            firstName
                        }
                        ...QuestionActionsFragment @arguments(lang: $userLang)
                        ...QuestionAuthorFragment
                        ...QuestionStatsFragment
                        ...QuestionContentFragment @arguments(lang: $userLang)
                        ...QuestionTopicsFragment
                        position
                        onDeckPosition
                        refQuestion {
                            ...QuestionQuoteFragment @arguments(lang: $userLang)
                        }
                    }
                }
            }
        }
    }
`;

export function useOnDeck({ fragmentRef }: { fragmentRef: useOnDeckFragment$key }) {
    const { questionQueue, currentQuestion } = useFragment(USE_ON_DECK_FRAGMENT, fragmentRef);

    const enqueuedQuestions: Question[] = React.useMemo(() => {
        if (!questionQueue?.enqueuedQuestions?.edges) return [];
        const questions = questionQueue.enqueuedQuestions.edges.map(({ node, cursor }) => {
            return { ...node, cursor };
        });

        return questions.sort((a, b) => {
            return parseInt(a.onDeckPosition) - parseInt(b.onDeckPosition);
        });
    }, [questionQueue?.enqueuedQuestions?.edges]);

    const questionRecord: Question[] = React.useMemo(() => {
        if (!questionQueue?.questionRecord?.edges) return [];
        return questionQueue.questionRecord.edges.map(({ node, cursor }) => {
            return { ...node, cursor };
        });
    }, [questionQueue?.questionRecord?.edges]);

    // If there is no current question, expect currentQuestionPos to be -1
    const currentQuestionPosition = React.useMemo(() => {
        if (!currentQuestion) return -1;
        return parseInt(currentQuestion);
    }, [currentQuestion]);

    return {
        enqueuedQuestions,
        questionRecord,
        connections: questionQueue?.enqueuedQuestions?.__id ? [questionQueue.enqueuedQuestions.__id] : [],
        recordConnection: questionQueue?.questionRecord?.__id ?? '',
        queueConnection: questionQueue?.enqueuedQuestions?.__id ?? '',
        currentQuestionPosition,
    };
}
