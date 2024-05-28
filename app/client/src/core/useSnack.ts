import * as React from 'react';
import { useSnackbar, OptionsObject } from 'notistack';

export function useSnack() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const makeSnack = React.useCallback(
        (message: string, options?: OptionsObject) => {
            enqueueSnackbar(message, {
                variant: options?.variant || 'default',
                action: options?.action,
                onExited: options?.onExited,
                color: 'inherit',
                anchorOrigin: options?.anchorOrigin || {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            });
        },
        [enqueueSnackbar]
    );
    return { displaySnack: makeSnack, closeSnack: closeSnackbar };
}
