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

    const unlockTopics = (topics: Topic[], onSuccess: () => void, onFailure?: () => void) => {
        const topicsList = topics.map((topic) => topic.topic);
        commit({
            variables: { eventId, topics: topicsList },
            onCompleted: (response) => {
                try {
                    if (!response.unlockTopics) throw new Error('An error occurred while unlocking topics');
                    if (response.unlockTopics.isError) throw new Error(response.unlockTopics.message);
                    displaySnack('Topics unlocked successfully', { variant: 'success' });
                    onSuccess();
                } catch (error) {
                    if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
                    else displaySnack('An error occurred while unlocking topics', { variant: 'error' });
                    if (onFailure) onFailure();
                }
            },
            onError: (error) => {
                displaySnack(error.message, { variant: 'error' });
                if (onFailure) onFailure();
            },
        });
    };

    return { unlockTopics };
}
