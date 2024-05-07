import React from 'react';
import { graphql, useFragment } from 'react-relay';
import { Card, CardContent, Typography } from '@mui/material';

import { LiveFeedbackReplyFragment$key } from '@local/__generated__/LiveFeedbackReplyFragment.graphql';
import { LiveFeedbackAuthor } from './LiveFeedbackAuthor';

export const LIVE_FEEDBACK_REPLY_FRAGMENT = graphql`
    fragment LiveFeedbackReplyFragment on EventLiveFeedback @argumentDefinitions(eventId: { type: "ID!" }) {
        id
        message
        ...LiveFeedbackAuthorFragment @arguments(eventId: $eventId)
    }
`;

export interface Props {
    fragmentRef: LiveFeedbackReplyFragment$key;
}

export function LiveFeedbackReply({ fragmentRef }: Props) {
    const data = useFragment(LIVE_FEEDBACK_REPLY_FRAGMENT, fragmentRef);

    return (
        <Card
            sx={{
                margin: (theme) => theme.spacing(0, 2, 2, 2),
                border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
            elevation={0}
        >
            <LiveFeedbackAuthor fragmentRef={data} />
            <CardContent sx={{ margin: (theme) => theme.spacing(-2, 0, 0, 0) }}>
                <Typography variant='inherit' style={{ wordBreak: 'break-word' }}>
                    {data.message}
                </Typography>
            </CardContent>
        </Card>
    );
}
