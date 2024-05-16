import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useDeleteTopicMutation } from '@local/__generated__/useDeleteTopicMutation.graphql';
import { Topic } from '../types';

const USE_DELETE_TOPIC = graphql`
    mutation useDeleteTopicMutation($eventId: String!, $topic: String!) {
        removeTopic(eventId: $eventId, topic: $topic) {
            isError
            message
        }
    }
`;

export function useDeleteTopic() {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useDeleteTopicMutation>(USE_DELETE_TOPIC);

    const deleteTopic = (topic: Topic, onSuccess: () => void) => {
        try {
            commit({
                variables: { eventId, topic: topic.topic },
                onCompleted: (response) => {
                    if (!response.removeTopic) throw new Error('An error occurred while deleting topic');
                    if (response.removeTopic.isError) {
                        displaySnack(response.removeTopic.message, { variant: 'error' });
                        return;
                    }
                    displaySnack('Topic deleted successfully', { variant: 'success' });
                    onSuccess();
                },
                onError: (error) => {
                    throw error;
                },
            });
        } catch (error) {
            if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
            else displaySnack('An error occurred while deleting topic', { variant: 'error' });
        }
    };

    return { deleteTopic };
}
