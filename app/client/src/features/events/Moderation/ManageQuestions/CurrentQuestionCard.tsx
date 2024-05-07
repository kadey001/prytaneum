import * as React from 'react';
import { Grid, Chip, Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import type { useQuestionQueueFragment$key } from '@local/__generated__/useQuestionQueueFragment.graphql';
import { QuestionAuthor, QuestionContent, QuestionQuote } from '../../Questions';
import { NextQuestionButton } from './NextQuestionButton';
import { PreviousQuestionButton } from './PreviousQuestionButton';
import { useQuestionQueue } from './useQuestionQueue';
import { useRecordPush } from './useRecordPush';
import { useRecordRemove } from './useRecordRemove';
import { useRecordUnshift } from './useRecordUnshift';
import { useEnqueuedPush } from './useEnqueuedPush';
import { useEnqueuedRemove } from './useEnqueuedRemove';
import { useEnqueuedUnshift } from './useEnqueuedUnshift';

interface QuestionQueueProps {
    isViewerModerator: boolean;
    fragmentRef: useQuestionQueueFragment$key;
}

export function CurrentQuestionCard({ isViewerModerator, fragmentRef }: QuestionQueueProps) {
    const theme = useTheme();
    //
    // ─── HOOKS ──────────────────────────────────────────────────────────────────────
    //
    const { questionQueue } = useQuestionQueue({ fragmentRef });
    const recordConnection = React.useMemo(
        () => ({ connection: questionQueue?.questionRecord?.__id ?? '' }),
        [questionQueue?.questionRecord]
    );
    const enqueuedConnection = React.useMemo(
        () => ({ connection: questionQueue?.enqueuedQuestions?.__id ?? '' }),
        [questionQueue?.enqueuedQuestions]
    );

    //
    // ─── SUBSCRIPTION HOOKS ─────────────────────────────────────────────────────────
    //
    useRecordPush(recordConnection);
    useRecordRemove(recordConnection);
    useRecordUnshift(recordConnection);
    useEnqueuedPush(enqueuedConnection);
    useEnqueuedRemove(enqueuedConnection);
    useEnqueuedUnshift(enqueuedConnection);

    //
    // ─── COMPUTED VALUES ────────────────────────────────────────────────────────────
    //
    const enqueuedQuestions = React.useMemo(
        () =>
            questionQueue?.enqueuedQuestions?.edges
                ?.slice(0) // hacky way to copy the array, except current question -- feeling lazy TODO: more elegant solution
                ?.sort(({ node: a }, { node: b }) => (parseInt(a?.position) ?? 0) - (parseInt(b?.position) ?? 0)) ?? [],
        [questionQueue]
    );
    const questionRecord = React.useMemo(
        () =>
            questionQueue?.questionRecord?.edges
                ?.slice(0) // hacky way to copy the array, except current question -- feeling lazy TODO: more elegant solution
                ?.sort(({ node: a }, { node: b }) => (parseInt(a?.position) ?? 0) - (parseInt(b?.position) ?? 0)) ?? [],
        [questionQueue]
    );
    const canGoBackward = React.useMemo(() => questionRecord.length > 0, [questionRecord]);
    const canGoForward = React.useMemo(() => enqueuedQuestions.length > 0, [enqueuedQuestions]);
    const currentQuestion = React.useMemo(
        () => (questionRecord.length > 0 ? questionRecord[questionRecord.length - 1] : null),
        [questionRecord]
    );

    return (
        <Card
            style={{
                width: '100%',
                borderRadius: '10px',
                position: 'relative',
                overflow: 'visible',
                paddingTop: theme.spacing(0.5),
                marginTop: theme.spacing(3),
            }}
        >
            <Chip
                color='secondary'
                icon={<BookmarkIcon fontSize='small' />}
                label='Answering Now'
                style={{
                    padding: theme.spacing(0.5),
                    position: 'absolute',
                    top: theme.spacing(-2),
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: theme.palette.custom.creamCan,
                    background: theme.palette.custom.creamCan,
                    color: 'white',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                }}
            />
            {currentQuestion && <QuestionAuthor fragmentRef={currentQuestion.node} />}
            {currentQuestion && currentQuestion.node.refQuestion && (
                <QuestionQuote fragmentRef={currentQuestion.node.refQuestion} />
            )}
            {currentQuestion && <QuestionContent fragmentRef={currentQuestion.node} />}
            <Grid container alignItems='center' style={{ alignItems: 'center' }}>
                {!currentQuestion && (
                    <Typography style={{ margin: 'auto', paddingTop: '20px' }}>No Current Question</Typography>
                )}
            </Grid>
            {isViewerModerator && (
                <Grid
                    container
                    alignItems='center'
                    justifyContent='space-between'
                    style={{ padding: theme.spacing(0, 1, 1, 1) }}
                >
                    <PreviousQuestionButton disabled={!canGoBackward} />
                    <NextQuestionButton disabled={!canGoForward} />
                </Grid>
            )}
        </Card>
    );
}
