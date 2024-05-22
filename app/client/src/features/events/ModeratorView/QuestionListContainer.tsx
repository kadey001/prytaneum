import * as React from 'react';
import { Grid, Typography, IconButton, Paper, Stack, Badge, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { AutoSizer, List as VirtualizedList, CellMeasurer, CellMeasurerCache, InfiniteLoader } from 'react-virtualized';
import type { IndexRange } from 'react-virtualized';
import type { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';

import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useEvent } from '@local/features/events';
import { useQuestionCreated } from '@local/features/events/Questions/QuestionList/useQuestionCreated';
import { useQuestionUpdated } from '@local/features/events/Questions/QuestionList/useQuestionUpdated';
import { useQuestionDeleted } from '@local/features/events/Questions/QuestionList/useQuestionDeleted';
import AskQuestion from '@local/features/events/Questions/AskQuestion';
import { useQuestionsByTopic } from './hooks/useQuestionsByTopic';
import { useQuestionsByTopicFragment$key } from '@local/__generated__/useQuestionsByTopicFragment.graphql';
import EventQuestion from './EventQuestion';
import { Topic } from './types';

interface Props {
    fragmentRef: useQuestionsByTopicFragment$key;
    isVisible: boolean;
    askQuestionEnabled?: boolean;
    searchOnly?: boolean;
    topic: string;
    connections: string[];
    topics: readonly Topic[];
}

// TODO: Improve frozen questions logic so search is still possible
export function QuestionListContainer({
    fragmentRef,
    isVisible,
    askQuestionEnabled = true,
    searchOnly = false,
    topic,
    connections,
    topics,
}: Props) {
    const theme = useTheme();
    const { isModerator, eventId } = useEvent();
    const listRef = React.useRef<VirtualizedList | null>(null);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const {
        questions,
        connections: questionsByTopicConnections,
        loadNext,
        hasNext,
        refetch,
    } = useQuestionsByTopic({ fragmentRef });
    const [isFrozen, setIsFrozen] = React.useState(false);
    const [frozenQuestions, setFrozenQuestions] = React.useState<typeof questions>(questions);
    const QUESTIONS_BATCH_SIZE = 10;
    const allConnections = React.useMemo(
        () => [...connections, ...questionsByTopicConnections],
        [connections, questionsByTopicConnections]
    );
    useQuestionCreated({ connections: questionsByTopicConnections });
    useQuestionUpdated({ connections });
    useQuestionDeleted({ connections: questionsByTopicConnections });

    // Ensure that all topic lists are subscribed to.
    // Otherwise any updates to a non selected topic will not be updated without a page refresh
    React.useEffect(() => {
        topics.forEach((t) => {
            refetch({ topic: t.topic }, { fetchPolicy: 'network-only' });
        });
        refetch({ topic }, { fetchPolicy: 'network-only' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        refetch({ topic }, { fetchPolicy: 'network-only' });
        // TODO: Find a better way to scroll to top when topic changes
        const timeout = setTimeout(() => {
            if (listRef.current) {
                listRef.current.scrollToPosition(0);
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [refetch, topic]);

    const toggleSearch = React.useCallback(() => setIsSearchOpen((prev) => !prev), [setIsSearchOpen]);

    const accessors = React.useMemo<Accessors<ArrayElement<typeof questions>>[]>(
        () => [
            (q) => q?.question || '', // question text itself
            (q) => q?.createdBy?.firstName || '', // first name of the user
        ],
        []
    );

    const [filteredList, handleSearch, handleFilterChange] = useFilters(questions, accessors);

    function togglePause() {
        setIsFrozen((prev) => !prev);
        setFrozenQuestions(questions);
    }

    // Virtualized List variables and functions
    const listLength = React.useMemo(
        () => (isFrozen ? frozenQuestions.length : filteredList.length),
        [filteredList.length, frozenQuestions.length, isFrozen]
    );
    const isRowLoaded = ({ index }: { index: number }) => !!filteredList[index + 1];

    const loadMoreRows = React.useCallback(
        async ({}: IndexRange) => {
            if (hasNext) loadNext(QUESTIONS_BATCH_SIZE);
        },
        [hasNext, loadNext]
    );

    // TODO: Clear the cache when the window or panel is resized
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
        const question = isFrozen ? frozenQuestions[rowIndex] : filteredList[rowIndex];

        return (
            <CellMeasurer cache={cache} key={key} parent={parent} rowIndex={rowIndex}>
                {({ registerChild }) => (
                    // 'style' attribute required to position cell (within parent List)
                    <div
                        ref={registerChild as any}
                        style={{
                            ...style,
                            width: '100%',
                            paddingRight: '.5rem',
                            paddingLeft: '.5rem',
                            paddingTop: '.25rem',
                            paddingBottom: '.25rem',
                        }}
                    >
                        <EventQuestion question={question} connections={allConnections} />
                    </div>
                )}
            </CellMeasurer>
        );
    }

    const registerListRef = (list: VirtualizedList | null) => {
        listRef.current = list;
    };

    if (!isVisible) return <React.Fragment />;

    return (
        <Stack direction='column' alignItems='stretch' width='100%' padding={1} paddingRight={0}>
            {isVisible && (
                <React.Fragment>
                    <Paper sx={{ padding: '1rem', marginX: '8px', marginBottom: '0.5rem' }}>
                        {!searchOnly && (
                            <Stack
                                direction='row'
                                justifyContent='space-between'
                                alignItems='center'
                                marginBottom={isSearchOpen ? '.5rem' : '0rem'}
                            >
                                <Grid item xs='auto'>
                                    <IconButton onClick={togglePause}>
                                        {isFrozen ? (
                                            <Badge
                                                badgeContent={questions.length - frozenQuestions.length}
                                                color='secondary'
                                            >
                                                <Tooltip title='Un-Pause Question List'>
                                                    <PlayCircleIcon
                                                        fontSize='large'
                                                        sx={{ color: theme.palette.primary.main }}
                                                    />
                                                </Tooltip>
                                            </Badge>
                                        ) : (
                                            <Tooltip title='Pause Question List' placement='top'>
                                                <PauseCircleIcon
                                                    fontSize='large'
                                                    sx={{ color: theme.palette.primary.main }}
                                                />
                                            </Tooltip>
                                        )}
                                    </IconButton>
                                    <IconButton color={isSearchOpen ? 'primary' : 'default'} onClick={toggleSearch}>
                                        <Tooltip title='Search Bar' placement='top'>
                                            <SearchIcon fontSize='large' />
                                        </Tooltip>
                                    </IconButton>
                                </Grid>
                                {!isModerator && askQuestionEnabled && <AskQuestion eventId={eventId} />}
                            </Stack>
                        )}
                        <ListFilter
                            // filterMap={filterFuncs}
                            onFilterChange={handleFilterChange}
                            onSearch={handleSearch}
                            length={filteredList.length}
                            isSearchOpen={isSearchOpen || searchOnly}
                            isFrozen={isFrozen}
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
                    <div style={{ width: '100%', height: '100%', marginBottom: '0.5rem' }}>
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
                                        <VirtualizedList
                                            ref={(list) => {
                                                registerChild(list);
                                                registerListRef(list);
                                            }}
                                            height={height}
                                            width={width}
                                            rowCount={listLength}
                                            deferredMeasurementCache={cache}
                                            rowHeight={cache.rowHeight}
                                            rowRenderer={rowRenderer}
                                            onRowsRendered={onRowsRendered}
                                            scrollToRow={1}
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
