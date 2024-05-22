import * as React from 'react';
import { useFragment } from 'react-relay';
import { Grid, Card, Tooltip, Chip, Stack, Menu, MenuItem, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { QuestionAuthor, QuestionStats, QuestionContent, QuestionQuote } from '../Questions';
import { QuestionActions, QUESTION_ACTIONS_FRAGMENT } from '../Questions/QuestionActions';
import { Question } from './types';
import { getHashedColor } from '@local/core/getHashedColor';
import { useEvent } from '@local/features/events';
import { useUser } from '@local/features/accounts';
import { QueueButton } from '../Questions/QuestionActions/QueueButton';
import { QuestionActionsFragment$key } from '@local/__generated__/QuestionActionsFragment.graphql';
import { useHideQuestion } from '../Questions/QuestionActions/useHideQuestion';
import DeleteIcon from '@mui/icons-material/Delete';
import { Loader } from '@local/components';

interface Props {
    question: Question;
    connections: string[];
    deleteEnabled?: boolean;
    queueEnabled?: boolean;
}

/**
 * @description EventQuestion component that displays only on the moderator view
 */
export default function EventQuestion({ question, connections, deleteEnabled = true, queueEnabled = true }: Props) {
    const { isModerator } = useEvent();
    const { user } = useUser();
    const data = useFragment<QuestionActionsFragment$key>(QUESTION_ACTIONS_FRAGMENT, question);
    const [anchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const anchored = Boolean(anchorEl);
    const { handleClick } = useHideQuestion({ questionId: question.id.toString() });

    const topicColor = (topic?: string) => {
        if (!topic) return 'grey';
        return getHashedColor(topic);
    };

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setMenuAnchorEl(null);
    };

    const handleDelete = () => {
        handleClick();
        handleClose();
    };

    return (
        <React.Suspense fallback={<Loader />}>
            <Card
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: (theme) => theme.spacing(0.5),
                    borderRadius: '10px',
                }}
            >
                <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={1}>
                    <QuestionAuthor fragmentRef={question} />
                    <Stack direction='row' sx={{ paddingRight: '0.25rem' }}>
                        {queueEnabled && (
                            <div style={{}}>
                                <QueueButton fragmentRef={data} />
                            </div>
                        )}
                        {deleteEnabled && (
                            <div>
                                <IconButton onClick={handleOpen}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={anchored} onClick={handleClose}>
                                    <MenuItem onClick={handleDelete}>
                                        <DeleteIcon color='error' />
                                        <Typography color='error'>Delete</Typography>
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Stack>
                </Stack>
                {question?.refQuestion && <QuestionQuote fragmentRef={question.refQuestion} />}
                <QuestionContent fragmentRef={question} />
                <Grid container alignItems='center' justifyContent='space-between'>
                    {isModerator && <QuestionStats fragmentRef={question} />}
                    <QuestionActions
                        style={!isModerator ? { width: '100%' } : { width: '100%', maxWidth: '10rem' }}
                        likeEnabled={!isModerator && Boolean(user)}
                        quoteEnabled={!isModerator && Boolean(user)}
                        queueEnabled={false}
                        deleteEnabled={false}
                        connections={connections}
                        fragmentRef={question}
                    />
                    {isModerator && ( // filler to justify moderator queue button
                        <span style={{ visibility: 'hidden' }}>
                            <QuestionStats fragmentRef={question} />
                        </span>
                    )}
                </Grid>
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        flexWrap: 'nowrap',
                        listStyle: 'none',
                        padding: (theme) => theme.spacing(0.5),
                        margin: 0,
                        overflow: 'auto',
                        maxWidth: '100%',
                        width: '100%',
                        backgroundColor: 'transparent',
                        '::-webkit-scrollbar': {
                            height: '0.35rem',
                        },
                    }}
                >
                    {question?.topics?.map((_topic) => (
                        <Tooltip key={_topic.topic} title={_topic.description} placement='bottom'>
                            <Chip
                                label={_topic.topic}
                                sx={{
                                    color: 'white',
                                    backgroundColor: topicColor(_topic.topic),
                                    margin: '0.25rem',
                                }}
                            />
                        </Tooltip>
                    ))}
                </Grid>
            </Card>
        </React.Suspense>
    );
}
