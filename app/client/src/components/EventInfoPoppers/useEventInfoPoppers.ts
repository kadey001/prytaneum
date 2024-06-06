// Controls the flow of poppers, should be displayed in order with the next one appearing after the previous one is dismissed.
import { useCallback, useContext } from 'react';
import { EventInfoPopperContext } from './EventInfoPopperContext';

export const NUMBER_OF_STAGES = 3;

export function useEventInfoPopper() {
    const { currentPopper, handleNextPopper, resetPopper } = useContext(EventInfoPopperContext);

    // Callback to reset local storage and popper state
    const resetEventInfoPoppers = useCallback(() => {
        for (let i = 1; i <= NUMBER_OF_STAGES; i++) {
            localStorage.removeItem(`eventInfoPopperViewedStage${i}`);
        }
        resetPopper();
    }, [resetPopper]);

    return [currentPopper, handleNextPopper, resetEventInfoPoppers] as const;
}
