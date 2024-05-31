// Subscription to the topic queue being updated
import { useUser } from '@local/features/accounts';
import { useTopicQueuePushSubscription } from '@local/__generated__/useTopicQueuePushSubscription.graphql';
import React from 'react';
import { useSubscription } from 'react-relay';
import { graphql, GraphQLSubscriptionConfig } from 'relay-runtime';

const USE_TOPIC_QUEUE_PUSH = graphql`
    subscription useTopicQueuePushSubscription(
        $eventId: String!
        $topic: String!
        $connections: [ID!]!
        $lang: String!
    ) {
        topicQueuePush(eventId: $eventId, topic: $topic) {
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
    topic: string;
    connections: string[];
}

export function useTopicQueuePush({ eventId, topic, connections }: Props) {
    const { user } = useUser();

    const config = React.useMemo<GraphQLSubscriptionConfig<useTopicQueuePushSubscription>>(
        () => ({
            subscription: USE_TOPIC_QUEUE_PUSH,
            variables: { eventId, topic, connections, lang: user?.preferredLang ?? 'EN' },
        }),
        [connections, eventId, topic, user?.preferredLang]
    );

    useSubscription<useTopicQueuePushSubscription>(config);
}
