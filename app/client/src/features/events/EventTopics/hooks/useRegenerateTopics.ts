import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useRegenerateTopicsMutation } from '@local/__generated__/useRegenerateTopicsMutation.graphql';
import { Topic } from '../types';

const USE_REGENERATE_TOPICS = graphql`
    mutation useRegenerateTopicsMutation($eventId: String!) {
        regenerateEventTopics(eventId: $eventId) {
            body {
                topic
                description
                locked
            }
            isError
            message
        }
    }
`;

export function useRegenerateTopics() {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useRegenerateTopicsMutation>(USE_REGENERATE_TOPICS);

    const regenerateTopics = (onSuccess: (newTopics: Topic[]) => void) => {
        try {
            commit({
                variables: { eventId },
                onCompleted: (response) => {
                    if (!response.regenerateEventTopics) throw new Error('An error occurred while regenerating topics');
                    if (response.regenerateEventTopics.isError) {
                        displaySnack(response.regenerateEventTopics.message, { variant: 'error' });
                        return;
                    }
                    if (!response.regenerateEventTopics.body) throw new Error('No topics were returned');
                    displaySnack('Topics regenerated successfully', { variant: 'success' });
                    const newTopics = response.regenerateEventTopics.body as Topic[];
                    onSuccess(newTopics);
                },
                onError: (error) => {
                    throw error;
                },
            });
        } catch (error) {
            if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
            else displaySnack('An error occurred while regenerating topics', { variant: 'error' });
        }
    };

    return { regenerateTopics };
}
