import { useContext } from 'react';
import { EventTopicContext } from './EventTopicContext';

export function useTopic() {
    const ctxValue = useContext(EventTopicContext);
    if (ctxValue === null) throw new Error('`TopicContext` must be in the tree to use `useTopic`');
    return ctxValue;
}
