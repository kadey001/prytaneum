import * as React from 'react';
import {
    Grid,
    Typography,
    IconButton,
    Paper,
    Stack,
    Badge,
    Tooltip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { AutoSizer, List as VirtualizedList, CellMeasurer, CellMeasurerCache, InfiniteLoader } from 'react-virtualized';
import type { IndexRange } from 'react-virtualized';
import type { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';

import ListFilter, { useFilters, Accessors } from '@local/components/ListFilter';
import { ArrayElement } from '@local/utils/ts-utils';
import { useEvent } from '@local/features/events';
import { useQuestionUpdated } from '@local/features/events/Questions/QuestionList/useQuestionUpdated';
import { useQuestionDeleted } from '@local/features/events/Questions/QuestionList/useQuestionDeleted';
import { useQuestionsByTopic } from './hooks/useQuestionsByTopic';
import { useQuestionsByTopicFragment$key } from '@local/__generated__/useQuestionsByTopicFragment.graphql';
import EventQuestion from './EventQuestion';
import { Topic } from './types';
import { useQuestionDequeued } from './hooks/useQuestionDequeued';
import { useQuestionEnqueued } from './hooks/useQuestionEnqueued';
import { useQuestionCreatedByTopic } from './hooks/useQuestionCreatedByTopic';

interface Props {
    fragmentRef: useQuestionsByTopicFragment$key;
    isVisible: boolean;
    askQuestionEnabled?: boolean;
    searchOnly?: boolean;
    topic: string;
    handleTopicChange: (event: SelectChangeEvent<string>) => void;
    connections: string[];
    topics: readonly Topic[];
}

// TODO: Improve frozen questions logic so search is still possible
export function QuestionListContainer({
    fragmentRef,
    isVisible,
    searchOnly = false,
    topic,
    handleTopicChange,
    connections,
    topics,
}: Props) {
    const theme = useTheme();
    const { eventId } = useEvent();
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
    const QUESTIONS_BATCH_SIZE = 25;
    const allConnections = React.useMemo(
        () => [...connections, ...questionsByTopicConnections],
        [connections, questionsByTopicConnections]
    );

    useQuestionCreatedByTopic({ topic, connections: questionsByTopicConnections });
    useQuestionUpdated({ connections });
    useQuestionDeleted({ connections: questionsByTopicConnections });
    useQuestionDequeued({ eventId, topic, connections: questionsByTopicConnections });
    useQuestionEnqueued({ eventId, topic, connections: questionsByTopicConnections });

    // Ensure that all topic lists are subscribed to.
    // Otherwise any updates to a non selected topic will not be updated without a page refresh
    React.useEffect(() => {
        topics.forEach((t) => {
            refetch({ topic: t.topic }, { fetchPolicy: 'network-only' });
        });
        refetch({ topic }, { fetchPolicy: 'store-and-network' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        refetch({ topic }, { fetchPolicy: 'store-and-network' });
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

    // Handle topic change
    React.useEffect(() => {
        if (isFrozen) setIsFrozen(false);
        // TODO: Find a better way to scroll to top when topic changes
        const timeout = setTimeout(() => {
            if (listRef.current) {
                listRef.current.scrollToPosition(0);
            }
        }, 50);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topic]);

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
        defaultHeight: 160,
        minHeight: 124,
        fixedWidth: true,
        fixedHeight: false,
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
                {({ registerChild, measure }) => (
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
                        <EventQuestion question={question} connections={allConnections} measure={measure} />
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
        <Stack direction='column' alignItems='stretch' width='100%' height='100%' paddingTop={1} paddingRight={0}>
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
                                    <Badge badgeContent={questions.length - frozenQuestions.length} color='secondary'>
                                        <Tooltip title='Un-Pause Question List'>
                                            <PlayCircleIcon
                                                fontSize='large'
                                                sx={{ color: theme.palette.primary.main }}
                                            />
                                        </Tooltip>
                                    </Badge>
                                ) : (
                                    <Tooltip title='Pause Question List' placement='top'>
                                        <PauseCircleIcon fontSize='large' sx={{ color: theme.palette.primary.main }} />
                                    </Tooltip>
                                )}
                            </IconButton>
                            <IconButton color={isSearchOpen ? 'primary' : 'default'} onClick={toggleSearch}>
                                <Tooltip title='Search Bar' placement='top'>
                                    <SearchIcon fontSize='large' />
                                </Tooltip>
                            </IconButton>
                        </Grid>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id='topic-select-label'>Topic</InputLabel>
                            <Select
                                labelId='topic-select-label'
                                id='topic-select'
                                value={topic}
                                label='Topic'
                                onChange={handleTopicChange}
                            >
                                <MenuItem value='default'>Default</MenuItem>
                                {topics.map((_topic) => (
                                    <MenuItem key={_topic.id} value={_topic.topic}>
                                        {_topic.topic}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Tooltip title='Filter the question list and queue by a selected topic. Default shows all questions.'>
                            <InfoIcon sx={{ color: theme.palette.primary.main }} />
                        </Tooltip>
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
            <div style={{ width: '100%', height: '100%' }}>
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreRows}
                    minimumBatchSize={QUESTIONS_BATCH_SIZE}
                    rowCount={listLength}
                    threshold={15}
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
                                    overscanRowCount={10}
                                />
                            )}
                        </AutoSizer>
                    )}
                </InfiniteLoader>
            </div>
        </Stack>
    );
}
