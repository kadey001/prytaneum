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
                topics {
                    topic
                    description
                    locked
                }
                issue
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

    const regenerateTopics = (onSuccess: (newTopics: Topic[], issue: string) => void, onFailure: () => void) => {
        commit({
            variables: { eventId },
            onCompleted: (response) => {
                try {
                    if (!response.regenerateEventTopics) throw new Error('An error occurred while regenerating topics');
                    if (response.regenerateEventTopics.isError) throw new Error(response.regenerateEventTopics.message);
                    if (!response.regenerateEventTopics.body) throw new Error('No response body was returned');
                    if (
                        !response.regenerateEventTopics.body.topics ||
                        response.regenerateEventTopics.body.topics.length === 0
                    )
                        throw new Error('No topics were returned');
                    displaySnack('Topics regenerated successfully', { variant: 'success' });
                    const newTopics = response.regenerateEventTopics.body.topics as Topic[];
                    const issue = response.regenerateEventTopics.body.issue;
                    onSuccess(newTopics, issue);
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
