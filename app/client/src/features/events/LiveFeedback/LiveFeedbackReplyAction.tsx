import React from 'react';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { graphql, useFragment, useMutation } from 'react-relay';
import { Button, Card, CardContent, DialogContent, Typography } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { LiveFeedbackReplyFragment$key } from '@local/__generated__/LiveFeedbackReplyFragment.graphql';
import { LiveFeedbackReplyActionMutation } from '@local/__generated__/LiveFeedbackReplyActionMutation.graphql';

import { useEvent } from '../useEvent';
import { LiveFeedbackForm, LiveFeedbackFormProps } from './LiveFeedbackForm';
import { LiveFeedbackAuthor } from './LiveFeedbackAuthor';
import { LIVE_FEEDBACK_REPLY_FRAGMENT } from './LiveFeedbackReply';

const LIVE_FEEDBACK_REPLY_ACTION_MUTATION = graphql`
    mutation LiveFeedbackReplyActionMutation($input: CreateFeedback!, $eventId: ID!, $connections: [ID!]!) {
        createFeedback(input: $input) {
            isError
            message
            body @prependEdge(connections: $connections) {
                cursor
                node {
                    id
                    message
                    isDM
                    dmRecipientId
                    refFeedback {
                        ...LiveFeedbackReplyFragment @arguments(eventId: $eventId)
                    }
                    ...LiveFeedbackAuthorFragment @arguments(eventId: $eventId)
                }
            }
        }
    }
`;

interface Props {
    fragmentRef: LiveFeedbackReplyFragment$key;
    connections: string[];
}

export function LiveFeedbackReplyAction({ fragmentRef, connections }: Props) {
    const [isOpen, open, close] = useResponsiveDialog(false);
    const { eventId } = useEvent();

    const [commit] = useMutation<LiveFeedbackReplyActionMutation>(LIVE_FEEDBACK_REPLY_ACTION_MUTATION);
    const data = useFragment(LIVE_FEEDBACK_REPLY_FRAGMENT, fragmentRef);

    const handleSubmit: LiveFeedbackFormProps['onSubmit'] = (submittedForm) => {
        commit({
            variables: {
                input: {
                    ...submittedForm,
                    eventId,
                    isReply: true,
                    refFeedbackId: data.id,
                },
                eventId,
                connections,
            },
        });
    };

    const reply = React.useMemo(
        () => (
            <Card sx={{ width: '100%', marginBottom: (theme) => theme.spacing(3) }}>
                <LiveFeedbackAuthor fragmentRef={data} />
                <CardContent>
                    <Typography style={{ wordBreak: 'break-word' }}>{data.message}</Typography>
                </CardContent>
            </Card>
        ),
        [data]
    );

    return (
        <>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <LiveFeedbackForm onSubmit={handleSubmit} reply={reply} onCancel={close} />
                </DialogContent>
            </ResponsiveDialog>
            <Button color='inherit' onClick={open} startIcon={<ReplyIcon fontSize='small' />} fullWidth>
                Reply
            </Button>
        </>
    );
}
