/* eslint-disable react/prop-types */
import * as React from 'react';
import { useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { FragmentRefs, graphql } from 'relay-runtime';
import { Loader } from '@local/components/Loader';
import { useRouter } from 'next/router';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { EventContext } from '@local/features/events';
import { useSnack } from '@local/core';
import { useEventDetails } from '../useEventDetails';
import { usePingEvent } from '../Participants/usePingEvent';

import { EventLiveNewModeratorViewQuery } from '@local/__generated__/EventLiveNewModeratorViewQuery.graphql';
import { ActionsPanels } from './ActionsPanels';
import { QuestionModerationPanels } from './QuestionModerationPanels';
import { Backdrop, CircularProgress } from '@mui/material';

export const EVENT_LIVE_MODERATOR_VIEW_QUERY = graphql`
    query EventLiveNewModeratorViewQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                isViewerModerator
                isActive
                isPrivate
                topics {
                    id
                    topic
                    description
                }
                ...useBroadcastMessageListFragment
                ...EventVideoFragment
                ...useEventDetailsFragment
                ...SpeakerListFragment
                # ...useQuestionListFragment
                ...useBroadcastMessageListFragment
                ...useQuestionQueueFragment
                ...QuestionCarouselFragment
                ...useLiveFeedbackListFragment @arguments(eventId: $eventId)
                ...useQuestionsByTopicFragment
                ...useQueueByTopicFragment
                ...useOnDeckFragment
                ...useQuestionModQueueFragment
            }
        }
    }
`;

export type Node = {
    readonly id: string;
    readonly isViewerModerator?: boolean | null | undefined;
    readonly isActive?: boolean | null | undefined;
    readonly ' $fragmentSpreads': FragmentRefs<any>;
};

interface EventLiveProps {
    node: Node;
    refresh: () => void;
}

function EventLiveNewModeratorView({ node, refresh }: EventLiveProps) {
    const { eventData, isLive, setIsLive, pauseEventDetailsRefresh, resumeEventDetailsRefresh } = useEventDetails({
        fragmentRef: node,
    });
    const { id: eventId } = node;

    const { pausePingEvent, resumePingEvent } = usePingEvent(eventId);

    const pauseParentRefreshing = React.useCallback(() => {
        pauseEventDetailsRefresh();
        pausePingEvent();
    }, [pauseEventDetailsRefresh, pausePingEvent]);

    const resumeParentRefreshing = React.useCallback(() => {
        resumeEventDetailsRefresh();
        resumePingEvent();
    }, [resumeEventDetailsRefresh, resumePingEvent]);

    // TODO: Improve suspense loading with skeletons that match the panel sizes
    return (
        <EventContext.Provider
            value={{
                eventId: node.id,
                isModerator: Boolean(node.isViewerModerator),
                pauseParentRefreshing,
                resumeParentRefreshing,
            }}
        >
            <PanelGroup autoSaveId='mod-panels-persistence' direction='horizontal'>
                <Panel defaultSize={25} minSize={20} maxSize={30}>
                    <React.Suspense fallback={<Loader />}>
                        <ActionsPanels node={node} eventData={eventData} isLive={isLive} setIsLive={setIsLive} />
                    </React.Suspense>
                </Panel>
                <PanelResizeHandle />
                <Panel defaultSize={75} minSize={70} maxSize={80}>
                    <React.Suspense
                        fallback={
                            <Backdrop open={true}>
                                <CircularProgress color='inherit' />
                            </Backdrop>
                        }
                    >
                        <QuestionModerationPanels node={node} topics={eventData?.topics || []} refresh={refresh} />
                    </React.Suspense>
                </Panel>
            </PanelGroup>
        </EventContext.Provider>
    );
}

interface EventLiveNewModeratorViewContainerProps {
    queryRef: PreloadedQuery<EventLiveNewModeratorViewQuery>;
    eventId: string;
    refresh: () => void;
}

function EventLiveNewModeratorViewContainer({ queryRef, eventId, refresh }: EventLiveNewModeratorViewContainerProps) {
    const { node } = usePreloadedQuery(EVENT_LIVE_MODERATOR_VIEW_QUERY, queryRef);
    const { displaySnack } = useSnack();
    const router = useRouter();

    // Handle private events and token validation
    React.useEffect(() => {
        if (!node?.isViewerModerator) {
            router.push(`/events/${eventId}/live`);
            displaySnack('Must be a moderator for the moderator view.', { variant: 'error' });
        }
    }, [displaySnack, eventId, node?.isViewerModerator, router]);

    if (!node || !node?.isViewerModerator) return <Loader />;
    return <EventLiveNewModeratorView node={node} refresh={refresh} />;
}

export interface PreloadedEventLiveModratorViewProps {
    eventId: string;
}

export function PreloadedEventLiveNewModratorView({ eventId }: PreloadedEventLiveModratorViewProps) {
    const [queryRef, loadEventQuery, disposeQuery] = useQueryLoader<EventLiveNewModeratorViewQuery>(
        EVENT_LIVE_MODERATOR_VIEW_QUERY
    );

    const refresh = React.useCallback(() => {
        if (queryRef) {
            loadEventQuery({ eventId });
        }
    }, [eventId, queryRef, loadEventQuery]);

    React.useEffect(() => {
        if (!queryRef) loadEventQuery({ eventId });
    }, [eventId, queryRef, loadEventQuery]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!queryRef) return <Loader />;
    return (
        <React.Suspense fallback={<Loader />}>
            <EventLiveNewModeratorViewContainer queryRef={queryRef} eventId={eventId} refresh={refresh} />
        </React.Suspense>
    );
}
