import * as React from 'react';
import { Grid, Paper, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useRouter } from 'next/router';
import { PasswordResetForm } from '@local/features/accounts/PasswordResetForm';

export default function ForgotPasswordReset() {
    const theme = useTheme();
    const mdUpBreakpoint = useMediaQuery(theme.breakpoints.up('md'));
    const router = useRouter();

    return (
        <Grid container direction='column' alignContent='center' justifyContent='center' width='100%' height='100%'>
            <Paper
                sx={{
                    padding: theme.spacing(2),
                    boxShadow: mdUpBreakpoint ? theme.shadows[10] : 'none',
                    borderRadius: 1,
                }}
            >
                <PasswordResetForm
                    onSuccess={() => router.push('/login')}
                    onFailure={() => router.push('/forgot-password')}
                    token={router.query.token}
                    tokenReady={router.isReady}
                />
            </Paper>
        </Grid>
    );
}
