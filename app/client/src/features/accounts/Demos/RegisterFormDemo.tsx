/* eslint-disable react/jsx-curly-newline */
import * as React from 'react';
import { IconButton, InputAdornment, Grid, Typography, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { LoadingButton } from '@local/components/LoadingButton';
import { useForm } from '@local/core';

const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
};

export type TRegisterForm = typeof initialState;

export function RegisterFormDemo() {
    // form state hooks
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    const [form, errors, , handleChange] = useForm(initialState);

    return (
        <Grid container justifyContent='center'>
            <Grid container item xs={12} direction='column' alignItems='center'>
                <Typography component='h1' variant='h6'>
                    Create New Account
                </Typography>
            </Grid>
            <Form onSubmit={() => {}}>
                <FormContent>
                    <TextField
                        id='register-first-name'
                        helperText={errors.firstName}
                        required
                        value={form.firstName}
                        onChange={handleChange('firstName')}
                        label='First Name'
                        error={Boolean(errors.firstName)}
                    />
                    <TextField
                        id='register-last-name'
                        helperText={errors.lastName}
                        required
                        value={form.lastName}
                        onChange={handleChange('lastName')}
                        label='Last Name'
                        error={Boolean(errors.lastName)}
                    />
                    <TextField
                        id='register-email'
                        helperText={errors.email || 'We will never share your email'}
                        required
                        type='email'
                        value={form.email}
                        onChange={handleChange('email')}
                        label='Email'
                        error={Boolean(errors.email)}
                    />
                    <TextField
                        id='register-password'
                        required
                        error={Boolean(errors.password)}
                        helperText={errors.password || 'Passwords must be at least 8 characters'}
                        type={isPassVisible ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange('password')}
                        label='Password'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setIsPassVisible(!isPassVisible)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge='end'
                                        size='large'
                                    >
                                        {isPassVisible ? (
                                            <VisibilityOff color={errors.password ? 'error' : undefined} />
                                        ) : (
                                            <Visibility color={errors.password ? 'error' : undefined} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id='register-confirm-password'
                        required
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword}
                        type={isPassVisible ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        label='Confirm Password'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setIsPassVisible(!isPassVisible)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge='end'
                                        size='large'
                                    >
                                        {isPassVisible ? (
                                            <VisibilityOff color={errors.confirmPassword ? 'error' : undefined} />
                                        ) : (
                                            <Visibility color={errors.confirmPassword ? 'error' : undefined} />
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
                    <LoadingButton loading={false} fullWidth variant='contained' color='secondary'>
                        Create Account
                    </LoadingButton>
                </Grid>
            </Form>
        </Grid>
    );
}
