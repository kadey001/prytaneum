// Hook to fetch the questions (can be filtered by a specific topic).
// The 2 lists of the moderation pannels are all managed by this hook.
// Split into 2 lists: 'questions', 'queue' (all questions that are not in the 'onDeck' list).
// The queue is based on the chosen topic.
import * as React from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import type { useQuestionsByTopicFragment$key } from '@local/__generated__/useQuestionsByTopicFragment.graphql';
import type { Question } from '../types';

export const USE_QUESTIONS_BY_TOPIC = graphql`
    fragment useQuestionsByTopicFragment on Event
    @refetchable(queryName: "questionsByTopicPagination")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 50 }
        after: { type: "String", defaultValue: "" }
        topic: { type: "String", defaultValue: "default" }
    ) {
        id
        currentQuestion
        questions(first: $first, after: $after, topic: $topic)
            @connection(key: "useQuestionsByTopicFragment_questions", filters: ["topic"]) {
            __id
            edges {
                cursor
                node {
                    id
                    question
                    position
                    topics {
                        topic
                        description
                        position
                    }
                    createdBy {
                        firstName
                    }
                    refQuestion {
                        ...QuestionQuoteFragment
                    }
                    ...QuestionActionsFragment
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment
                    ...QuestionStatsFragment
                }
            }
            pageInfo {
                startCursor
                endCursor
            }
        }
    }
`;

interface Props {
    fragmentRef: useQuestionsByTopicFragment$key;
}

// Right now when enqueued the question is still in the list, just being filtered in the memo.
export function useQuestionsByTopic({ fragmentRef }: Props) {
    // Use pagination fragment for the list of questions by topic
    const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch } =
        usePaginationFragment(USE_QUESTIONS_BY_TOPIC, fragmentRef);
    const { questions: _questions, id: eventId, currentQuestion } = data;

    const questions: Question[] = React.useMemo(() => {
        if (!_questions?.edges) return [];
        console.log('QUESTIONS', _questions?.edges);
        const filteredQuestions = _questions.edges?.filter(({ node }) => {
            const { position, topics } = node;
            let _isQueued = false;
            if (position !== '-1') _isQueued = true;
            if (!topics) return _isQueued;
            topics.forEach((topic) => {
                if (topic.position !== '-1') _isQueued = true;
            });
            return !_isQueued;
        });
        return filteredQuestions.map(({ node, cursor }) => {
            return { ...node, cursor };
        });
    }, [_questions?.edges]);

    const pageInfo = React.useMemo(() => {
        return _questions?.pageInfo;
    }, [_questions]);

    return {
        questions,
        eventId,
        connections: _questions?.__id ? [_questions.__id] : [],
        currentQuestion,
        loadNext,
        loadPrevious,
        hasNext,
        hasPrevious,
        isLoadingNext,
        isLoadingPrevious,
        refetch,
        pageInfo,
    };
}
