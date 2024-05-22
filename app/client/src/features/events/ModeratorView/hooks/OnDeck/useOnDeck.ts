// Gets the list of all questions that are in onDeck
import { graphql, useFragment } from 'react-relay';

import type { useOnDeckFragment$key } from '@local/__generated__/useOnDeckFragment.graphql';
import React from 'react';
import { Question } from '../../types';

export const USE_ON_DECK_FRAGMENT = graphql`
    fragment useOnDeckFragment on Event
    @argumentDefinitions(first: { type: "Int", defaultValue: 1000 }, after: { type: "String", defaultValue: "" }) {
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
                        ...QuestionAuthorFragment
                        ...QuestionStatsFragment
                        ...QuestionContentFragment
                        position
                        onDeckPosition
                        refQuestion {
                            ...QuestionQuoteFragment
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
                        ...QuestionActionsFragment
                        ...QuestionAuthorFragment
                        ...QuestionStatsFragment
                        ...QuestionContentFragment
                        position
                        onDeckPosition
                        refQuestion {
                            ...QuestionQuoteFragment
                        }
                    }
                }
            }
        }
    }
`;

export function useOnDeck({ fragmentRef }: { fragmentRef: useOnDeckFragment$key }) {
    const { questionQueue } = useFragment(USE_ON_DECK_FRAGMENT, fragmentRef);

    const enqueuedQuestions: Question[] = React.useMemo(() => {
        if (!questionQueue?.enqueuedQuestions?.edges) return [];
        const questions = questionQueue.enqueuedQuestions.edges.map(({ node, cursor }) => {
            return { ...node, cursor };
        });
        // Sort question queue in ascending order of onDeckPosition (i.e. largest onDeckPosition is always at the end of the array)
        // Newest -> Oldest
        // Since it's Drag and Drop, just care about a consistent order to fetch by using timestamp
        return questions.sort((a, b) => {
            return parseInt(a.onDeckPosition) - parseInt(b.onDeckPosition);
        });
    }, [questionQueue]);

    const questionRecord: Question[] = React.useMemo(() => {
        if (!questionQueue?.questionRecord?.edges) return [];
        return questionQueue.questionRecord.edges.map(({ node, cursor }) => {
            return { ...node, cursor };
        });
    }, [questionQueue]);

    return {
        enqueuedQuestions,
        questionRecord,
        connections: questionQueue?.enqueuedQuestions?.__id ? [questionQueue.enqueuedQuestions.__id] : [],
    };
}
