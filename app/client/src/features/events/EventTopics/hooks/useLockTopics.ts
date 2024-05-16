import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useLockTopicsMutation } from '@local/__generated__/useLockTopicsMutation.graphql';
import { Topic } from '../types';

const USE_LOCK_TOPICS = graphql`
    mutation useLockTopicsMutation($eventId: String!, $topics: [String!]!) {
        lockTopics(eventId: $eventId, topics: $topics) {
            isError
            message
        }
    }
`;

export function useLockTopics() {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useLockTopicsMutation>(USE_LOCK_TOPICS);

    const lockTopics = (topics: Topic[], onSuccess: () => void) => {
        const topicsList = topics.map((topic) => topic.topic);
        try {
            commit({
                variables: { eventId, topics: topicsList },
                onCompleted: (response) => {
                    if (!response.lockTopics) throw new Error('An error occurred while locking topics');
                    if (response.lockTopics.isError) {
                        displaySnack(response.lockTopics.message, { variant: 'error' });
                        return;
                    }
                    displaySnack('Topics locked successfully', { variant: 'success' });
                    onSuccess();
                },
                onError: (error) => {
                    throw error;
                },
            });
        } catch (error) {
            if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
            else displaySnack('An error occurred while locking topics', { variant: 'error' });
        }
    };

    return { lockTopics };
}
