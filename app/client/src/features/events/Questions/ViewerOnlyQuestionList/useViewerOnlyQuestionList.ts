import * as React from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import type { useViewerOnlyQuestionListFragment$key } from '@local/__generated__/useViewerOnlyQuestionListFragment.graphql';

export const USE_VIEWER_ONLY_QUESTION_LIST_FRAGMENT = graphql`
    fragment useViewerOnlyQuestionListFragment on Event
    @refetchable(queryName: "viewerOnlyQuestionListPagination")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 50 }
        after: { type: "String", defaultValue: "" }
        viewerOnly: { type: "Boolean", defaultValue: true }
        userLang: { type: "String!" }
    ) {
        id
        currentQuestion
        questions(first: $first, after: $after, viewerOnly: $viewerOnly)
            @connection(key: "useViewerOnlyQuestionListFragment_questions") {
            __id
            edges {
                cursor
                node {
                    id
                    question
                    position
                    onDeckPosition
                    createdBy {
                        firstName
                    }
                    refQuestion {
                        ...QuestionQuoteFragment @arguments(lang: $userLang)
                    }
                    ...QuestionActionsFragment @arguments(lang: $userLang)
                    ...QuestionAuthorFragment
                    ...QuestionContentFragment @arguments(lang: $userLang)
                    ...QuestionStatsFragment
                }
            }
        }
    }
`;

interface UseViewrOnlyQuestionListProps {
    fragmentRef: useViewerOnlyQuestionListFragment$key;
}

export function useViewerOnlyQuestionList({ fragmentRef }: UseViewrOnlyQuestionListProps) {
    const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch } =
        usePaginationFragment(USE_VIEWER_ONLY_QUESTION_LIST_FRAGMENT, fragmentRef);
    const { questions, id: eventId, currentQuestion } = data;
    const questionList = React.useMemo(
        () =>
            questions?.edges
                ? questions.edges.map(({ node, cursor }) => {
                      return { ...node, cursor };
                  })
                : [],
        [questions]
    );

    const connections = React.useMemo(() => (questions?.__id ? [questions.__id] : []), [questions?.__id]);

    return {
        questions: questionList,
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
    };
}
