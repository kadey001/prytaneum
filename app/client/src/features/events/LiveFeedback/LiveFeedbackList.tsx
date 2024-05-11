import * as React from 'react';
import { Card, CardContent, Grid, List, ListItem, Typography, CardActions, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useLiveFeedbackListFragment$key } from '@local/__generated__/useLiveFeedbackListFragment.graphql';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useUser } from '@local/features/accounts';
import { useLiveFeedbackList } from './useLiveFeedbackList';
import { LiveFeedbackAuthor } from './LiveFeedbackAuthor';
import { useEvent } from '../useEvent';
import { LiveFeedbackReplyAction } from './LiveFeedbackReplyAction';
import { LiveFeedbackReply } from './LiveFeedbackReply';
import { SubmitLiveFeedbackPrompt } from '../LiveFeedbackPrompts/LiveFeedbackPrompt';
import { ShareFeedbackResults } from '../LiveFeedbackPrompts';
import { SubmitLiveFeedback } from './SubmitLiveFeedback';

interface LiveFeedbackListProps {
    fragmentRef: useLiveFeedbackListFragment$key;
    isVisible: boolean;
}

export function LiveFeedbackList({ fragmentRef, isVisible }: LiveFeedbackListProps) {
    const { user } = useUser();
    const [displayLiveFeedback, setDisplayLiveFeedback] = React.useState(false);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const { liveFeedback } = useLiveFeedbackList({ fragmentRef });
    const { isModerator, eventId } = useEvent();

    const toggleSearch = React.useCallback(() => setIsSearchOpen((prev) => !prev), [setIsSearchOpen]);

    const accessors = React.useMemo<Accessors<ArrayElement<typeof liveFeedback>>[]>(
        () => [
            (f) => f?.message || '', // feedback text itself
            (f) => f?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(liveFeedback, accessors);

    const ActionButtons = React.useMemo(() => {
        if (isModerator) {
            return (
                <Grid
                    container
                    direction='row'
                    justifyContent='space-evenly'
                    alignItems='center'
                    marginBottom={isSearchOpen ? '.5rem' : '0rem'}
                >
                    <Grid item xs='auto'>
                        <IconButton color={isSearchOpen ? 'primary' : 'default'} onClick={toggleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs='auto'>
                        <SubmitLiveFeedbackPrompt eventId={eventId} />
                    </Grid>
                    <Grid item xs='auto'>
                        <ShareFeedbackResults />
                    </Grid>
                    {/* <Grid item>
                        <SubmitLiveFeedback eventId={eventId} />
                    </Grid> */}
                </Grid>
            );
        } else {
            return (
                <Grid
                    container
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    marginBottom={isSearchOpen ? '.5rem' : '0rem'}
                >
                    <Grid item xs='auto'>
                        <IconButton color={isSearchOpen ? 'primary' : 'default'} onClick={toggleSearch}>
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs='auto'>
                        <SubmitLiveFeedback eventId={eventId} />
                    </Grid>
                    <Grid item xs='auto'>
                        <div style={{ display: 'none' }} />
                    </Grid>
                </Grid>
            );
        }
    }, [eventId, isModerator, isSearchOpen, toggleSearch]);

    React.useEffect(() => {
        if (!user) setDisplayLiveFeedback(false);
        else setDisplayLiveFeedback(true);
    }, [user, isModerator]);

    if (!isVisible) return <React.Fragment />;

    return (
        <Grid container height={0} flex='1 1 100%' justifyContent='center'>
            <Grid item width='100%'>
                <Paper sx={{ padding: '1rem', marginX: '8px' }}>
                    {ActionButtons}
                    <ListFilter
                        onFilterChange={handleFilterChange}
                        onSearch={handleSearch}
                        isSearchOpen={isSearchOpen}
                        length={filteredList.length}
                        displayNumResults={Boolean(user)} // only display for users logged in
                    />
                </Paper>
                <List disablePadding>
                    {displayLiveFeedback ? (
                        filteredList.map((feedback) => (
                            <ListItem disableGutters key={feedback.id} sx={{ paddingX: '0.5rem' }}>
                                <Card style={{ flex: 1, flexDirection: 'column' }}>
                                    <LiveFeedbackAuthor fragmentRef={feedback} />
                                    {feedback.refFeedback && <LiveFeedbackReply fragmentRef={feedback.refFeedback} />}
                                    <CardContent sx={{ margin: (theme) => theme.spacing(-2, 0, -1, 0) }}>
                                        <Typography variant='inherit' style={{ wordBreak: 'break-word' }}>
                                            {feedback.message}
                                        </Typography>
                                    </CardContent>
                                    {isModerator ? (
                                        <CardActions>
                                            <LiveFeedbackReplyAction fragmentRef={feedback} />
                                        </CardActions>
                                    ) : (
                                        <React.Fragment />
                                    )}
                                </Card>
                            </ListItem>
                        ))
                    ) : (
                        <Typography align='center' sx={{ paddingTop: (theme) => theme.spacing(2) }}>
                            Sign in to submit Live Feedback
                        </Typography>
                    )}
                </List>
            </Grid>
        </Grid>
    );
}
