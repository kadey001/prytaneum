import { useMemo } from 'react';
import { graphql, useFragment } from 'react-relay';
import { Avatar, Typography, CardHeader, CardHeaderProps, Stack, Tooltip } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import type { BroadcastMessageAuthorFragment$key } from '@local/__generated__/BroadcastMessageAuthorFragment.graphql';
import { formatDate } from '@local/utils/format';
import { getHashedColor } from '@local/core/getHashedColor';

export const BROADCAST_MESSAGE_AUTHOR_FRAGMENT = graphql`
    fragment BroadcastMessageAuthorFragment on EventBroadcastMessage {
        createdBy {
            id
            firstName
            lastName
            avatar
        }
        createdAt
    }
`;

export type BroadcastMessageProps = {
    fragmentRef: BroadcastMessageAuthorFragment$key;
} & CardHeaderProps;

/**
 * Simple wrapper to CardHeader material ui component
 */
export function BroadcastMessageAuthor({ fragmentRef, ...props }: BroadcastMessageProps) {
    const authorData = useFragment(BROADCAST_MESSAGE_AUTHOR_FRAGMENT, fragmentRef);
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
            // get first letter of name to display
            avatar={<Avatar sx={{ bgcolor: avatarColor }}>{authorName[0]}</Avatar>}
            title={
                <Stack direction='row' alignItems='center' spacing={0.5}>
                    <Tooltip title='Verified Moderator' placement='top'>
                        <VerifiedUserIcon fontSize='small' sx={{ color: (theme) => theme.palette.primary.main }} />
                    </Tooltip>
                    <Typography>{authorName}</Typography>
                </Stack>
            }
            subheader={subheader}
            {...props}
        />
    );
}
