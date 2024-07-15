/* eslint-disable react/prop-types */
import * as React from 'react';
import { FragmentRefs, graphql } from 'relay-runtime';
import { Badge, Grid, Stack, Tab, Tooltip } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HandymanIcon from '@mui/icons-material/Handyman';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { Panel, PanelGroup } from 'react-resizable-panels';

import { EventVideo, useEvent } from '@local/features/events';
import { EventDetailsCard } from '../EventDetailsCard';
import { SpeakerList } from '../Speakers';

import { ModeratorActions } from '@local/features/events/Moderation/ModeratorActions';
import { PreloadedParticipantsList } from '../Participants/ParticipantsList';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';
import { StyledTabs } from '@local/components/StyledTabs';
import { LiveFeedbackList } from '../LiveFeedback';
import { BroadcastMessageList } from '../BroadcastMessages/BroadcastMessageList';
import { HorizontalResizeHandle } from '@local/components/PanelHandle';
import { PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay';
import { ActionsPanelsQuery } from '@local/__generated__/ActionsPanelsQuery.graphql';
import { ConditionalRender, Loader } from '@local/components';
import { useEventDetails } from '../useEventDetails';

export const ACTIONS_PANELS_QUERY = graphql`
    query ActionsPanelsQuery($eventId: ID!) {
        node(id: $eventId) {
            id
            ...EventVideoFragment
            ...SpeakerListFragment
            ...useBroadcastMessageListFragment
            ...useEventDetailsFragment
            ...useLiveFeedbackListFragment @arguments(eventId: $eventId)
            ...useLiveFeedbackPromptsFragment
        }
    }
`;

export type ActionsPanelsNode = {
    readonly id: string;
    readonly ' $fragmentSpreads': FragmentRefs<any>;
};

interface ActionsPanelProps {
    node: ActionsPanelsNode;
}

function ActionsPanels({ node }: ActionsPanelProps) {
    const { eventData, isLive, setIsLive } = useEventDetails({
        fragmentRef: node,
    });
    type Tabs = 'Moderator' | 'Feedback' | 'Broadcast' | 'Participants';
    const selectedTabFromSession = sessionStorage.getItem(`${node.id}-tab`) as Tabs | null;
    const [tab, setTab] = React.useState<Tabs>(selectedTabFromSession ?? 'Moderator');
    const [numOfFeedbackMsgs, setNumOfFeedbackMsgs] = React.useState<number>(0);

    const handleTabChange = (e: React.SyntheticEvent, newTab: Tabs) => {
        e.preventDefault();
        setTab(newTab);
        sessionStorage.setItem(`${node.id}-tab`, newTab);
    };

    return (
        <PanelGroup autoSaveId='mod-panels-child-persistence' direction='vertical'>
            <Panel defaultSize={25} minSize={20}>
                <Grid
                    sx={{
                        overflow: 'auto',
                        height: '100%',
                    }}
                >
                    <EventVideo fragmentRef={node} />
                    <EventDetailsCard eventData={eventData} />
                    <SpeakerList fragmentRef={node} />
                </Grid>
            </Panel>
            <HorizontalResizeHandle />
            <Panel defaultSize={50} minSize={25}>
                <Stack direction='column' justifyContent='center' alignContent='center' height='100%'>
                    <StyledTabs value={tab} props={{ onChange: handleTabChange, 'aria-label': 'moderator tabs' }}>
                        <Tab
                            label={
                                <Tooltip
                                    title='Participants'
                                    placement='top'
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [0, +2],
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                >
                                    <PeopleAltIcon />
                                </Tooltip>
                            }
                            value='Participants'
                            sx={{
                                minWidth: '0rem',
                                maxWidth: '250px',
                                dislay: 'flex',
                                flex: 1,
                                padding: '0.5rem',
                            }}
                        />
                        <Tab
                            label={
                                <Tooltip
                                    title='Moderator Tools'
                                    placement='top'
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [0, +2],
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                >
                                    <HandymanIcon />
                                </Tooltip>
                            }
                            value='Moderator'
                            sx={{
                                minWidth: '0rem',
                                maxWidth: '250px',
                                dislay: 'flex',
                                flex: 1,
                                padding: '0.5rem',
                            }}
                        />
                        <Tab
                            label={
                                <Tooltip
                                    title='Broadcast Messages'
                                    placement='top'
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [0, +2],
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                >
                                    <PodcastsIcon />
                                </Tooltip>
                            }
                            value='Broadcast'
                            sx={{
                                minWidth: '0rem',
                                maxWidth: '250px',
                                dislay: 'flex',
                                flex: 1,
                                padding: '0.5rem',
                            }}
                        />
                        <Tab
                            label={
                                <Tooltip
                                    title='Feedback'
                                    placement='top'
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [0, +2],
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                >
                                    <React.Fragment>
                                        <FeedbackIcon />
                                        <Badge
                                            badgeContent={numOfFeedbackMsgs}
                                            color='error'
                                            sx={{ transform: 'translate(25px, -23px)' }}
                                        />
                                    </React.Fragment>
                                </Tooltip>
                            }
                            value='Feedback'
                            sx={{
                                minWidth: '0rem',
                                maxWidth: '250px',
                                dislay: 'flex',
                                flex: 1,
                                padding: '0.5rem',
                                overflow: 'visible', // This is needed to show the badge
                            }}
                        />
                    </StyledTabs>
                    <StyledColumnGrid
                        props={{ width: '100%', display: 'flex', flexGrow: 1, padding: 0 }}
                        scrollable={tab == 'Participants' || tab == 'Broadcast'}
                    >
                        {tab === 'Participants' && <PreloadedParticipantsList eventId={eventData.id} />}
                        {tab === 'Moderator' && (
                            <ModeratorActions
                                fragmentRef={node}
                                isLive={isLive}
                                setIsLive={setIsLive}
                                eventId={eventData.id}
                            />
                        )}
                        <BroadcastMessageList fragmentRef={node} isVisible={tab === 'Broadcast'} />
                        <LiveFeedbackList
                            fragmentRef={node}
                            isVisible={tab === 'Feedback'}
                            setNumOfFeedbackMsgs={setNumOfFeedbackMsgs}
                        />
                    </StyledColumnGrid>
                </Stack>
            </Panel>
        </PanelGroup>
    );
}

interface ActionsPanelsContainerProps {
    queryRef: PreloadedQuery<ActionsPanelsQuery>;
}

function ActionsPanelsContainer({ queryRef }: ActionsPanelsContainerProps) {
    const { node } = usePreloadedQuery<ActionsPanelsQuery>(ACTIONS_PANELS_QUERY, queryRef);

    if (!node) return null;
    return <ActionsPanels node={node} />;
}

export function PreloadedActionsPanels() {
    const [queryRef, loadQuery, disposeQuery] = useQueryLoader<ActionsPanelsQuery>(ACTIONS_PANELS_QUERY);
    const { eventId } = useEvent();

    React.useEffect(() => {
        if (!queryRef) loadQuery({ eventId });
        return disposeQuery;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!queryRef) return <Loader />;

    return (
        <ConditionalRender client={true}>
            <React.Suspense fallback={<Loader />}>
                <ActionsPanelsContainer queryRef={queryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
