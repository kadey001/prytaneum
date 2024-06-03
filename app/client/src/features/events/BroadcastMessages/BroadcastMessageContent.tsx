import React from 'react';
import { graphql, useFragment } from 'react-relay';
import {
    CardContent,
    CardContentProps,
    IconButton,
    Paper,
    Skeleton,
    Stack,
    Tooltip,
    Typography,
    TypographyProps,
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';

import type { BroadcastMessageContentFragment$key } from '@local/__generated__/BroadcastMessageContentFragment.graphql';
import { useUser } from '@local/features/accounts';
export type BroadcastMessageContentProps = {
    fragmentRef: BroadcastMessageContentFragment$key;
    typographyProps?: TypographyProps;
} & CardContentProps;

export const BROADCAST_MESSAGE_CONTENT_FRAGMENT = graphql`
    fragment BroadcastMessageContentFragment on EventBroadcastMessage
    @argumentDefinitions(lang: { type: "String", defaultValue: "EN" }) {
        broadcastMessage
        lang
        translatedBroadcastMessage(lang: $lang)
    }
`;

export function BroadcastMessageContent({ fragmentRef, typographyProps = {}, ...props }: BroadcastMessageContentProps) {
    const { user } = useUser();
    const { lang, broadcastMessage, translatedBroadcastMessage } = useFragment(
        BROADCAST_MESSAGE_CONTENT_FRAGMENT,
        fragmentRef
    );
    const [showOriginalLanguage, setShowOriginalLanguage] = React.useState(false);
    const toggleShowTranslated = React.useCallback(() => {
        setShowOriginalLanguage((prev) => !prev);
    }, []);

    const preferredLang = React.useMemo(() => user?.preferredLang ?? 'EN', [user?.preferredLang]);
    const isBroadcastMessageTranslated = React.useMemo(
        () => lang !== preferredLang && translatedBroadcastMessage !== broadcastMessage,
        [lang, translatedBroadcastMessage, broadcastMessage, preferredLang]
    );

    function translationButton() {
        if (!translatedBroadcastMessage) return null;
        if (!isBroadcastMessageTranslated) return null;
        return (
            <IconButton onClick={toggleShowTranslated} sx={{ padding: 0 }}>
                <Tooltip title='Translated Question'>
                    <TranslateIcon fontSize='small' />
                </Tooltip>
                <Typography variant='caption' color='black'>
                    {!showOriginalLanguage ? 'View Original' : 'Hide Original'}
                </Typography>
            </IconButton>
        );
    }

    return (
        <CardContent {...props} sx={{ margin: (theme) => theme.spacing(-2, 0, -1, 0) }}>
            <Typography variant='inherit' style={{ wordBreak: 'break-word' }} {...typographyProps}>
                {translatedBroadcastMessage || broadcastMessage || <Skeleton />}
            </Typography>
            {translationButton()}
            {showOriginalLanguage ? (
                <Paper elevation={2} sx={{ padding: '0.5rem' }}>
                    <Stack direction='row' alignItems='center'>
                        <Typography variant='inherit' style={{ wordBreak: 'break-word' }} {...typographyProps}>
                            {broadcastMessage}
                        </Typography>
                    </Stack>
                </Paper>
            ) : null}
        </CardContent>
    );
}
