import { createContext } from 'react';

interface TEventTopicContext {
    topic: string;
}

export const EventTopicContext = createContext<TEventTopicContext | null>(null);
