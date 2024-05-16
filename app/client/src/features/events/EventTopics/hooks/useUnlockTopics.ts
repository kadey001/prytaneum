import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useUnlockTopicsMutation } from '@local/__generated__/useUnlockTopicsMutation.graphql';
import { Topic } from '../types';

const USE_UNLOCK_TOPICS = graphql`
    mutation useUnlockTopicsMutation($eventId: String!, $topics: [String!]!) {
        unlockTopics(eventId: $eventId, topics: $topics) {
            isError
            message
        }
    }
`;

export function useUnlockTopics() {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useUnlockTopicsMutation>(USE_UNLOCK_TOPICS);

    const unlockTopics = (topics: Topic[], onSuccess: () => void) => {
        const topicsList = topics.map((topic) => topic.topic);
        try {
            commit({
                variables: { eventId, topics: topicsList },
                onCompleted: (response) => {
                    if (!response.unlockTopics) throw new Error('An error occurred while unlocking topics');
                    if (response.unlockTopics.isError) {
                        displaySnack(response.unlockTopics.message, { variant: 'error' });
                        return;
                    }
                    displaySnack('Topics unlocked successfully', { variant: 'success' });
                    onSuccess();
                },
                onError: (error) => {
                    throw error;
                },
            });
        } catch (error) {
            if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
            else displaySnack('An error occurred while unlocking topics', { variant: 'error' });
        }
    };

    return { unlockTopics };
}
