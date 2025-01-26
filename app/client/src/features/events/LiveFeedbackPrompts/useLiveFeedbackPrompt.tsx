import * as React from 'react';
import { graphql, useSubscription } from 'react-relay';
import { useLiveFeedbackPromptSubscription } from '@local/__generated__/useLiveFeedbackPromptSubscription.graphql';
import { useEvent } from '@local/features/events/useEvent';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useLiveFeedbackPromptResponseSnack } from './LiveFeedbackPromptResponse/useLiveFeedbackPromptResponseSnack';

export const USE_LIVE_FEEDBACK_PROMPT_SUBSCRIPTION = graphql`
    subscription useLiveFeedbackPromptSubscription($eventId: ID!) {
        feedbackPrompted(eventId: $eventId) {
            node {
                id
                prompt
                isVote
                isDraft
                reasoningType
                isOpenEnded
                isMultipleChoice
                multipleChoiceOptions
            }
        }
    }
`;

export interface Prompt {
    id: string;
    prompt: string;
    isVote: boolean;
    isOpenEnded: boolean;
    isMultipleChoice: boolean;
    multipleChoiceOptions: string[];
    reasoningType: string;
}

interface Props {
    openFeedbackPromptResponse: () => void;
}

export function useLiveFeedbackPrompt({ openFeedbackPromptResponse }: Props) {
    const { eventId } = useEvent();
    const enqueuedPrompts: Array<Prompt> = React.useMemo(() => [], []);

    const removePrompt = React.useCallback(
        (promptId: string) => {
            const promptIndex = enqueuedPrompts.findIndex((_prompt) => _prompt.id === promptId);
            if (promptIndex === -1) return console.error(`Prompt with id ${promptId} not found`);
            enqueuedPrompts.splice(promptIndex, 1);
        },
        [enqueuedPrompts]
    );

    const promptRef = React.useRef<Prompt>({
        id: '',
        prompt: '',
        isVote: false,
        isOpenEnded: false,
        isMultipleChoice: false,
        multipleChoiceOptions: [],
        reasoningType: 'optional',
    });

    const openPrompt = React.useCallback(
        (promptId: string) => {
            const promptIndex = enqueuedPrompts.findIndex((_prompt) => _prompt.id === promptId);
            if (promptIndex === -1) return console.error(`Prompt with id ${promptId} not found`);
            const prompt = enqueuedPrompts[promptIndex];
            if (!prompt) return console.error(`Prompt with id ${promptId} not found`);
            promptRef.current = {
                ...promptRef.current,
                id: prompt.id,
                prompt: prompt.prompt,
                isVote: prompt.isVote,
                isOpenEnded: prompt.isOpenEnded,
                isMultipleChoice: prompt.isMultipleChoice,
                multipleChoiceOptions: prompt.multipleChoiceOptions,
                reasoningType: prompt.reasoningType,
            };
            openFeedbackPromptResponse();
            // Remove prompt from enqueuedPrompts
            enqueuedPrompts.splice(promptIndex, 1);
        },
        [enqueuedPrompts, openFeedbackPromptResponse]
    );

    const { displaySnack } = useLiveFeedbackPromptResponseSnack({ openPrompt, removePrompt });

    const config = React.useMemo<GraphQLSubscriptionConfig<useLiveFeedbackPromptSubscription>>(
        () => ({
            variables: {
                eventId: eventId,
            },
            subscription: USE_LIVE_FEEDBACK_PROMPT_SUBSCRIPTION,
            onNext: (data) => {
                if (!data) return;
                const { node: feedbackPrompted } = data.feedbackPrompted;
                const {
                    id: promptId,
                    prompt,
                    isVote,
                    isOpenEnded,
                    isMultipleChoice,
                    multipleChoiceOptions,
                    reasoningType,
                } = feedbackPrompted;
                // Check if prompt is already enqueued to avoid duplicates
                if (enqueuedPrompts.some((_prompt) => _prompt.id === promptId)) return;
                enqueuedPrompts.push({
                    id: promptId,
                    prompt,
                    isVote: !!isVote,
                    isOpenEnded: !!isOpenEnded,
                    isMultipleChoice: !!isMultipleChoice,
                    multipleChoiceOptions: multipleChoiceOptions === null ? [] : [...multipleChoiceOptions],
                    reasoningType: reasoningType || 'optional',
                });

                displaySnack(promptId, 'New Feedback Prompt', { variant: 'info' });
            },
        }),
        [displaySnack, enqueuedPrompts, eventId]
    );

    useSubscription<useLiveFeedbackPromptSubscription>(config);
    return { feedbackPromptRef: promptRef };
}
