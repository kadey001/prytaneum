// Hook to fetch the questions (can be filtered by a specific topic).
// The 2 lists of the moderation pannels are all managed by this hook.
// Split into 2 lists: 'questions', 'queue' (all questions that are not in the 'onDeck' list).
// The queue is based on the chosen topic.
import * as React from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import type { useQuestionsByTopicFragment$key } from '@local/__generated__/useQuestionsByTopicFragment.graphql';
import type { Question } from '../types';
import { useTopic } from '../useTopic';

// Fetching 500 questions initially, shouldn't be too expensive and easily able to render with virtualized list
export const USE_QUESTIONS_BY_TOPIC = graphql`
    fragment useQuestionsByTopicFragment on Event
    @refetchable(queryName: "questionsByTopicPagination")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 500 }
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
                    onDeckPosition
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
    const { topic } = useTopic();
    // Use pagination fragment for the list of questions by topic
    const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch } =
        usePaginationFragment(USE_QUESTIONS_BY_TOPIC, fragmentRef);
    const { questions: _questions, id: eventId, currentQuestion } = data;

    const questions: Question[] = React.useMemo(() => {
        if (!_questions?.edges) return [];
        const ids = new Set<string>();
        const filteredQuestions = _questions.edges?.filter(({ node }) => {
            const { position, topics, onDeckPosition } = node;
            if (ids.has(node.id)) return false; // Filter out duplicates
            ids.add(node.id);

            let _isQueued = false;
            if (topic === 'default') return position === '-1' && onDeckPosition === '-1';
            if (position !== '-1') _isQueued = true;
            if (onDeckPosition !== '-1') return false;
            if (!topics) return !_isQueued;

            let isInCurrentTopic = false;
            topics.forEach((_topic) => {
                if (_topic.topic === topic) isInCurrentTopic = true;
                if (_topic.position !== '-1') _isQueued = true;
            });
            return isInCurrentTopic && !_isQueued;
        });
        return filteredQuestions.map(({ node, cursor }) => {
            return { ...node, cursor };
        });
    }, [_questions?.edges, topic]);

    const pageInfo = React.useMemo(() => {
        return _questions?.pageInfo;
    }, [_questions]);

    const connections = React.useMemo(() => {
        return _questions?.__id ? [_questions.__id] : [];
    }, [_questions]);

    return {
        questions,
        eventId,
        connections,
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