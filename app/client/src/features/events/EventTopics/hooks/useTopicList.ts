import { graphql } from 'relay-runtime';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { useTopicListQuery } from '@local/__generated__/useTopicListQuery.graphql';

export const USE_TOPIC_LIST = graphql`
    query useTopicListQuery($eventId: String!) {
        eventTopics(eventId: $eventId) {
            id
            topic
            description
        }
    }
`;

interface Props {
    queryRef: PreloadedQuery<useTopicListQuery>;
}

export function useTopicList({ queryRef }: Props) {
    const { eventTopics } = usePreloadedQuery(USE_TOPIC_LIST, queryRef);

    return { eventTopics: eventTopics || [] };
}
