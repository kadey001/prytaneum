// Subscription to the topic queue being updated
import { useUser } from '@local/features/accounts';
import { useTopicQueuePushSubscription } from '@local/__generated__/useTopicQueuePushSubscription.graphql';
import React from 'react';
import { useSubscription } from 'react-relay';
import { graphql, GraphQLSubscriptionConfig } from 'relay-runtime';

const USE_TOPIC_QUEUE_PUSH = graphql`
    subscription useTopicQueuePushSubscription($eventId: ID!, $connections: [ID!]!, $lang: String!) {
        topicQueuePush(eventId: $eventId) {
            edge @appendEdge(connections: $connections) {
                node {
                    id
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    topics {
                        topic
                        position
                    }
                    position
                    onDeckPosition
                }
                cursor
            }
        }
    }
`;

interface Props {
    eventId: string;
    connections: string[];
}

export function useTopicQueuePush({ eventId, connections }: Props) {
    const { user } = useUser();

    const config = React.useMemo<GraphQLSubscriptionConfig<useTopicQueuePushSubscription>>(
        () => ({
            subscription: USE_TOPIC_QUEUE_PUSH,
            variables: { eventId, connections, lang: user?.preferredLang ?? 'EN' },
        }),
        [connections, eventId, user?.preferredLang]
    );

    useSubscription<useTopicQueuePushSubscription>(config);
}
