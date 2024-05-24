import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUp from '@mui/icons-material/ThumbUp';
import {
    Card,
    Grid,
    Skeleton,
    Stack,
    Paper,
    CardHeader,
    Avatar,
    IconButton,
    Typography,
    CardContent,
    Chip,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import SearchIcon from '@mui/icons-material/Search';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List as VirtualizedList } from 'react-virtualized';
import type { MeasuredCellParent } from 'react-virtualized/dist/es/CellMeasurer';

function QuestionContentSkeleton() {
    return (
        <CardContent sx={{ margin: (theme) => theme.spacing(-2, 0, -1, 0) }}>
            <Skeleton variant='text' width='100%' height='48px' />
        </CardContent>
    );
}

function QuestionStatsSkeleton() {
    return (
        <CardContent
            sx={{
                display: 'flex',
                gap: (theme) => theme.spacing(0.5),
                alignItems: 'center',
                width: 'min-content', // minimized width and height since the icon had too much of a height difference to buttons
                height: 'min-content',
                paddingTop: 0,
                paddingBottom: '0 !important', // added !important for filler icon (for some reason, CSS wasn't being applied)
            }}
        >
            <ThumbUp fontSize='small' />
            <Typography>{<Skeleton variant='text' width='10px' />}</Typography>
        </CardContent>
    );
}

function QuestionAuthorSkeleton() {
    return (
        <CardHeader
            // get first letter of name to display
            avatar={<Avatar />}
            title={<Skeleton variant='text' width='120px' />}
        />
    );
}

function QuestionCardSkeleton() {
    return (
        <Card
            sx={{
                width: '100%',
                height: '220px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingTop: (theme) => theme.spacing(0.5),
                borderRadius: '10px',
            }}
        >
            <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={1}>
                <QuestionAuthorSkeleton />

                <Stack direction='row' sx={{ paddingRight: '0.25rem' }}>
                    <IconButton>
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </Stack>
            </Stack>
            {/* <Skeleton variant='text' width='100%' height='48px' /> */}
            <QuestionContentSkeleton />
            <QuestionStatsSkeleton />
            <Grid
                container
                sx={{
                    padding: (theme) => theme.spacing(0.5),
                }}
            >
                {/* <Skeleton variant='rounded' width='160px' height='32px' /> */}
                <Chip
                    label={<Skeleton variant='text' width='110px' />}
                    sx={{
                        color: 'white',
                        background: 'gray',
                        margin: '0.25rem',
                    }}
                />
            </Grid>
        </Card>
    );
}

export function QuestionListSkeleton({ xlUpBreakpoint }: { xlUpBreakpoint: boolean }) {
    // const theme = useTheme();
    // const xlUpBreakpoint = useMediaQuery(theme.breakpoints.up('xl'));
    console.log('Brekapoint: ', xlUpBreakpoint);

    const count = xlUpBreakpoint ? 8 : 5;

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
                        <QuestionCardSkeleton />
                    </div>
                )}
            </CellMeasurer>
        );
    }

    return (
        <Stack direction='column' alignItems='stretch' width='100%' padding={1}>
            <Paper sx={{ padding: '1rem', marginX: '8px', marginBottom: '0.5rem' }}>
                {/* <Skeleton variant='rectangular' width='100%' height='51px' /> */}
                <Stack direction='row' justifyContent='space-between' alignItems='center' marginBottom='0rem'>
                    <Grid item xs='auto'>
                        <IconButton>
                            <CircleIcon fontSize='large' />
                        </IconButton>
                        <IconButton>
                            <SearchIcon fontSize='large' />
                        </IconButton>
                    </Grid>
                </Stack>
            </Paper>
            <div style={{ width: '100%', height: '100%' }}>
                <AutoSizer>
                    {({ width, height }) => (
                        <VirtualizedList
                            height={height}
                            width={width}
                            rowCount={count}
                            deferredMeasurementCache={cache}
                            rowHeight={cache.rowHeight}
                            rowRenderer={rowRenderer}
                        />
                    )}
                </AutoSizer>
            </div>
            {/* <div style={{ width: '100%', height: '60vh', marginBottom: '0.5rem', overflowY: 'hidden' }}>
                {Array.from({ length: count }).map((_, index) => (
                    <QuestionCardSkeleton key={index} />
                ))}
            </div> */}
        </Stack>
    );
}
