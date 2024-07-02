import * as React from 'react';
import { ConnectionHandler, graphql, useMutation } from 'react-relay';
import { IconButton, Tooltip } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import type { DequeueQuestionButtonMutation } from '@local/__generated__/DequeueQuestionButtonMutation.graphql';
import { useEvent } from '@local/features/events';
import { useSnack } from '@local/core';
import { useTopic } from '../../ModeratorView/useTopic';
import { useUser } from '@local/features/accounts';

export interface QueueButtonProps {
    questionId: string;
}
export const DEQUEUE_BUTTON_MUTATION = graphql`
    mutation DequeueQuestionButtonMutation($input: RemoveQuestionFromTopicQueue!, $lang: String!) {
        removeQuestionFromTopicQueue(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    question
                    lang
                    position
                    onDeckPosition
                    topics {
                        topic
                        description
                        position
                    }
                    createdBy {
                        id
                        firstName
                        lastName
                        avatar
                    }
                    createdAt
                    likedByCount
                    isLikedByViewer
                    ...QuestionActionsFragment @arguments(lang: $lang)
                    ...QuestionAuthorFragment
                    ...QuestionStatsFragment
                    ...QuestionContentFragment @arguments(lang: $lang)
                    ...QuestionTopicsFragment
                    refQuestion {
                        ...QuestionQuoteFragment @arguments(lang: $lang)
                    }
                }
            }
        }
    }
`;

/**
 * Should only be used by moderators or when the user is a verified moderator
 */
export function DequeueQuestionButton({ questionId }: QueueButtonProps) {
    // const data = useFragment(QUESTION_CAROUSEL_FRAGMENT, fragmentRef);
    const [commit] = useMutation<DequeueQuestionButtonMutation>(DEQUEUE_BUTTON_MUTATION);
    const { eventId } = useEvent();
    const { user } = useUser();
    const { topic } = useTopic();
    const { displaySnack } = useSnack();

    const handleClick = React.useCallback(() => {
        commit({
            variables: {
                input: {
                    questionId,
                    eventId,
                    topic,
                },
                lang: user?.preferredLang ?? 'EN',
            },
            onCompleted: ({ removeQuestionFromTopicQueue }) => {
                if (removeQuestionFromTopicQueue.isError) {
                    displaySnack(removeQuestionFromTopicQueue.message, { variant: 'error' });
                }
            },
            updater: (store) => {
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Event Record not found');
                const queueConnectionId = ConnectionHandler.getConnectionID(
                    eventRecord.getDataID(),
                    'useQuestionModQueueFragment_questionModQueue'
                );
                const queueConnectionRecord = store.get(queueConnectionId);
                if (!queueConnectionRecord) return console.error('Update failed: Connection record not found!');
                ConnectionHandler.deleteNode(queueConnectionRecord, questionId);

                // Get the connection for the question list by topic
                const questionsByTopicConnection = ConnectionHandler.getConnectionID(
                    eventRecord.getDataID(),
                    'useQuestionsByTopicFragment_questionsByTopic'
                );
                if (!questionsByTopicConnection) return console.error('Update failed: Connection not found!');
                // Get the payload from the mutation
                const payload = store.getRootField('removeQuestionFromTopicQueue');
                if (!payload) return console.error('Update failed: No payload found!');
                const serverEdge = payload.getLinkedRecord('body');
                if (!serverEdge) return console.error('Update failed: No edge found!');

                // Always add edge back to the default queue
                const connectionId = questionsByTopicConnection + '(topic:"default")';
                const connectionRecord = store.get(connectionId);
                if (!connectionRecord) return console.error('Update failed: Connection record not found!');
                ConnectionHandler.insertEdgeAfter(connectionRecord, serverEdge);

                // Add the question to the topic queues
                const questionsByTopicConnectionId = questionsByTopicConnection + `(topic:"${topic}")`;
                const questionsByTopicConnectionRecord = store.get(questionsByTopicConnectionId);
                if (!questionsByTopicConnectionRecord)
                    return console.error(`Update failed: Connection record ${questionsByTopicConnectionId} not found!`);
                ConnectionHandler.insertEdgeAfter(questionsByTopicConnectionRecord, serverEdge);
            },
        });
    }, [commit, displaySnack, eventId, questionId, topic, user]);

    return (
        <IconButton onClick={handleClick}>
            <Tooltip title='Dequeue Question' placement='bottom'>
                <RemoveCircleIcon color='warning' fontSize='medium' />
            </Tooltip>
        </IconButton>
    );
}
