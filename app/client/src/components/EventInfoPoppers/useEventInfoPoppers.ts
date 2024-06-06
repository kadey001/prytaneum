// Controls the flow of poppers, should be displayed in order with the next one appearing after the previous one is dismissed.
import { useContext } from 'react';
import { EventInfoPopperContext } from './EventInfoPopperContext';

export function useEventInfoPopper() {
    const { currentPopper, handleNextPopper } = useContext(EventInfoPopperContext);

    return [currentPopper, handleNextPopper] as const;
}
