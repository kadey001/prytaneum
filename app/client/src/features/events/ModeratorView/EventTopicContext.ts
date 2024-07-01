import { createContext } from 'react';
import { Topic } from './types';

interface TEventTopicContext {
    topic: string;
    topics: readonly Topic[];
}

export const EventTopicContext = createContext<TEventTopicContext | null>(null);
