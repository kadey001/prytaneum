import React from 'react';
import { useMutation, graphql } from 'react-relay';
import {
    Button,
    DialogContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    Stack,
    Typography,
} from '@mui/material';

import { useSnack, TLanguages, SUPPORTED_LANGUAGES } from '@local/core';
import { ChooseLanguageDialogMutation } from '@local/__generated__/ChooseLanguageDialogMutation.graphql';
import { ResponsiveDialog } from '../ResponsiveDialog';
import { TransitionProps } from 'react-transition-group/Transition';

export const CHOOSE_LANGUAGE_DIALOG_MUTATION = graphql`
    mutation ChooseLanguageDialogMutation($language: String!) {
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
    onSuccess: () => void;
    isOpen: boolean;
    close: () => void;
}

export function ChooseLangaugeDialog({ preferredLang, onSuccess, isOpen, close }: Props) {
    const { displaySnack } = useSnack();
    const [selectedLanguage, setSelectedLanguage] = React.useState<TLanguages>(
        preferredLang ? (preferredLang as TLanguages) : 'EN'
    );
    const [commit, isLoading] = useMutation<ChooseLanguageDialogMutation>(CHOOSE_LANGUAGE_DIALOG_MUTATION);

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
                close();
                onSuccess();
            },
        });
    };

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<any, any>;
        },
        ref: React.Ref<unknown>
    ) {
        return <Slide direction='down' ref={ref} {...props} />;
    });

    if (!isOpen) return null;

    return (
        <ResponsiveDialog
            open={isOpen}
            onClose={close}
            TransitionComponent={Transition}
            sx={{
                '& .MuiDialog-container': {
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                },
                backdropFilter: 'blur(2px)',
                color: 'transparent',
            }}
        >
            <DialogContent>
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
                            {SUPPORTED_LANGUAGES.map(({ code, text, country }) => (
                                <MenuItem key={code} value={code}>
                                    <img
                                        loading='lazy'
                                        width='20'
                                        srcSet={`https://flagcdn.com/w40/${country.toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${country.toLowerCase()}.png`}
                                        alt=''
                                        style={{ marginRight: '0.25rem' }}
                                    />{' '}
                                    {text}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant='contained' disabled={isLoading} onClick={handleSubmit}>
                        Update Prefered Language
                    </Button>
                </Stack>
            </DialogContent>
        </ResponsiveDialog>
    );
}
