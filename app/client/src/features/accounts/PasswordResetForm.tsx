import React from 'react';
import { Button, Grid, IconButton, InputAdornment, Typography, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form } from '@local/components/Form';
import { useForm, useSnack } from '@local/core';
import { graphql } from 'relay-runtime';
import { useMutation } from 'react-relay';
import { PasswordResetFormMutation } from '@local/__generated__/PasswordResetFormMutation.graphql';
import { LoadingButton } from '@local/components/LoadingButton';
import { FormContent } from '@local/components/FormContent';
import { useRouter } from 'next/router';

const initialState = {
    newPassword: '',
    confirmNewPassword: '',
};

export type TPasswordResetForm = typeof initialState;

const PASSWORD_RESET_FORM_MUTATION = graphql`
    mutation PasswordResetFormMutation($input: ResetPasswordForm!) {
        resetPassword(input: $input) {
            isError
            message
        }
    }
`;

interface Props {
    onSuccess: () => void;
    onFailure: () => void;
    token: string | string[] | undefined;
    tokenReady: boolean;
}

export function PasswordResetForm({ onSuccess, onFailure, token, tokenReady }: Props) {
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    const [tokenIsValid, setTokenIsValid] = React.useState<boolean>(false);
    const [validToken, setValidToken] = React.useState<string>('');
    const [form, errors, handleSubmit, handleChange] = useForm(initialState);
    const [commit, isLoading] = useMutation<PasswordResetFormMutation>(PASSWORD_RESET_FORM_MUTATION);

    const { displaySnack } = useSnack();
    const router = useRouter();

    React.useEffect(() => {
        if (!tokenReady) return;
        if (!token) {
            setValidToken('');
            setTokenIsValid(false);
            displaySnack('No Password Reset Token Provided', { variant: 'error' });
            router.push('/forgot-password');
        } else {
            setValidToken(token as string);
            setTokenIsValid(true);
        }
    }, [displaySnack, router, token, tokenReady]);

    function handleCommit(submittedForm: TPasswordResetForm) {
        commit({
            variables: { input: { ...submittedForm, token: validToken } },
            onCompleted({ resetPassword }) {
                if (resetPassword.isError) {
                    displaySnack(resetPassword.message, { variant: 'error' });
                    if (onFailure) onFailure();
                } else {
                    if (onSuccess) onSuccess();
                }
            },
        });
    }

    return (
        <Grid container justifyContent='center'>
            <Grid container item xs={12} direction='column' alignItems='center'>
                <Typography variant='h6'>Reset Password</Typography>
            </Grid>
            <Form onSubmit={handleSubmit(handleCommit)}>
                <FormContent>
                    <TextField
                        id='new-password'
                        required
                        error={Boolean(errors.newPassword)}
                        helperText={errors.newPassword}
                        type={isPassVisible ? 'text' : 'password'}
                        value={form.newPassword}
                        onChange={handleChange('newPassword')}
                        label='New Password'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setIsPassVisible(!isPassVisible)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge='end'
                                    >
                                        {isPassVisible ? (
                                            <VisibilityOff color={errors.newPassword ? 'error' : undefined} />
                                        ) : (
                                            <Visibility color={errors.newPassword ? 'error' : undefined} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id='confirm-new-password'
                        required
                        error={Boolean(errors.confirmNewPassword)}
                        helperText={errors.confirmNewPassword}
                        type={isPassVisible ? 'text' : 'password'}
                        value={form.confirmNewPassword}
                        onChange={handleChange('confirmNewPassword')}
                        label='Confirm New Password'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setIsPassVisible(!isPassVisible)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge='end'
                                    >
                                        {isPassVisible ? (
                                            <VisibilityOff color={errors.confirmNewPassword ? 'error' : undefined} />
                                        ) : (
                                            <Visibility color={errors.confirmNewPassword ? 'error' : undefined} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
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
                    <LoadingButton loading={isLoading}>
                        <Button fullWidth type='submit' variant='contained' color='secondary' disabled={!tokenIsValid}>
                            Submit
                        </Button>
                    </LoadingButton>
                </Grid>
            </Form>
        </Grid>
    );
}
