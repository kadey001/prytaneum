import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import { useEvent } from '@local/features/events/useEvent';
import { useLiveFeedbackPromptResultsSnack } from './useLiveFeedbackPromptResultsSnack';
import { useLiveFeedbackPromptResultsSharedSubscription } from '@local/__generated__/useLiveFeedbackPromptResultsSharedSubscription.graphql';

export const USE_LIVE_FEEDBACK_PROMPT_RESULTS_SHARED_SUBSCRIPTION = graphql`
    subscription useLiveFeedbackPromptResultsSharedSubscription($eventId: ID!) {
        feedbackPromptResultsShared(eventId: $eventId) {
            id
            prompt
        }
    }
`;

export interface Prompt {
    id: string;
    prompt: string;
}

interface Props {
    openFeedbackPromptResults: () => void;
}

export function useLiveFeedbackPromptResultsShared({ openFeedbackPromptResults }: Props) {
    const { isModerator, eventId } = useEvent();
    const enqueuedPromptResults: Array<Prompt> = React.useMemo(() => [], []);

    const promptRef = React.useRef<Prompt>({ id: '', prompt: '' });

    const openPromptResults = React.useCallback(
        (promptId: string) => {
            const promptResultIndex = enqueuedPromptResults.findIndex((_prompt) => _prompt.id === promptId);
            if (promptResultIndex === -1) return console.error(`Prompt with id ${promptId} not found`);
            const promptResult = enqueuedPromptResults[promptResultIndex];
            if (!promptResult) return console.error(`Prompt with id ${promptId} not found`);
            promptRef.current = { ...promptRef.current, id: promptResult.id, prompt: promptResult.prompt };
            openFeedbackPromptResults();
            enqueuedPromptResults.splice(promptResultIndex, 1);
        },
        [enqueuedPromptResults, openFeedbackPromptResults]
    );
    const updateCurrentPrompt = ({ id, prompt }: Prompt) => {
        promptRef.current = { ...promptRef.current, id: id, prompt: prompt };
    };
    const { displaySnack } = useLiveFeedbackPromptResultsSnack({ openPromptResults });

    const config = React.useMemo<GraphQLSubscriptionConfig<useLiveFeedbackPromptResultsSharedSubscription>>(
        () => ({
            variables: {
                eventId: eventId,
            },
            subscription: USE_LIVE_FEEDBACK_PROMPT_RESULTS_SHARED_SUBSCRIPTION,
            onNext: (data) => {
                if (!data) return;
                const { feedbackPromptResultsShared } = data;
                updateCurrentPrompt(feedbackPromptResultsShared);
                if (isModerator) console.log('Moderator received prompt');

                const promptId = feedbackPromptResultsShared.id;
                displaySnack(promptId, 'Feedback Prompt Results', { variant: 'info' });
            },
        }),
        [displaySnack, eventId, isModerator]
    );

    useSubscription<useLiveFeedbackPromptResultsSharedSubscription>(config);
    return { feedbackPromptResultsRef: promptRef };
}
