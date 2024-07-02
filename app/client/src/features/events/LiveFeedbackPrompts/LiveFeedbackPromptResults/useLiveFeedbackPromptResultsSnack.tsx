import { useCallback } from 'react';
import { useSnackbar, OptionsObject, SnackbarKey } from 'notistack';
import { Button } from '@mui/material';
import Close from '@mui/icons-material/Close';

interface Props {
    openPromptResults: (promptId: string) => void;
}

export function useLiveFeedbackPromptResultsSnack({ openPromptResults }: Props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const onClick = useCallback(
        (promptId: string) => {
            openPromptResults(promptId);
            closeSnackbar();
        },
        [closeSnackbar, openPromptResults]
    );

    const feedbackPromptAction = useCallback(
        (key: SnackbarKey, promptId: string) => (
            <div style={{ display: 'flex' }}>
                <div>
                    <Button variant='contained' color='primary' onClick={() => onClick(promptId)}>
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
