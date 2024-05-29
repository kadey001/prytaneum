import * as React from 'react';
import { ConnectionHandler, graphql, useMutation } from 'react-relay';
import { IconButton, Tooltip } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import type { DequeueQuestionButtonMutation } from '@local/__generated__/DequeueQuestionButtonMutation.graphql';
import { useEvent } from '@local/features/events';
import { useSnack } from '@local/core';
import { useTopic } from '../../ModeratorView/useTopic';

export interface QueueButtonProps {
    questionId: string;
}
export const DEQUEUE_BUTTON_MUTATION = graphql`
    mutation DequeueQuestionButtonMutation($input: RemoveQuestionFromTopicQueue!) {
        removeQuestionFromTopicQueue(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    position
                    topics {
                        position
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
    const { topic } = useTopic();
    const { displaySnack } = useSnack();
    const handleClick = () => {
        commit({
            variables: {
                input: {
                    questionId,
                    eventId,
                    topic,
                },
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

                // Add edge back to the question list by topic
                const questionsByTopicConnection = ConnectionHandler.getConnectionID(
                    eventRecord.getDataID(),
                    'useQuestionsByTopicFragment_questions'
                );
                const questionsByTopicConnectionId = questionsByTopicConnection + `(topic:"${topic}")`;
                const questionsByTopicConnectionRecord = store.get(questionsByTopicConnectionId);
                if (!questionsByTopicConnectionRecord)
                    return console.error(`Update failed: Connection record ${questionsByTopicConnectionId} not found!`);
                questionsByTopicConnectionRecord.invalidateRecord();
                const payload = store.getRootField('removeQuestionFromTopicQueue');
                if (!payload) return console.error('Update failed: No payload found!');
                const serverEdge = payload.getLinkedRecord('body');
                if (!serverEdge) return console.error('Update failed: No edge found!');
                ConnectionHandler.insertEdgeAfter(questionsByTopicConnectionRecord, serverEdge);
            },
        });
    };
    return (
        <IconButton onClick={handleClick}>
            <Tooltip title='Dequeue Question' placement='bottom'>
                <RemoveCircleIcon color='warning' fontSize='medium' />
            </Tooltip>
        </IconButton>
    );
}
