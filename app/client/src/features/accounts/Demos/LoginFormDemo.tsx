import * as React from 'react';
import { Button, InputAdornment, IconButton, Link as MUILink, Grid, Typography, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { LoadingButton } from '@local/components/LoadingButton';
import { useForm } from '@local/core';

interface TLoginForm {
    [index: string]: string;
    email: string;
    password: string;
}

const intialState: TLoginForm = { email: '', password: '' };

export function LoginFormDemo() {
    const [isPassVisible, setIsPassVisible] = React.useState(false);
    const [form, errors, , handleChange] = useForm(intialState);

    return (
        <Grid container justifyContent='center'>
            <Grid item container xs={12} direction='column' alignItems='center'>
                {/* <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar> */}
                <Typography component='h1' variant='h6'>
                    Login
                </Typography>
            </Grid>
            <Form onSubmit={() => {}}>
                <FormContent>
                    <TextField
                        id='login-email'
                        required
                        type='email'
                        value={form.email}
                        helperText={errors.email}
                        error={Boolean(errors.email)}
                        onChange={handleChange('email')}
                        label='Email'
                    />
                    <>
                        <TextField
                            id='login-password'
                            required
                            error={Boolean(errors.password)}
                            type={isPassVisible ? 'text' : 'password'}
                            value={form.password}
                            onChange={handleChange('password')}
                            helperText={errors.password}
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
                        <Grid container justifyContent='flex-end'>
                            <MUILink
                                sx={{ padding: (theme) => theme.spacing(0.5, 0, 0, 0) }}
                                color='primary'
                                underline='hover'
                            >
                                Forgot Password?
                            </MUILink>
                        </Grid>
                    </>
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
                    <LoadingButton loading={false}>
                        <Button fullWidth variant='contained' color='secondary'>
                            Login
                        </Button>
                    </LoadingButton>
                </Grid>
            </Form>
        </Grid>
    );
}
