import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useLockTopicMutation } from '@local/__generated__/useLockTopicMutation.graphql';
import { Topic } from '../types';

const USE_LOCK_TOPIC = graphql`
    mutation useLockTopicMutation($eventId: String!, $topic: String!) {
        lockTopic(eventId: $eventId, topic: $topic) {
            body {
                topic
            }
            isError
            message
        }
    }
`;

export function useLockTopic() {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useLockTopicMutation>(USE_LOCK_TOPIC);

    const lockTopic = (topic: Topic, onSuccess: () => void, onFailure?: () => void) => {
        commit({
            variables: { eventId, topic: topic.topic },
            onCompleted: (response) => {
                try {
                    if (!response.lockTopic) throw new Error('An error occurred while locking the topic');
                    if (response.lockTopic.isError) throw new Error(response.lockTopic.message);
                    displaySnack(`Topic "${topic.topic}" locked successfully`, { variant: 'success' });
                    onSuccess();
                } catch (error) {
                    if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
                    else displaySnack('An error occurred while locking the topic', { variant: 'error' });
                    if (onFailure) onFailure();
                }
            },
            onError: (error) => {
                displaySnack(error.message, { variant: 'error' });
                if (onFailure) onFailure();
            },
        });
    };

    return { lockTopic };
}
