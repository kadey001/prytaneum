import { useCallback } from 'react';
import { useSnackbar, OptionsObject, SnackbarKey } from 'notistack';
import { Button } from '@mui/material';
import Close from '@mui/icons-material/Close';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

interface Props {
    openFeedbackPromptResponse: () => void;
}

export function useLiveFeedbackPromptResponseSnack({ openFeedbackPromptResponse }: Props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onClick = useCallback(() => {
        openFeedbackPromptResponse();
        closeSnackbar();
    }, [closeSnackbar, openFeedbackPromptResponse]);

    const feedbackPromptAction = useCallback(
        (key: SnackbarKey) => (
            <div>
                <Button variant='contained' color='primary' onClick={onClick} startIcon={<QuestionAnswerIcon />}>
                    Respond
                </Button>
                <Button
                    onClick={() => {
                        closeSnackbar(key);
                    }}
                >
                    <Close />
                </Button>
            </div>
        ),
        [closeSnackbar, onClick]
    );

    const makeSnack = useCallback(
        (message: string, options?: OptionsObject) => {
            enqueueSnackbar(message, {
                variant: options?.variant || 'default',
                action: options?.action || feedbackPromptAction,
                onExited: options?.onExited,
                color: 'inherit',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                persist: true,
            });
        },
        [enqueueSnackbar, feedbackPromptAction]
    );
    return { displaySnack: makeSnack, closeSnack: closeSnackbar };
}
