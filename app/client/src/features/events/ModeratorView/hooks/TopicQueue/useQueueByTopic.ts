import * as React from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import type { useQueueByTopicFragment$key } from '@local/__generated__/useQueueByTopicFragment.graphql';
import { Question } from '../../types';

export const USE_QUEUE_BY_TOPIC = graphql`
    fragment useQueueByTopicFragment on Event
    @refetchable(queryName: "queueByTopicPagination")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 500 }
        after: { type: "String", defaultValue: "" }
        topic: { type: "String", defaultValue: "default" }
    ) {
        id
        currentQuestion
        topicQueue(first: $first, after: $after, topic: $topic) @connection(key: "useQueueByTopicFragment_topicQueue") {
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
                    ...QuestionTopicsFragment
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
    fragmentRef: useQueueByTopicFragment$key;
    topic: string;
}

// NOTE: Not using this hook for now (since refetch isn't working the way we'd expect,
//   we're using the useQuestionModQueue hook instead which fetches all questions and filters them by topic on the client)
// TODO: Fix issue where a question is added to specific topic queue is showing up in the default queue
export function useQueueByTopic({ fragmentRef }: Props) {
    // Use pagination fragment for the list of questions by topic
    const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch } =
        usePaginationFragment(USE_QUEUE_BY_TOPIC, fragmentRef);
    const { topicQueue: _questions, id: eventId, currentQuestion } = data;

    const queue: Question[] = React.useMemo(() => {
        if (!_questions?.edges) return [];
        const filteredQueue = _questions.edges.filter(({ node }) => {
            const topics = node.topics || [];
            let enqueuedFound = false;
            if (node.position !== '-1') enqueuedFound = true;
            topics.forEach((topic) => {
                if (topic.position !== '-1') enqueuedFound = true;
            });
            return enqueuedFound;
        });
        return filteredQueue.map(({ node, cursor }) => {
            return { ...node, cursor };
        });
    }, [_questions]);

    const connections = React.useMemo(() => {
        return _questions?.__id ? [_questions.__id] : [];
    }, [_questions]);

    const pageInfo = React.useMemo(() => {
        return _questions?.pageInfo;
    }, [_questions]);

    return {
        queue,
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
