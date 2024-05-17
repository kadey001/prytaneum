import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';

import { useSnack } from '@local/core';
import { useEvent } from '@local/features/events';
import { useFinalizeTopicsMutation } from '@local/__generated__/useFinalizeTopicsMutation.graphql';
import { Topic } from '../types';

const USE_FINALIZE_TOPICS = graphql`
    mutation useFinalizeTopicsMutation($eventId: String!, $topics: [String!]!, $descriptions: [String!]!) {
        finalizeTopics(eventId: $eventId, topics: $topics, descriptions: $descriptions) {
            body {
                topic
                description
            }
            isError
            message
        }
    }
`;

export function useFinalizeTopics() {
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const [commit] = useMutation<useFinalizeTopicsMutation>(USE_FINALIZE_TOPICS);

    const finalizeTopics = (topics: Topic[], onSuccess: () => void, onFailure?: () => void) => {
        const topicsList = topics.map((topic) => topic.topic);
        const descriptionsList = topics.map((topic) => topic.description);
        commit({
            variables: {
                eventId,
                topics: topicsList,
                descriptions: descriptionsList,
            },
            onCompleted: (response) => {
                try {
                    if (!response.finalizeTopics) throw new Error('An error occurred while finalizing topics');
                    if (response.finalizeTopics.isError) throw new Error(response.finalizeTopics.message);
                    if (response.finalizeTopics.body === null)
                        throw new Error('An error occurred while finalizing topics');
                    displaySnack('Topics finalized successfully', { variant: 'success' });
                    onSuccess();
                } catch (error) {
                    if (error instanceof Error) displaySnack(error.message, { variant: 'error' });
                    else displaySnack('An error occurred while finalizing topics', { variant: 'error' });
                    if (onFailure) onFailure();
                }
            },
            onError: (error) => {
                displaySnack(error.message, { variant: 'error' });
                if (onFailure) onFailure();
            },
        });
    };

    return { finalizeTopics };
}
