import { useMemo } from 'react';
import { useSubscription, graphql } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { useEventUpdatesSubscription } from '@local/__generated__/useEventUpdatesSubscription.graphql';
import { useUser } from '../accounts';

const USE_EVENT_UPDATES_SUBSCRIPTION = graphql`
    subscription useEventUpdatesSubscription($userId: ID!) {
        eventUpdates(userId: $userId) {
            id
            title
            topic
            description
            startDateTime
            endDateTime
            isActive
            isViewerModerator
            isPrivate
            isViewerInvited
            issueGuideUrl
            topics {
                id
                topic
                description
            }
            eventType
        }
    }
`;

export function useEventUpdates() {
    const { user } = useUser();
    const userId = useMemo(() => user?.id ?? '', [user]);

    const createdConfig = useMemo<GraphQLSubscriptionConfig<useEventUpdatesSubscription>>(
        () => ({
            variables: {
                userId,
            },
            subscription: USE_EVENT_UPDATES_SUBSCRIPTION,
            onNext: (response) => {
                console.log('Event updates:', response);
            },
        }),
        [userId]
    );

    useSubscription<useEventUpdatesSubscription>(createdConfig);
}
