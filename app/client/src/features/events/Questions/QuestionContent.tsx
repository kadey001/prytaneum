import React from 'react';
import { graphql, useFragment } from 'react-relay';
import {
    CardContent,
    CardContentProps,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
    TypographyProps,
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import PublicIcon from '@mui/icons-material/Public';

import type { QuestionContentFragment$key } from '@local/__generated__/QuestionContentFragment.graphql';
import { useUser } from '@local/features/accounts';

export type QuestionContentProps = {
    fragmentRef: QuestionContentFragment$key;
    typographyProps?: TypographyProps;
    measure?: () => void;
} & CardContentProps;

export const QUESTION_CONTENT_FRAGMENT = graphql`
    fragment QuestionContentFragment on EventQuestion @argumentDefinitions(lang: { type: "String!" }) {
        question
        lang
        questionTranslated(lang: $lang)
    }
`;

export function QuestionContent({ fragmentRef, typographyProps = {}, measure, ...props }: QuestionContentProps) {
    const { user } = useUser();
    const questionContentData = useFragment(QUESTION_CONTENT_FRAGMENT, fragmentRef);

    const [showTranslated, setShowTranslated] = React.useState(false);

    const toggleShowTranslated = () => setShowTranslated((prev) => !prev);

    React.useEffect(() => {
        measure?.();
    }, [measure, showTranslated]);

    const preferredLang = React.useMemo(() => user?.preferredLang ?? 'EN', [user?.preferredLang]);

    const isTranslated = React.useMemo(
        () => showTranslated && questionContentData.lang !== preferredLang,
        [showTranslated, questionContentData.lang, preferredLang]
    );

    const isLanguagesMatch = React.useMemo(
        () => questionContentData.lang === preferredLang,
        [questionContentData.lang, preferredLang]
    );

    if (!questionContentData) return null;

    function translationButton() {
        // TODO: Fix so when participant asks question they get the translation button as well (if applicable)
        if (!questionContentData.questionTranslated) return null;
        if (isLanguagesMatch) return null;
        return (
            <IconButton onClick={toggleShowTranslated} sx={{ padding: 0 }}>
                <PublicIcon fontSize='small' />
                <Typography variant='caption' color='black'>
                    {isTranslated ? 'Hide Translation' : 'View Translation'}
                </Typography>
            </IconButton>
        );
    }

    return (
        <CardContent {...props} sx={{ margin: (theme) => theme.spacing(-2, 0, -1, 0) }}>
            <Typography variant='inherit' style={{ wordBreak: 'break-word' }} {...typographyProps}>
                {questionContentData.question}
            </Typography>
            {translationButton()}
            {isTranslated ? (
                <Paper elevation={2} sx={{ padding: '0.5rem' }}>
                    <Stack direction='row' alignItems='center'>
                        <Tooltip title='Translation'>
                            <TranslateIcon />
                        </Tooltip>
                        <Typography variant='inherit' style={{ wordBreak: 'break-word' }} {...typographyProps}>
                            : {questionContentData.questionTranslated}
                        </Typography>
                    </Stack>
                </Paper>
            ) : null}
        </CardContent>
    );
}
