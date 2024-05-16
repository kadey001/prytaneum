import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useUpdateTopicMutation } from '@local/__generated__/useUpdateTopicMutation.graphql';
import { Topic } from '../types';

const USE_UPDATE_TOPIC = graphql`
    mutation useUpdateTopicMutation($eventId: String!, $oldTopic: String!, $newTopic: String!, $description: String!) {
        updateTopic(eventId: $eventId, oldTopic: $oldTopic, newTopic: $newTopic, description: $description) {
            body {
                topic
                description
            }
            isError
            message
        }
    }
`;

export function useUpdateTopic() {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useUpdateTopicMutation>(USE_UPDATE_TOPIC);

    const updateTopic = (oldTopic: Topic, newTopic: Topic, onSuccess: () => void) => {
        try {
            commit({
                variables: {
                    eventId,
                    oldTopic: oldTopic.topic,
                    newTopic: newTopic.topic,
                    description: newTopic.description,
                },
                onCompleted: (response) => {
                    console.log('Response: ', response.updateTopic);
                    if (!response.updateTopic) throw new Error('An error occurred while updating the topic');
                    if (response.updateTopic.isError) {
                        displaySnack(response.updateTopic.message, { variant: 'error' });
                        return;
                    }
                    displaySnack('Topic updated successfully', { variant: 'success' });
                    onSuccess();
                },
                onError: (error) => {
                    throw error;
                },
            });
        } catch (error) {
            if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
            else displaySnack('An error occurred while updating the topic', { variant: 'error' });
        }
    };

    return { updateTopic };
}
