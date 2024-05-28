import React, { useMemo } from 'react';
import { Avatar, Typography, CardHeader, CardHeaderProps, Stack, Tooltip } from '@mui/material';
import { graphql, useFragment } from 'react-relay';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import type { LiveFeedbackAuthorFragment$key } from '@local/__generated__/LiveFeedbackAuthorFragment.graphql';
import { formatDate } from '@local/utils/format';
import { getHashedColor } from '../../../core/getHashedColor';

export type LiveFeedbackAuthorProps = {
    fragmentRef: LiveFeedbackAuthorFragment$key;
} & CardHeaderProps;

export const LIVE_FEEDBACK_AUTHOR_FRAGMENT = graphql`
    fragment LiveFeedbackAuthorFragment on EventLiveFeedback @argumentDefinitions(eventId: { type: "ID!" }) {
        createdBy {
            id
            firstName
            lastName
            avatar
            moderatorOf(eventId: $eventId)
        }
        createdAt
    }
`;

/**
 * Simple wrapper to CardHeader material ui component
 */
export function LiveFeedbackAuthor({ fragmentRef, ...props }: LiveFeedbackAuthorProps) {
    const authorData = useFragment(LIVE_FEEDBACK_AUTHOR_FRAGMENT, fragmentRef);
    const isModerator = authorData.createdBy?.moderatorOf === true;
    const [time, month] = useMemo(() => {
        if (authorData.createdAt) return formatDate(authorData.createdAt, 'p-P').split('-');
        return ['', ''];
    }, [authorData]);
    const subheader = useMemo(
        () => (
            <Typography variant='caption' color='textSecondary'>
                {time}
                &nbsp; &middot; &nbsp;
                {month}
            </Typography>
        ),
        [time, month]
    );
    // make author name given available data
    const authorName = useMemo(() => {
        let _authorName = 'Unknown User';
        if (authorData.createdBy && authorData.createdBy.firstName) {
            _authorName = authorData.createdBy.firstName;
            if (authorData.createdBy.lastName) _authorName = `${_authorName} ${authorData.createdBy.lastName}`;
        }
        return _authorName;
    }, [authorData.createdBy]);
    const avatarColor = useMemo(() => {
        return getHashedColor(authorName);
    }, [authorName]);

    return (
        <CardHeader
            // get first letter of name to use as avatar
            avatar={<Avatar sx={{ bgcolor: avatarColor }}>{authorName[0]}</Avatar>}
            title={
                <Stack direction='row' alignItems='center' spacing={0.5}>
                    {isModerator && (
                        <Tooltip title='Verified Moderator' placement='top'>
                            <VerifiedUserIcon fontSize='small' sx={{ color: (theme) => theme.palette.primary.main }} />
                        </Tooltip>
                    )}
                    <Typography>{authorName}</Typography>
                </Stack>
            }
            subheader={subheader}
            {...props}
        />
    );
}
