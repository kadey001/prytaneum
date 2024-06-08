import * as React from 'react';
import { Typography, Paper, Stack, IconButton, Tooltip, Popper, Backdrop } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import CloseIcon from '@mui/icons-material/Close';

import { useEventInfoPopper } from './useEventInfoPoppers';

const POPPER_BG_COLOR = '#2962ff'; // blue

export enum EventInfoPopperStage {
    VideoPlayer = 0,
    Questions = 1,
    Feedback = 2,
    Language = 3,
}

interface EventVideoInfoPopperProps {
    videoContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export function EventVideoInfoPopper({ videoContainerRef }: EventVideoInfoPopperProps) {
    const [currentPopper, handleNextPopper] = useEventInfoPopper();
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const isPopperOpen = Boolean(anchorEl);
    const popperId = isPopperOpen ? 'video-player-info-popper' : undefined;
    const popperStageViewedKey = `eventInfoPopperViewedStage${EventInfoPopperStage.VideoPlayer}`;

    const handleClose = () => {
        setAnchorEl(null);
        localStorage.setItem(popperStageViewedKey, 'true');
        handleNextPopper();
    };

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const viewedPopperStage = localStorage.getItem(popperStageViewedKey);
            if (viewedPopperStage === 'true') return handleNextPopper();
            setAnchorEl(videoContainerRef.current);
        }, 500);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (currentPopper !== EventInfoPopperStage.VideoPlayer) return null;

    return (
        <React.Fragment>
            <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isPopperOpen} onClick={handleClose} />
            <Popper
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                id={popperId}
                open={isPopperOpen}
                anchorEl={anchorEl}
                placement='bottom-start'
            >
                <Paper
                    sx={{
                        padding: '1rem',
                        backgroundColor: POPPER_BG_COLOR,
                        alignItems: 'center',
                    }}
                >
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Tooltip title='Video Player Info' placement='bottom-start'>
                            <InfoIcon sx={{ color: 'white' }} />
                        </Tooltip>
                        <Typography fontWeight='bold' color='white'>
                            Hover over the video player and click the unmute icon
                        </Typography>
                        <VolumeOffIcon sx={{ color: 'white' }} />
                        <Typography color='white'>to hear the event video.</Typography>
                        <Tooltip title='Dismiss' placement='bottom-start'>
                            <IconButton onClick={handleClose}>
                                <CloseIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Paper>
            </Popper>
        </React.Fragment>
    );
}

interface EventQuestionInfoPopperProps {
    questionContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export function EventQuestionInfoPopper({ questionContainerRef }: EventQuestionInfoPopperProps) {
    const [currentPopper, handleNextPopper] = useEventInfoPopper();
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const isPopperOpen = Boolean(anchorEl);
    const popperId = isPopperOpen ? 'question-info-popper' : undefined;
    const popperStageViewedKey = `eventInfoPopperViewedStage${EventInfoPopperStage.Questions}`;

    const handleClose = () => {
        setAnchorEl(null);
        localStorage.setItem(popperStageViewedKey, 'true');
        handleNextPopper();
    };

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const viewedPopperStage = localStorage.getItem(popperStageViewedKey);
            if (viewedPopperStage === 'true') return handleNextPopper();
            setAnchorEl(questionContainerRef.current);
        }, 500);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (currentPopper !== EventInfoPopperStage.Questions) return null;

    return (
        <React.Fragment>
            <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isPopperOpen} onClick={handleClose} />
            <Popper
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                id={popperId}
                open={isPopperOpen}
                anchorEl={anchorEl}
                placement='left-end'
            >
                <Paper sx={{ padding: '1rem', backgroundColor: POPPER_BG_COLOR, alignItems: 'center' }}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Tooltip title='Question Info' placement='bottom-start'>
                            <InfoIcon sx={{ color: 'white' }} />
                        </Tooltip>
                        <Typography fontWeight='bold' color='white' width='25rem'>
                            In the questions tab you can view, like, and quote other participant&apos;s questions or ask
                            your own questions related to the event.
                        </Typography>
                        <Tooltip title='Dismiss' placement='bottom-start'>
                            <IconButton onClick={handleClose}>
                                <CloseIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Paper>
            </Popper>
        </React.Fragment>
    );
}

