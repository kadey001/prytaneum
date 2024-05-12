/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { Grid, Card, Typography, IconButton, Paper, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache, InfiniteLoader } from 'react-virtualized';
import type { IndexRange } from 'react-virtualized';
import type { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';

import type { useQuestionListFragment$key } from '@local/__generated__/useQuestionListFragment.graphql';
import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useEvent } from '@local/features/events';
import { useUser } from '@local/features/accounts';

import { QuestionActions } from '../QuestionActions';
import { QuestionAuthor } from '../QuestionAuthor';
import { QuestionContent } from '../QuestionContent';
import { QuestionQuote } from '../QuestionQuote';
import { QuestionStats } from '../QuestionStats';
import { useQuestionList } from './useQuestionList';
import { useQuestionCreated } from './useQuestionCreated';
import { useQuestionUpdated } from './useQuestionUpdated';
import { useQuestionDeleted } from './useQuestionDeleted';
import { Loader } from '@local/components/Loader';
import { OperationType } from 'relay-runtime';
import { LoadMoreFn } from 'react-relay';
import AskQuestion from '../AskQuestion';

interface InfiniteScrollerProps {
    children: React.ReactNode | React.ReactNodeArray;
    isModerator: boolean;
    filteredList: Array<any>;
    loadNext: LoadMoreFn<OperationType>;
    hasNext: boolean;
}

export function InfiniteScroller({ children, isModerator, filteredList, loadNext, hasNext }: InfiniteScrollerProps) {
    return isModerator ? (
        <InfiniteScroll
            dataLength={filteredList.length}
            next={() => loadNext(10)}
            hasMore={hasNext}
            loader={<Loader />}
            hasChildren
            scrollableTarget='scrollable-tab'
        >
            {children}
        </InfiniteScroll>
    ) : (
        <>{children}</>
    );
}

interface QuestionListProps {
    fragmentRef: useQuestionListFragment$key;
    isVisible: boolean;
    askQuestionEnabled?: boolean;
    searchOnly?: boolean;
}

export function QuestionList({
    fragmentRef,
    isVisible,
    askQuestionEnabled = true,
    searchOnly = false,
}: QuestionListProps) {
    const theme = useTheme();
    const { user } = useUser();
    const { isModerator, eventId } = useEvent();
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const { questions, connections, loadNext, hasNext } = useQuestionList({ fragmentRef });
    const QUESTIONS_BATCH_SIZE = 10;
    useQuestionCreated({ connections });
    useQuestionUpdated({ connections });
    useQuestionDeleted({ connections });
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
        minHeight: 185,
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

    const getActionsBoxMargin = React.useMemo(() => {
        if (isModerator) return '1.5rem';
        if (isSearchOpen) return '2.5rem';
        return '1rem';
    }, [isModerator, isSearchOpen]);

    if (!isVisible) return <React.Fragment />;

    return (
        <Stack direction='column' alignItems='stretch' width='100%'>
            {isVisible && (
                <React.Fragment>
                    <Grid item width='100%' minHeight={0} marginBottom={getActionsBoxMargin}>
                        <Paper sx={{ padding: '1rem', marginX: '8px' }}>
                            {!isModerator && !searchOnly && (
                                <Grid
                                    container
                                    direction='row'
                                    justifyContent='space-between'
                                    marginBottom={isSearchOpen ? '.5rem' : '0rem'}
                                >
                                    <Grid item xs='auto'>
                                        <IconButton color={isSearchOpen ? 'primary' : 'default'} onClick={toggleSearch}>
                                            <SearchIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs='auto'>
                                        {askQuestionEnabled && <AskQuestion eventId={eventId} />}
                                    </Grid>
                                    <Grid item xs='auto'>
                                        <div style={{ display: 'none' }} />
                                    </Grid>
                                </Grid>
                            )}
                            <ListFilter
                                // filterMap={filterFuncs}
                                onFilterChange={handleFilterChange}
                                onSearch={handleSearch}
                                length={filteredList.length}
                                isSearchOpen={isModerator || isSearchOpen || searchOnly}
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
                    </Grid>
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
                </React.Fragment>
            )}
        </Stack>
    );
}
