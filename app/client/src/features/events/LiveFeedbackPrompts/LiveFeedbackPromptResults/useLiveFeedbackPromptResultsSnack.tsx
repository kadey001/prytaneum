import { useCallback } from 'react';
import { useSnackbar, OptionsObject, SnackbarKey } from 'notistack';
import { Button } from '@mui/material';
import Close from '@mui/icons-material/Close';

interface Props {
    openFeedbackPromptResults: () => void;
}

export function useLiveFeedbackPromptResultsSnack({ openFeedbackPromptResults }: Props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onClick = useCallback(() => {
        openFeedbackPromptResults();
        closeSnackbar();
    }, [closeSnackbar, openFeedbackPromptResults]);

    const feedbackPromptAction = useCallback(
        (key: SnackbarKey) => (
            <div style={{ display: 'flex' }}>
                <div>
                    <Button variant='contained' color='primary' onClick={onClick}>
                        View Results
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={() => {
                            closeSnackbar(key);
                        }}
                    >
                        <Close />
                    </Button>
                </div>
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
