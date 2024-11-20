import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import { useLiveFeedbackPromptedSubscription } from '@local/__generated__/useLiveFeedbackPromptedSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

export const USE_LIVE_FEEDBACK_PROMPTED_SUBSCRIPTION = graphql`
    subscription useLiveFeedbackPromptedSubscription($eventId: ID!, $connections: [ID!]!) {
        feedbackPrompted(eventId: $eventId) {
            node @appendNode(connections: $connections, edgeTypeName: "EventLiveFeedbackPromptEdge") {
                id
                prompt
                isVote
                isDraft
                isOpenEnded
                isMultipleChoice
                multipleChoiceOptions
            }
        }
    }
`;

interface Props {
    connections: string[];
}

export function useLiveFeedbackPrompted({ connections }: Props) {
    const { eventId } = useEvent();

    const config = React.useMemo<GraphQLSubscriptionConfig<useLiveFeedbackPromptedSubscription>>(
        () => ({
            variables: {
                eventId: eventId,
                connections,
            },
            subscription: USE_LIVE_FEEDBACK_PROMPTED_SUBSCRIPTION,
        }),
        [connections, eventId]
    );

    useSubscription<useLiveFeedbackPromptedSubscription>(config);
}
