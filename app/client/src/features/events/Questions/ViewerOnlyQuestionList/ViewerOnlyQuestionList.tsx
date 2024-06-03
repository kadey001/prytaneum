import * as React from 'react';
import { Grid, Card, Typography, Stack, Paper, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache, InfiniteLoader } from 'react-virtualized';
import type { IndexRange } from 'react-virtualized';
import type { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';

import type { useViewerOnlyQuestionListFragment$key } from '@local/__generated__/useViewerOnlyQuestionListFragment.graphql';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useEvent } from '@local/features/events';
import { useUser } from '@local/features/accounts';

import { QuestionActions } from '../QuestionActions';
import { QuestionAuthor } from '../QuestionAuthor';
import { QuestionContent } from '../QuestionContent';
import { QuestionQuote } from '../QuestionQuote';
import { QuestionStats } from '../QuestionStats';
import { useViewerOnlyQuestionList } from './useViewerOnlyQuestionList';
import { useViewerOnlyQuestionCreated } from './useViewerOnlyQuestionCreated';
import { useViewerOnlyQuestionUpdated } from './useViewerOnlyQuestionUpdated';
import { useViewerOnlyQuestionDeleted } from './useViewerOnlyQuestionDeleted';
import AskQuestion from '../AskQuestion';

interface ViewerOnlyQuestionListProps {
    fragmentRef: useViewerOnlyQuestionListFragment$key;
    isVisible: boolean;
}

export function ViewerOnlyQuestionList({ fragmentRef, isVisible }: ViewerOnlyQuestionListProps) {
    const theme = useTheme();
    const { user } = useUser();
    const { isModerator, eventId } = useEvent();
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const { questions, connections, loadNext, hasNext } = useViewerOnlyQuestionList({ fragmentRef });
    const QUESTIONS_BATCH_SIZE = 10;
    useViewerOnlyQuestionCreated({ connections });
    useViewerOnlyQuestionUpdated();
    useViewerOnlyQuestionDeleted({ connections });
    // const [isPaused, setIsPaused] = React.useState();

    // function togglePause() {}

    const toggleSearch = React.useCallback(() => setIsSearchOpen((prev) => !prev), [setIsSearchOpen]);

    const accessors = React.useMemo<Accessors<ArrayElement<typeof questions>>[]>(
        () => [
            (q) => q?.question || '', // question text itself
            (q) => q?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(questions, accessors);

    // Virtualized List variables and functions
    const listLength = React.useMemo(() => filteredList.length, [filteredList]);
    const isRowLoaded = ({ index }: { index: number }) => !!filteredList[index + 1];

    const loadMoreRows = React.useCallback(
        async ({}: IndexRange) => {
            if (hasNext) loadNext(QUESTIONS_BATCH_SIZE);
        },
        [hasNext, loadNext]
    );

    const cache = new CellMeasurerCache({
        defaultHeight: 185,
        minHeight: 148,
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
        const question = filteredList[rowIndex];

        return (
            <CellMeasurer cache={cache} key={key} parent={parent} rowIndex={rowIndex}>
                {({ registerChild }) => (
                    // 'style' attribute required to position cell (within parent List)
                    <div ref={registerChild as any} style={{ ...style, width: '100%', padding: '.5rem' }}>
                        <Card
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                paddingTop: theme.spacing(0.5),
                                borderRadius: '10px',
                            }}
                        >
                            <QuestionAuthor fragmentRef={question} />
                            {question.refQuestion && <QuestionQuote fragmentRef={question.refQuestion} />}
                            <QuestionContent fragmentRef={question} />
                            <Grid container alignItems='center' justifyContent='space-between'>
                                {isModerator && <QuestionStats fragmentRef={question} />}
                                <QuestionActions
                                    style={!isModerator ? { width: '100%' } : { width: '100%', maxWidth: '10rem' }}
                                    likeEnabled={!isModerator && Boolean(user)}
                                    quoteEnabled={!isModerator && Boolean(user)}
                                    queueEnabled={isModerator && Boolean(user)}
                                    deleteEnabled={isModerator && Boolean(user)}
                                    connections={connections}
                                    fragmentRef={question}
                                />
                                {isModerator && ( // filler to justify moderator queue button
                                    <span style={{ visibility: 'hidden' }}>
                                        <QuestionStats fragmentRef={question} />
                                    </span>
                                )}
                            </Grid>
                        </Card>
                    </div>
                )}
            </CellMeasurer>
        );
    }

    if (!isVisible) return <React.Fragment />;

    return (
        <Stack direction='column' alignItems='stretch' width='100%' padding={1} paddingRight={0}>
            <Paper sx={{ padding: '1rem', marginX: '8px', marginBottom: '0.5rem' }}>
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    marginBottom={isSearchOpen ? '.5rem' : '0rem'}
                >
                    <Grid item xs='auto'>
                        {user && (
                            <IconButton color={isSearchOpen ? 'primary' : 'default'} onClick={toggleSearch}>
                                <SearchIcon fontSize='large' />
                            </IconButton>
                        )}
                    </Grid>
                    <AskQuestion eventId={eventId} viewerOnly={true} />
                </Stack>
                <ListFilter
                    // filterMap={filterFuncs}
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    length={filteredList.length}
                    isSearchOpen={isModerator || isSearchOpen}
                    // menuIcons={[
                    //     <Tooltip title='Load New'>
                    //         <span>
                    //             <IconButton color='inherit' onClick={togglePause}>
                    //                 <Badge badgeContent={isPaused ? 0 : 0} color='secondary'>
                    //                     {isPaused ? <PlayArrow /> : <Pause />}
                    //                 </Badge>
                    //             </IconButton>
                    //         </span>
                    //     </Tooltip>,
                    // ]}
                />
            </Paper>
            {filteredList.length === 0 && questions.length !== 0 && (
                <Typography align='center' variant='body2' marginTop='1rem'>
                    No results to display
                </Typography>
            )}
            {questions.length === 0 && (
                <Typography align='center' variant='h5' marginTop='1rem'>
                    <Stack direction='row' justifyContent='center' alignItems='center'>
                        No Questions to display
                        <SentimentDissatisfiedIcon />
                    </Stack>
                </Typography>
            )}
            <div style={{ width: '100%', height: '100%' }}>
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreRows}
                    minimumBatchSize={QUESTIONS_BATCH_SIZE}
                    rowCount={listLength}
                    threshold={5}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <AutoSizer>
                            {({ width, height }) => (
                                <List
                                    ref={registerChild}
                                    height={height}
                                    width={width}
                                    rowCount={listLength}
                                    deferredMeasurementCache={cache}
                                    rowHeight={cache.rowHeight}
                                    rowRenderer={rowRenderer}
                                    onRowsRendered={onRowsRendered}
                                />
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            </div>
        </Stack>
    );
}
