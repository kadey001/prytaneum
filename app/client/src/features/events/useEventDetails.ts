import * as React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';

import { useEventDetailsFragment$key } from '@local/__generated__/useEventDetailsFragment.graphql';
import { useRefresh } from '@local/core';

export const USE_EVENT_DETAILS_FRAGMENT = graphql`
    fragment useEventDetailsFragment on Event @refetchable(queryName: "UseEventDetailsRefetchQuery") {
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
`;

interface Props {
    fragmentRef: useEventDetailsFragment$key;
}

export function useEventDetails({ fragmentRef }: Props) {
    const [data, refetch] = useRefetchableFragment(USE_EVENT_DETAILS_FRAGMENT, fragmentRef);
    const [isLive, setIsLive] = React.useState(Boolean(data.isActive));

    const REFRESH_INTERVAL = 30000; // 30 seconds
    const refresh = React.useCallback(() => {
        refetch({}, { fetchPolicy: 'store-and-network' });
    }, [refetch]);

    const { pauseRefresh, resumeRefresh } = useRefresh({ refreshInterval: REFRESH_INTERVAL, callback: refresh });

    React.useEffect(() => {
        if (data.isActive) {
            setIsLive(true);
            return;
        }
        setIsLive(false);
    }, [data.isActive]);

    return {
        eventData: data,
        isLive,
        setIsLive,
        pauseEventDetailsRefresh: pauseRefresh,
        resumeEventDetailsRefresh: resumeRefresh,
    };
}
