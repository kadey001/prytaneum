import * as React from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import type { useQuestionModQueueFragment$key } from '@local/__generated__/useQuestionModQueueFragment.graphql';
import { Question } from '../types';

// NOTE: It is unlikely that more than 1000 questions will be in the queues at any given time
// if it goes over this limit, we will need to implement a more robust pagination system, but hard since we are filtering by topic
export const USE_QUESTION_QUEUE = graphql`
    fragment useQuestionModQueueFragment on Event
    @refetchable(queryName: "questionModQueuePagination")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 1000 }
        after: { type: "String", defaultValue: "" }
        userLang: { type: "String!" }
    ) {
        id
        currentQuestion
        questionModQueue(first: $first, after: $after)
            @connection(key: "useQuestionModQueueFragment_questionModQueue") {
            __id
            edges {
                cursor
                node {
                    id
                    question
                    lang
                    position
                    onDeckPosition
                    topics {
                        topic
                        description
                        position
                    }
                    createdBy {
                        id
                        firstName
                        lastName
                        avatar
                    }
                    createdAt
                    likedByCount
                    isLikedByViewer
                    ...QuestionActionsFragment @arguments(lang: $userLang)
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment @arguments(lang: $userLang)
                    ...QuestionTopicsFragment
                    refQuestion {
                        ...QuestionQuoteFragment @arguments(lang: $userLang)
                    }
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
    fragmentRef: useQuestionModQueueFragment$key;
    topic: string;
}

// TODO: Fix issue where a question is added to specific topic queue is showing up in the default queue
export function useQuestionModQueue({ fragmentRef, topic: currentTopic }: Props) {
    // Use pagination fragment for the list of questions by topic
    const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch } =
        usePaginationFragment(USE_QUESTION_QUEUE, fragmentRef);
    const { questionModQueue: _questions, id: eventId, currentQuestion } = data;

    // Filter out questions that are not enqueued in selected topic
    const queue: Question[] = React.useMemo(() => {
        if (!_questions?.edges) return [];
        const filteredQueue = _questions.edges.filter(({ node }) => {
            const topics = node.topics || [];
            let enqueuedFound = false;
            // If the question is on deck, it should be not be shown in this queue
            if (node.onDeckPosition !== '-1') return false;
            if (currentTopic === 'default' && node.position !== '-1') return true;
            topics.forEach((_topic) => {
                if (currentTopic === _topic.topic && _topic.position !== '-1') enqueuedFound = true;
            });
            return enqueuedFound;
        });
        const unsortedQueue = filteredQueue.map(({ node, cursor }) => {
            return { ...node, cursor };
        });
        // TODO: Sort in descending order on the topic position (largest postion should be at the bottom of the list)
        if (currentTopic === 'default')
            return unsortedQueue.sort((a, b) => (parseInt(a.position) > parseInt(b.position) ? 1 : -1));
        // Sort the queue based on the position of the selected topic
        return unsortedQueue.sort((a, b) => {
            const topicA = a.topics?.find((_topic) => _topic.topic === currentTopic);
            if (!topicA) return 1;
            const topicB = b.topics?.find((_topic) => _topic.topic === currentTopic);
            if (!topicB) return -1;
            return parseInt(topicA?.position) > parseInt(topicB?.position) ? 1 : -1;
        });
    }, [_questions?.edges, currentTopic]);

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
