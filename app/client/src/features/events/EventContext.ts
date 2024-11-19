import { useEventDetailsFragment$data } from '@local/__generated__/useEventDetailsFragment.graphql';
import { createContext } from 'react';

/**
 * This context is meant to have "common" information that many components need to know about
 * to do their job properly and may only need to know this common information
 * if the component requires more detailed information then it
 * should be using a fragment and query directly
 */
interface TEventContext {
    /**
     * current event id
     */
    eventId: string;
    /**
     * is the current user a moderator
     */
    isModerator: boolean;
    pauseParentRefreshing: () => void;
    resumeParentRefreshing: () => void;
    eventData: useEventDetailsFragment$data;
}

// if value is null, then there is no context within the parent tree
export const EventContext = createContext<TEventContext | null>(null);
