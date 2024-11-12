import React from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { Form } from '@local/components/Form';
import { useForm, useSnack } from '@local/core';
import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';
import { PasswordResetRequestFormMutation } from '@local/__generated__/PasswordResetRequestFormMutation.graphql';
import { LoadingButton } from '@local/components/LoadingButton';
import { FormContent } from '@local/components/FormContent';

const initialState = {
    email: '',
};

export type TPasswordResetRequestForm = typeof initialState;

const PASSWORD_RESET_REQUEST_FORM_MUTATION = graphql`
    mutation PasswordResetRequestFormMutation($input: ResetPasswordRequestForm!) {
        resetPasswordRequest(input: $input) {
            isError
            message
            body
        }
    }
`;

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
}

export function PasswordResetRequestForm({ onSuccess, onFailure }: Props) {
    const [form, errors, handleSubmit, handleChange] = useForm(initialState);
    const [commit, isLoading] = useMutation<PasswordResetRequestFormMutation>(PASSWORD_RESET_REQUEST_FORM_MUTATION);
    const { displaySnack } = useSnack();

    function handleCommit(submittedForm: TPasswordResetRequestForm) {
        commit({
            variables: { input: submittedForm },
            onCompleted({ resetPasswordRequest }) {
                if (resetPasswordRequest.isError) {
                    displaySnack(resetPasswordRequest.message, { variant: 'error' });
                    if (onFailure) onFailure();
                } else {
                    displaySnack('Success! Please check your email for the password reset link.', {
                        variant: 'success',
                    });
                    if (onSuccess) onSuccess();
                }
            },
        });
    }

    return (
        <Grid container justifyContent='center'>
            <Grid container item xs={12} direction='column' alignItems='center'>
                <Typography component='h1' variant='h6'>
                    Reset Password Request
                </Typography>
            </Grid>
            <Form onSubmit={handleSubmit(handleCommit)}>
                <FormContent>
                    <TextField
                        aria-label='Enter your email'
                        id='password-reset-request-email'
                        helperText={errors.email}
                        required
                        value={form.email}
                        onChange={handleChange('email')}
                        label='Email'
                        autoFocus
                        error={Boolean(errors.email)}
                        spellCheck={false}
                    />
                </FormContent>
                <Grid
                    container
                    item
                    direction='column'
                    sx={{
                        '& > *': {
                            margin: (theme) => theme.spacing(1, 0),
                        },
                    }}
                >
                    <LoadingButton loading={isLoading} fullWidth type='submit' variant='contained' color='secondary'>
                        Submit
                    </LoadingButton>
                </Grid>
            </Form>
        </Grid>
    );
}
