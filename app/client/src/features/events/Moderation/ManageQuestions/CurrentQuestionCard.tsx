import * as React from 'react';
import { Grid, Chip, Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import type { useOnDeckFragment$key } from '@local/__generated__/useOnDeckFragment.graphql';
import { QuestionAuthor, QuestionContent, QuestionQuote } from '../../Questions';
import { NextQuestionButton } from './NextQuestionButton';
import { PreviousQuestionButton } from './PreviousQuestionButton';
// import { useQuestionQueue } from './useQuestionQueue';
import { useRecordPush } from './useRecordPush';
import { useRecordRemove } from './useRecordRemove';
import { useRecordUnshift } from './useRecordUnshift';
import { useEnqueuedPush } from './useEnqueuedPush';
import { useEnqueuedRemove } from './useEnqueuedRemove';
import { useEnqueuedUnshift } from './useEnqueuedUnshift';
import { useOnDeck } from '../../ModeratorView/hooks/OnDeck/useOnDeck';

interface QuestionQueueProps {
    isViewerModerator: boolean;
    fragmentRef: useOnDeckFragment$key;
}

export function CurrentQuestionCard({ isViewerModerator, fragmentRef }: QuestionQueueProps) {
    const theme = useTheme();
    //
    // ─── HOOKS ──────────────────────────────────────────────────────────────────────
    //
    const { enqueuedQuestions, questionRecord, recordConnection, queueConnection } = useOnDeck({ fragmentRef });

    //
    // ─── SUBSCRIPTION HOOKS ─────────────────────────────────────────────────────────
    //
    useRecordPush({ connection: recordConnection });
    useRecordRemove({ connection: recordConnection });
    useRecordUnshift({ connection: recordConnection });

    useEnqueuedPush({ connection: queueConnection });
    useEnqueuedRemove({ connection: queueConnection });
    useEnqueuedUnshift({ connection: queueConnection });

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
            {currentQuestion && <QuestionAuthor fragmentRef={currentQuestion} />}
            {currentQuestion && currentQuestion.refQuestion && (
                <QuestionQuote fragmentRef={currentQuestion.refQuestion} />
            )}
            {currentQuestion && <QuestionContent fragmentRef={currentQuestion} />}
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
