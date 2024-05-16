import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useUnlockTopicMutation } from '@local/__generated__/useUnlockTopicMutation.graphql';
import { Topic } from '../types';

const USE_UNLOCK_TOPIC = graphql`
    mutation useUnlockTopicMutation($eventId: String!, $topic: String!) {
        unlockTopic(eventId: $eventId, topic: $topic) {
            body {
                topic
            }
            isError
            message
        }
    }
`;

export function useUnlockTopic() {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useUnlockTopicMutation>(USE_UNLOCK_TOPIC);

    const unlockTopic = (topic: Topic, onSuccess: () => void) => {
        try {
            commit({
                variables: { eventId, topic: topic.topic },
                onCompleted: (response) => {
                    if (!response.unlockTopic) throw new Error('An error occurred while unlocking the topic');
                    if (response.unlockTopic.isError) {
                        displaySnack(response.unlockTopic.message, { variant: 'error' });
                        return;
                    }
                    displaySnack(`Topic "${topic.topic}" unlocked successfully`, { variant: 'success' });
                    onSuccess();
                },
                onError: (error) => {
                    throw error;
                },
            });
        } catch (error) {
            if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
            else displaySnack('An error occurred while unlocking the topic', { variant: 'error' });
        }
    };

    return { unlockTopic };
}
