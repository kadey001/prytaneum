import React from 'react';
import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useAddTopicMutation } from '@local/__generated__/useAddTopicMutation.graphql';
import { Topic } from '../types';
import { TopicContext } from '../EventTopicSettings';

const USE_ADD_TOPIC = graphql`
    mutation useAddTopicMutation($eventId: String!, $topic: String!, $description: String!) {
        addTopic(eventId: $eventId, topic: $topic, description: $description) {
            isError
            message
        }
    }
`;

export function useAddTopic() {
    const { eventId } = useEvent();
    const { topics } = React.useContext(TopicContext);
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useAddTopicMutation>(USE_ADD_TOPIC);

    const addTopic = (newTopic: Topic, onSuccess: () => void) => {
        // Validate that the new topic is unique
        if (topics.find((topic) => topic.topic === newTopic.topic)) {
            displaySnack('Topic already exists, please ensure it is unique.', { variant: 'error' });
            return;
        }
        try {
            commit({
                variables: { eventId, topic: newTopic.topic, description: newTopic.description },
                onCompleted: (response) => {
                    if (!response.addTopic) throw new Error('An error occurred while adding topic');
                    if (response.addTopic.isError) {
                        displaySnack(response.addTopic.message, { variant: 'error' });
                        return;
                    }
                    displaySnack('Topic added successfully', { variant: 'success' });
                    onSuccess();
                },
                onError: (error) => {
                    throw error;
                },
            });
        } catch (error) {
            if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
            else displaySnack('An error occurred while adding topic', { variant: 'error' });
        }
    };

    return { addTopic };
}
