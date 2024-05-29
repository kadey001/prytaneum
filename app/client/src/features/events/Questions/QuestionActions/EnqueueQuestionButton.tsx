import * as React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ConnectionHandler, graphql, useMutation } from 'react-relay';

import type { EnqueueQuestionButtonMutation } from '@local/__generated__/EnqueueQuestionButtonMutation.graphql';
import { useEvent } from '@local/features/events';
import { useSnack } from '@local/core';
import { useTopic } from '../../ModeratorView/useTopic';

export interface QueueButtonProps {
    questionId: string;
}

export const ENQUEUE_BUTTON_FRAGMENT = graphql`
    fragment EnqueueQuestionButtonFragment on EventQuestion {
        id
        position
    }
`;

export const ENQUEUE_BUTTON_MUTATION = graphql`
    mutation EnqueueQuestionButtonMutation($input: AddQuestionToTopicQueue!) {
        addQuestionToTopicQueue(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    position
                }
            }
        }
    }
`;

/**
 * Should only be used by moderators or when the user is a verified moderator
 */
export function EnqueueQuestionButton({ questionId }: QueueButtonProps) {
    const [commit] = useMutation<EnqueueQuestionButtonMutation>(ENQUEUE_BUTTON_MUTATION);
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
            onCompleted: ({ addQuestionToTopicQueue }) => {
                if (addQuestionToTopicQueue.isError) {
                    displaySnack(addQuestionToTopicQueue.message);
                }
            },
            updater: (store) => {
                // Remove the question from the current list
                const eventRecord = store.get(eventId);
                if (!eventRecord) return console.error('Event Record not found');
                const connection = ConnectionHandler.getConnectionID(
                    eventRecord.getDataID(),
                    'useQuestionsByTopicFragment_questionsByTopic'
                );
                // Need to do this workaround because the compiler in current version doesn't allow correctly naming the connection with _connection at the end.
                const connectionId = connection + `(topic:"${topic}")`;
                const connectionRecord = store.get(connectionId);
                if (!connectionRecord) return console.error('Update failed: Connection record not found!');
                ConnectionHandler.deleteNode(connectionRecord, questionId);

                // Add the question to the topic queue
                // But first ensure the question isn't already in the queue
                const question = store.get(questionId);
                if (question) return console.error('Update failed: Question already in queue!');
                const queueConnection = ConnectionHandler.getConnection(
                    eventRecord,
                    'useQuestionModQueueFragment_questionModQueue'
                );
                if (!queueConnection) return console.error('Update failed: No queue connection found!');
                const payload = store.getRootField('addQuestionToTopicQueue');
                if (!payload) return console.error('Update failed: No payload found!');
                const serverEdge = payload.getLinkedRecord('body');
                if (!serverEdge) return console.error('Update failed: No edge found!');
                ConnectionHandler.insertEdgeAfter(queueConnection, serverEdge);
            },
        });
    };
    return (
        <IconButton onClick={handleClick}>
            <Tooltip title='Enqueue Question' placement='bottom'>
                <AddCircleIcon sx={{ color: (theme) => theme.palette.primary.main }} fontSize='medium' />
            </Tooltip>
        </IconButton>
    );
}
