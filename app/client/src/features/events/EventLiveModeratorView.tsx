/* eslint-disable react/prop-types */
import * as React from 'react';
import { Grid, Tab, Divider } from '@mui/material';
import { useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { FragmentRefs, graphql } from 'relay-runtime';
import { Loader } from '@local/components/Loader';
import { useRouter } from 'next/router';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { EventContext } from '@local/features/events';
import { useSnack } from '@local/core';
import { useEventDetails } from './useEventDetails';
import { usePingEvent } from './Participants/usePingEvent';

import { QuestionQueue } from './Moderation/ManageQuestions';
import { EventLiveModeratorViewQuery } from '@local/__generated__/EventLiveModeratorViewQuery.graphql';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';
import { StyledTabs } from '@local/components/StyledTabs';
import { QuestionList } from './Questions';
import { CurrentQuestionCard } from './Moderation/ManageQuestions/CurrentQuestionCard';
import { ActionsPanels } from './ModeratorView/ActionsPanels';
import { EventTopicContext } from './ModeratorView/EventTopicContext';

export const EVENT_LIVE_MODERATOR_VIEW_QUERY = graphql`
    query EventLiveModeratorViewQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ... on Event {
                isViewerModerator
                isActive
                isPrivate
                ...useBroadcastMessageListFragment
                ...EventVideoFragment
                ...useEventDetailsFragment
                ...SpeakerListFragment
                ...useQuestionListFragment
                ...useBroadcastMessageListFragment
                ...useQuestionQueueFragment
                ...QuestionCarouselFragment
                ...useLiveFeedbackListFragment @arguments(eventId: $eventId)
            }
        }
    }
`;

type Node = {
    readonly id: string;
    readonly isViewerModerator?: boolean | null | undefined;
    readonly isActive?: boolean | null | undefined;
    readonly ' $fragmentSpreads': FragmentRefs<any>;
};

interface EventLiveProps {
    node: Node;
}

function EventLiveModeratorView({ node }: EventLiveProps) {
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

    return (
        <EventContext.Provider
            value={{
                eventId: node.id,
                isModerator: Boolean(node.isViewerModerator),
                pauseParentRefreshing,
                resumeParentRefreshing,
            }}
        >
            <EventTopicContext.Provider value={{ topic: 'default' }}>
                <PanelGroup autoSaveId='mod-panels-persistence' direction='horizontal'>
                    <Panel defaultSize={33} minSize={21}>
                        <ActionsPanels node={node} eventData={eventData} isLive={isLive} setIsLive={setIsLive} />
                    </Panel>
                    <PanelResizeHandle>
                        <Grid container justifyContent='center' height='100%' width='0.5rem'>
                            <Divider orientation='vertical' />
                        </Grid>
                    </PanelResizeHandle>
                    <Panel defaultSize={33} minSize={20}>
                        <Grid
                            container
                            direction='column'
                            height='100%'
                            flexGrow={1}
                            justifyContent='center'
                            alignContent='center'
                        >
                            <Grid item>
                                <CurrentQuestionCard isViewerModerator={true} fragmentRef={node} />
                            </Grid>
                            <StyledTabs value='Queue'>
                                <Tab label='Queue' value='Queue' />
                            </StyledTabs>
                            <StyledColumnGrid
                                props={{
                                    display: 'flex',
                                    flexGrow: 1,
                                    width: '98%',
                                }}
                            >
                                <QuestionQueue fragmentRef={node} isVisible={true} />
                            </StyledColumnGrid>
                        </Grid>
                    </Panel>
                    <PanelResizeHandle>
                        <Grid container justifyContent='center' height='100%' width='0.5rem'>
                            <Divider orientation='vertical' />
                        </Grid>
                    </PanelResizeHandle>
                    <Panel defaultSize={33} minSize={20}>
                        <Grid container direction='column' height='100%' flexGrow={1} alignContent='center'>
                            <StyledTabs value='Questions'>
                                <Tab label='Questions' value='Questions' />
                            </StyledTabs>
                            <StyledColumnGrid
                                props={{
                                    id: 'scrollable-tab',
                                    display: 'flex',
                                    flexGrow: 1,
                                    width: '98%',
                                    padding: 0,
                                }}
                                scrollable={false}
                            >
                                <QuestionList fragmentRef={node} isVisible={true} />
                            </StyledColumnGrid>
                        </Grid>
                    </Panel>
                </PanelGroup>
            </EventTopicContext.Provider>
        </EventContext.Provider>
    );
}

interface EventLiveModeratorViewContainerProps {
    queryRef: PreloadedQuery<EventLiveModeratorViewQuery>;
    eventId: string;
}

function EventLiveModeratorViewContainer({ queryRef, eventId }: EventLiveModeratorViewContainerProps) {
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
    return <EventLiveModeratorView node={node} />;
}

export interface PreloadedEventLiveModratorViewProps {
    eventId: string;
}

export function PreloadedEventLiveModratorView({ eventId }: PreloadedEventLiveModratorViewProps) {
    const [queryRef, loadEventQuery, disposeQuery] = useQueryLoader<EventLiveModeratorViewQuery>(
        EVENT_LIVE_MODERATOR_VIEW_QUERY
    );

    React.useEffect(() => {
        if (!queryRef) loadEventQuery({ eventId });
    }, [eventId, queryRef, loadEventQuery]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!queryRef) return <Loader />;
    return <EventLiveModeratorViewContainer queryRef={queryRef} eventId={eventId} />;
}