interface EventFeedbackInfoPopperProps {
    feedbackContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export function EventFeedbackInfoPopper({ feedbackContainerRef }: EventFeedbackInfoPopperProps) {
    const [currentPopper, handleNextPopper] = useEventInfoPopper();
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const isPopperOpen = Boolean(anchorEl);
    const popperId = isPopperOpen ? 'question-info-popper' : undefined;
    const popperStageViewedKey = `eventInfoPopperViewedStage${EventInfoPopperStage.Feedback}`;

    const handleClose = () => {
        setAnchorEl(null);
        localStorage.setItem(popperStageViewedKey, 'true');
        handleNextPopper();
    };

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const viewedPopperStage = localStorage.getItem(popperStageViewedKey);
            if (viewedPopperStage === 'true') return handleNextPopper();
            setAnchorEl(feedbackContainerRef.current);
        }, 500);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (currentPopper !== EventInfoPopperStage.Feedback) return null;

    return (
        <React.Fragment>
            <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isPopperOpen} onClick={handleClose} />
            <Popper
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                id={popperId}
                open={isPopperOpen}
                anchorEl={anchorEl}
                placement='left-end'
            >
                <Paper sx={{ padding: '1rem', backgroundColor: POPPER_BG_COLOR, alignItems: 'center' }}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Tooltip title='Question Info' placement='bottom-start'>
                            <InfoIcon sx={{ color: 'white' }} />
                        </Tooltip>
                        <Typography fontWeight='bold' color='white' width='25rem'>
                            In the feedback tab you can directly message the event moderators with your feedback or
                            about any technical issues you may be experiencing.
                        </Typography>
                        <Tooltip title='Dismiss' placement='bottom-start'>
                            <IconButton onClick={handleClose}>
                                <CloseIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Paper>
            </Popper>
        </React.Fragment>
    );
}

interface EventLanguageInfoPopperProps {
    languageButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
}

export function EventLanguageInfoPopper({ languageButtonRef }: EventLanguageInfoPopperProps) {
    const [currentPopper, handleNextPopper] = useEventInfoPopper();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const isPopperOpen = Boolean(anchorEl);
    const popperId = isPopperOpen ? 'question-info-popper' : undefined;
    const popperStageViewedKey = `eventInfoPopperViewedStage${EventInfoPopperStage.Language}`;

    const handleClose = () => {
        setAnchorEl(null);
        localStorage.setItem(popperStageViewedKey, 'true');
        handleNextPopper();
    };

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const viewedPopperStage = localStorage.getItem(popperStageViewedKey);
            if (viewedPopperStage === 'true') return handleNextPopper();
            setAnchorEl(languageButtonRef.current);
        }, 500);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (currentPopper !== EventInfoPopperStage.Language) return null;

    return (
        <React.Fragment>
            <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isPopperOpen} onClick={handleClose} />
            <Popper
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                id={popperId}
                open={isPopperOpen}
                anchorEl={anchorEl}
                placement='bottom-end'
            >
                <Paper sx={{ padding: '1rem', backgroundColor: POPPER_BG_COLOR, alignItems: 'center' }}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Tooltip title='Question Info' placement='bottom-start'>
                            <InfoIcon sx={{ color: 'white' }} />
                        </Tooltip>
                        <Typography fontWeight='bold' color='white' width='25rem'>
                            You can update your preferred language here!
                        </Typography>
                        <Tooltip title='Dismiss' placement='bottom-start'>
                            <IconButton onClick={handleClose}>
                                <CloseIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Paper>
            </Popper>
        </React.Fragment>
    );
}
