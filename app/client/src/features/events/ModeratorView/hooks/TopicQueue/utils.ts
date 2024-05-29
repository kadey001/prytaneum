import { Question } from '../../types';

// Gets the position of the question relative to what toic queue it is in
// Otherwise, just use the question's position as it should be in the default queue
const getTopicListPosition = (question: Question, currentTopic: string) => {
    const topicPosition = question?.topics?.find((t) => t.topic === currentTopic)?.position;
    if (!topicPosition) return parseInt(question.position);
    return parseInt(topicPosition);
};

export interface CalculateUpdatedTopicQueuePositionProps {
    list: Question[];
    destinationIdx: number;
    currentQuestionPosition: number;
    currentTopic: string;
}

// Calculate the new position of the question in the topic queue when it is re-ordered
export const calculateUpdatedTopicQueuePosition = ({
    list,
    destinationIdx,
    currentQuestionPosition,
    currentTopic,
}: CalculateUpdatedTopicQueuePositionProps) => {
    // Since we are re-ordering, we can assume there are at least 2 questions to work with.
    // First handle if being moved to the top of the list
    if (destinationIdx === 0) {
        // Should be a question after this, but need to check if a current question exists first
        const nextQuestion = list[1];
        const nextQuestionTopicPosition = getTopicListPosition(nextQuestion, currentTopic);
        if (currentQuestionPosition === -1) {
            return nextQuestionTopicPosition - 1000;
        } else {
            // Can use both positions to calculate new position in between
            const diff = Math.abs(nextQuestionTopicPosition - currentQuestionPosition);
            const halfDiff = Math.round(diff / 2);
            return currentQuestionPosition + halfDiff;
        }
    }

    // Handle if being moved to the bottom of the list
    if (destinationIdx === list.length - 1) {
        // Should be a question before this, can use that to calculate new position
        const prevQuestion = list[list.length - 2];
        const prevQuestionTopicPosition = getTopicListPosition(prevQuestion, currentTopic);
        return prevQuestionTopicPosition + 1000;
    }

    // Handle if being moved to the middle of the list
    const nextQuestion = list[destinationIdx + 1];
    const prevQuestion = list[destinationIdx - 1];

    const nextQuestionTopicPosition = getTopicListPosition(nextQuestion, currentTopic);
    const prevQuestionTopicPosition = getTopicListPosition(prevQuestion, currentTopic);

    const diff = Math.abs(nextQuestionTopicPosition - prevQuestionTopicPosition);
    const halfDiff = Math.round(diff / 2);
    return prevQuestionTopicPosition + halfDiff;
};
