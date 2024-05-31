/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Tab, Skeleton, Button, useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { graphql, useFragment } from 'react-relay';

import { EventSidebarFragment$key } from '@local/__generated__/EventSidebarFragment.graphql';
import { QuestionList } from '@local/features/events/Questions/QuestionList';
import { QuestionQueue } from '@local/features/events/Moderation/ManageQuestions';
import { LiveFeedbackList } from '@local/features/events/LiveFeedback/LiveFeedbackList';
import { BroadcastMessageList } from '@local/features/events/BroadcastMessages/BroadcastMessageList';
import { QuestionCarousel } from '../Questions/QuestionCarousel';
import { CurrentQuestionCard } from '../Moderation/ManageQuestions/CurrentQuestionCard';
import { useLiveFeedbackPrompt } from '../LiveFeedbackPrompts';
import {
    useLiveFeedbackPromptResultsShared,
    ViewLiveFeedbackPromptResults,
} from '../LiveFeedbackPrompts/LiveFeedbackPromptResults';
import { PreloadedParticipantsList } from '../Participants/ParticipantsList';
import { StyledTabs } from '@local/components/StyledTabs';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';
import { ModeratorActions } from '../Moderation/ModeratorActions';
import { SubmitLiveFeedbackPromptResponse } from '../LiveFeedbackPrompts/LiveFeedbackPromptResponse';
import { useResponsiveDialog } from '@local/components/ResponsiveDialog';

export const EVENT_SIDEBAR_FRAGMENT = graphql`
    fragment EventSidebarFragment on Event {
        id
        isQuestionFeedVisible
        isViewerModerator
        ...SpeakerListFragment
        ...useQuestionListFragment @arguments(userLang: $lang)
        ...useBroadcastMessageListFragment
        ...useQuestionQueueFragment @arguments(userLang: $lang)
        ...QuestionCarouselFragment @arguments(userLang: $lang)
        ...useLiveFeedbackListFragment @arguments(eventId: $eventId)
        ...useOnDeckFragment @arguments(userLang: $lang)
    }
`;

// TODO: Add sidebar top section for moderator tools
type sidebarTopTabs = 'Moderator';
type SidebarBottomTabs = 'Queue' | 'Questions' | 'Feedback' | 'Broadcast' | 'Participants';

