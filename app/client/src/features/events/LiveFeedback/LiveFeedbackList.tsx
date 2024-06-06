import * as React from 'react';
import { Card, CardContent, Grid, Typography, CardActions, Paper, IconButton, Stack, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import { AutoSizer, List as VirtualizedList, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import type { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';

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

    // Virtualized List variables and functions
    const listLength = React.useMemo(() => filteredList.length, [filteredList]);

    const cache = new CellMeasurerCache({
        defaultHeight: 136,
        minHeight: 136,
        fixedWidth: true,
    });

    interface RowRendererProps {
        index: number;
        isScrolling: boolean;
        key: string;
        parent: MeasuredCellParent;
        style: React.CSSProperties;
    }

    function rowRenderer({ index: rowIndex, key, parent, style }: RowRendererProps) {
        const feedback = filteredList[rowIndex];

        return (
            <CellMeasurer cache={cache} key={key} parent={parent} rowIndex={rowIndex}>
                {({ registerChild }) => (
                    // 'style' attribute required to position cell (within parent List)
                    <div ref={registerChild as any} style={{ ...style, width: '100%', padding: '.5rem' }}>
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
                    </div>
                )}
            </CellMeasurer>
        );
    }

    const ActionButtons = React.useMemo(() => {
        if (isModerator) {
            return (
                <Grid
                    container
                    direction='row'
                    justifyContent='space-around'
                    alignItems='center'
                    marginBottom={isSearchOpen ? '.5rem' : '0rem'}
                    spacing={0.5}
                >
                    <Grid item xs='auto'>
                        <IconButton
                            color={isSearchOpen ? 'primary' : 'default'}
                            aria-label='search-icon-button'
                            onClick={toggleSearch}
                        >
                            <Tooltip title='Search Bar' placement='top'>
                                <SearchIcon fontSize='large' />
                            </Tooltip>
                        </IconButton>
                    </Grid>
                    <Grid item xs='auto'>
                        <SubmitLiveFeedbackPrompt eventId={eventId} />
                    </Grid>
                    <Grid item xs='auto'>
                        <ShareFeedbackResults />
                    </Grid>
                </Grid>
            );
        } else {
            return (
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    marginBottom={isSearchOpen ? '.5rem' : '0rem'}
                >
                    <Grid item xs='auto'>
                        {user && (
                            <IconButton
                                color={isSearchOpen ? 'primary' : 'default'}
                                aria-label='search-icon-button'
                                onClick={toggleSearch}
                            >
                                <Tooltip title='Search Bar' placement='top'>
                                    <SearchIcon fontSize='large' />
                                </Tooltip>
                            </IconButton>
                        )}
                    </Grid>
                    <SubmitLiveFeedback eventId={eventId} />
                    <Tooltip title='Submit any feedback or questions directly to the event moderators.'>
                        <InfoIcon sx={{ color: 'primary.main' }} />
                    </Tooltip>
                </Stack>
            );
        }
    }, [eventId, isModerator, isSearchOpen, toggleSearch, user]);

    React.useEffect(() => {
        if (!user) setDisplayLiveFeedback(false);
        else setDisplayLiveFeedback(true);
    }, [user, isModerator]);

    if (!isVisible) return <React.Fragment />;

    return (
        <Stack direction='column' alignItems='stretch' width='100%' padding={1} paddingRight={0}>
            <Paper sx={{ padding: '1rem', marginX: '8px', marginBottom: '0.5rem' }}>
                {ActionButtons}
                <ListFilter
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    isSearchOpen={isSearchOpen}
                    length={filteredList.length}
                    displayNumResults={Boolean(user)} // only display for users logged in
                />
            </Paper>
            {displayLiveFeedback && filteredList.length === 0 && (
                <Typography align='center' variant='h5' marginTop='1rem'>
                    No feedback to display
                </Typography>
            )}
            {displayLiveFeedback ? (
                <div style={{ width: '100%', height: '100%' }}>
                    <AutoSizer>
                        {({ width, height }) => (
                            <VirtualizedList
                                height={height}
                                width={width}
                                rowCount={listLength}
                                deferredMeasurementCache={cache}
                                rowHeight={cache.rowHeight}
                                rowRenderer={rowRenderer}
                            />
                        )}
                    </AutoSizer>
                </div>
            ) : (
                <Typography align='center' variant='h5' marginTop='1rem'>
                    Sign in to submit Live Feedback
                </Typography>
            )}
        </Stack>
    );
}
