import { useCallback } from 'react';
import { useSnackbar, OptionsObject, SnackbarKey } from 'notistack';
import { Button } from '@mui/material';
import Close from '@mui/icons-material/Close';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

interface Props {
    openPrompt: (promptId: string) => void;
    removePrompt: (promptId: string) => void;
}

export function useLiveFeedbackPromptResponseSnack({ openPrompt, removePrompt }: Props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onClick = useCallback(
        (key: SnackbarKey, promptId: string) => {
            openPrompt(promptId);
            closeSnackbar(key);
        },
        [closeSnackbar, openPrompt]
    );

    const feedbackPromptAction = useCallback(
        (key: SnackbarKey, promptId: string) => (
            <div>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => onClick(key, promptId)}
                    startIcon={<QuestionAnswerIcon />}
                >
                    Respond
                </Button>
                <Button
                    onClick={() => {
                        removePrompt(promptId);
                        closeSnackbar(key);
                    }}
                >
                    <Close />
                </Button>
            </div>
        ),
        [onClick, removePrompt, closeSnackbar]
    );

    const displaySnack = useCallback(
        (promptId: string, message: string, options?: OptionsObject) => {
            enqueueSnackbar(message, {
                variant: options?.variant || 'default',
                action: (key) => options?.action || feedbackPromptAction(key, promptId),
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
    return { displaySnack };
}