export function EventSidebarLoader() {
    return <Skeleton variant='rectangular' height={500} width={200} />;
}
export interface EventSidebarProps {
    fragmentRef: EventSidebarFragment$key;
    isViewerModerator: boolean;
    isLive: boolean;
    setIsLive: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EventSidebar = ({ fragmentRef, isViewerModerator, isLive, setIsLive }: EventSidebarProps) => {
    const theme = useTheme();
    const mdUpBreakpoint = useMediaQuery(theme.breakpoints.up('md'));
    const smDownBreakpoint = useMediaQuery(theme.breakpoints.down('sm'));
    const data = useFragment(EVENT_SIDEBAR_FRAGMENT, fragmentRef);
    const [topTab, setTopTab] = React.useState<sidebarTopTabs>('Moderator');
    const [bottomTab, setBottomTab] = React.useState<SidebarBottomTabs>('Questions');
    const [topSectionVisible, setTopSectionVisible] = React.useState(true);
    const [isFeedbackPromptResponseOpen, openFeedbackPromptResponse, closeFeedbackPromptResponse] =
        useResponsiveDialog();
    const [isFeedbackPromptResultsOpen, openFeedbackPromptResults, closeFeedbackPromptResults] = useResponsiveDialog();
    const eventId = data.id;

    // Subscribe to live feedback prompts
    const { feedbackPromptRef, closeFeedbackPromptSnack } = useLiveFeedbackPrompt({ openFeedbackPromptResponse });
    const { feedbackPromptResultsRef, closeFeedbackPromptResultsSnack } = useLiveFeedbackPromptResultsShared({
        openFeedbackPromptResults,
    });

    const toggleTopSectionVisibility = React.useCallback(() => {
        setTopSectionVisible((prev) => !prev);
    }, []);

    const handleTopChange = (e: React.SyntheticEvent, newTab: sidebarTopTabs) => {
        e.preventDefault();
        setTopTab(newTab);
    };

    const handleBottomChange = (e: React.SyntheticEvent, newTab: SidebarBottomTabs) => {
        e.preventDefault();
        setBottomTab(newTab);
    };

    return (
        <Grid
            container
            height='100%'
            padding={mdUpBreakpoint ? theme.spacing(0, 0, 0, 1) : theme.spacing(0)}
            maxWidth={'100%'}
            sx={{
                '& > *': {
                    marginBottom: theme.spacing(1),
                    width: '100%',
                },
            }}
            direction='column'
            alignContent='flex-start'
            alignItems='flex-start'
            wrap='nowrap'
        >
            <SubmitLiveFeedbackPromptResponse
                eventId={eventId}
                promptRef={feedbackPromptRef}
                closeSnack={closeFeedbackPromptSnack}
                isOpen={isFeedbackPromptResponseOpen}
                open={openFeedbackPromptResponse}
                close={closeFeedbackPromptResponse}
            />
            <ViewLiveFeedbackPromptResults
                promptRef={feedbackPromptResultsRef}
                closeSnack={closeFeedbackPromptResultsSnack}
                open={isFeedbackPromptResultsOpen}
                setOpen={openFeedbackPromptResults}
                close={closeFeedbackPromptResults}
            />
            <Grid item>
                {!isViewerModerator && <QuestionCarousel fragmentRef={data} />}
                {isViewerModerator && (
                    <CurrentQuestionCard isViewerModerator={Boolean(isViewerModerator)} fragmentRef={data} />
                )}
            </Grid>
            {isViewerModerator && (
                <Grid item container justifyContent='center'>
                    <Button onClick={toggleTopSectionVisibility}>
                        {topSectionVisible ? 'Hide Moderator Tools' : 'Show Moderator Tools'}
                    </Button>
                </Grid>
            )}
            {isViewerModerator && topSectionVisible && (
                <Grid item container justifyContent='start'>
                    <StyledTabs value={topTab} props={{ onChange: handleTopChange, 'aria-label': 'top tabs' }}>
                        <Tab label='Moderator' value='Moderator' />
                    </StyledTabs>
                    <StyledColumnGrid props={{ height: '250px' }}>
                        <Grid item justifyContent='center' width='100%'>
                            <ModeratorActions isLive={isLive} setIsLive={setIsLive} eventId={eventId} />
                            <PreloadedParticipantsList eventId={data.id} />
                        </Grid>
                    </StyledColumnGrid>
                </Grid>
            )}
            <Grid
                item
                container
                display='flex'
                direction='column'
                justifyContent='flex-start'
                flexGrow={1}
                width='100%'
            >
                <StyledTabs
                    value={bottomTab}
                    props={{
                        onChange: handleBottomChange,
                        'aria-label': 'bottom tabs',
                        centered: true,
                    }}
                >
                    {isViewerModerator && (
                        <Tab
                            style={{ height: 0 }}
                            label={smDownBreakpoint ? <Typography variant='caption'>Queue</Typography> : 'Queue'}
                            value='Queue'
                        />
                    )}
                    <Tab
                        label={smDownBreakpoint ? <Typography variant='caption'>Questions</Typography> : 'Questions'}
                        value='Questions'
                    />
                    <Tab
                        label={smDownBreakpoint ? <Typography variant='caption'>Feedback</Typography> : 'Feedback'}
                        value='Feedback'
                    />
                    {isViewerModerator && (
                        <Tab
                            label={
                                smDownBreakpoint ? <Typography variant='caption'>Broadcast</Typography> : 'Broadcast'
                            }
                            value='Broadcast'
                        />
                    )}
                </StyledTabs>
                <StyledColumnGrid
                    props={{
                        id: 'scrollable-tab',
                        minHeight: '500px',
                        display: 'flex',
                        flexGrow: 1,
                        padding: 0,
                    }}
                    scrollable={false}
                >
                    {isViewerModerator === true && (
                        <QuestionQueue fragmentRef={data} isVisible={bottomTab === 'Queue'} />
                    )}
                    <QuestionList fragmentRef={data} isVisible={bottomTab === 'Questions'} searchOnly={false} />
                    <LiveFeedbackList fragmentRef={data} isVisible={bottomTab === 'Feedback'} />
                    {isViewerModerator === true && (
                        <BroadcastMessageList fragmentRef={data} isVisible={bottomTab === 'Broadcast'} />
                    )}
                </StyledColumnGrid>
            </Grid>
        </Grid>
    );
};
