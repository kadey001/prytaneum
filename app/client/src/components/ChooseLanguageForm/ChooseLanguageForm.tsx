import React from 'react';
import { useMutation, graphql } from 'react-relay';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';

import { useSnack } from '@local/core';
import { ChooseLanguageFormMutation } from '@local/__generated__/ChooseLanguageFormMutation.graphql';

const SUPPORTED_LANGUAGES = [
    { code: 'EN', text: 'English' },
    { code: 'ES', text: 'Spanish' },
] as const;

type TLanguages = 'EN' | 'ES';

export const CHOOSE_LANGUAGE_FORM_MUTATION = graphql`
    mutation ChooseLanguageFormMutation($language: String!) {
        updatePreferedLanguage(language: $language) {
            isError
            message
            body {
                id
                preferredLang
            }
        }
    }
`;

interface Props {
    preferredLang?: string | null;
    onSuccess?: () => void;
}

export function ChooseLangaugeForm({ preferredLang, onSuccess }: Props) {
    const { displaySnack } = useSnack();
    const [selectedLanguage, setSelectedLanguage] = React.useState<TLanguages>(
        preferredLang ? (preferredLang as TLanguages) : 'EN'
    );
    const [commit, isLoading] = useMutation<ChooseLanguageFormMutation>(CHOOSE_LANGUAGE_FORM_MUTATION);

    const handleChange = (event: any) => {
        setSelectedLanguage(event.target.value as TLanguages);
    };

    const handleSubmit = () => {
        commit({
            variables: {
                language: selectedLanguage,
            },
            onCompleted: (response) => {
                const { message, isError } = response.updatePreferedLanguage;
                if (isError) return displaySnack(message, { variant: 'error' });
                displaySnack('Language Updated', { variant: 'success' });
                onSuccess?.();
            },
        });
    };

    return (
        <Stack spacing={2}>
            <Typography variant='h6'>Choose Language</Typography>
            <FormControl fullWidth>
                <InputLabel id='language-select-label'>Language</InputLabel>
                <Select
                    labelId='language-select-label'
                    id='language-select'
                    value={selectedLanguage}
                    label='Selected Language'
                    onChange={handleChange}
                >
                    {SUPPORTED_LANGUAGES.map(({ code, text }) => (
                        <MenuItem key={code} value={code}>
                            {text}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant='contained' disabled={isLoading} onClick={handleSubmit}>
                Update Prefered Language
            </Button>
        </Stack>
    );
}
