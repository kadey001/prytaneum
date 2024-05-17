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

    const regenerateTopics = (onSuccess: (newTopics: Topic[]) => void, onFailure: () => void) => {
        commit({
            variables: { eventId },
            onCompleted: (response) => {
                try {
                    if (!response.regenerateEventTopics) throw new Error('An error occurred while regenerating topics');
                    if (response.regenerateEventTopics.isError) throw new Error(response.regenerateEventTopics.message);
                    if (!response.regenerateEventTopics.body || response.regenerateEventTopics.body.length === 0)
                        throw new Error('No topics were returned');
                    displaySnack('Topics regenerated successfully', { variant: 'success' });
                    const newTopics = response.regenerateEventTopics.body as Topic[];
                    onSuccess(newTopics);
                } catch (error) {
                    if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
                    else displaySnack('An error occurred while regenerating topics', { variant: 'error' });
                    onFailure();
                }
            },
            onError: (error) => {
                displaySnack(error.message, { variant: 'error' });
                onFailure();
            },
        });
    };

    return { regenerateTopics };
}
