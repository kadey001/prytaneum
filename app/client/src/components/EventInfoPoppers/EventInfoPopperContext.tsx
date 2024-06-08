import { useState, createContext, useEffect } from 'react';

type TEventInfoPopperContext = {
    currentPopper: number;
    handleNextPopper: () => void;
    resetPopper: () => void;
};
export const EventInfoPopperContext = createContext<TEventInfoPopperContext>({
    currentPopper: 0,
    handleNextPopper: () => {},
    resetPopper: () => {},
});

type EventInfoPopperProviderProps = {
    children: React.ReactNode;
};
export function EventInfoPopperProvider({ children }: EventInfoPopperProviderProps) {
    const [currentPopper, setCurrentPopper] = useState<number>(0);

    const handleNextPopper = () => setCurrentPopper((prev) => prev + 1);

    const resetPopper = () => setCurrentPopper(0);

    // Ensure popper is default to 0 when component mounts
    useEffect(() => {
        resetPopper();
    }, []);

    return (
        <EventInfoPopperContext.Provider value={{ currentPopper, handleNextPopper, resetPopper }}>
            {children}
        </EventInfoPopperContext.Provider>
    );
}
