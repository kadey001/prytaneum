import { useState, useCallback, createContext, useEffect } from 'react';

type TEventInfoPopperContext = {
    currentPopper: number;
    handleNextPopper: () => void;
};
export const EventInfoPopperContext = createContext<TEventInfoPopperContext>({
    currentPopper: 0,
    handleNextPopper: () => {},
});

type EventInfoPopperProviderProps = {
    children: React.ReactNode;
};
export function EventInfoPopperProvider({ children }: EventInfoPopperProviderProps) {
    const [currentPopper, setCurrentPopper] = useState<number>(0);

    const handleNextPopper = useCallback(() => {
        setCurrentPopper((prev) => prev + 1);
    }, []);

    useEffect(() => {
        setCurrentPopper(0);
    }, []);

    return (
        <EventInfoPopperContext.Provider value={{ currentPopper, handleNextPopper }}>
            {children}
        </EventInfoPopperContext.Provider>
    );
}
