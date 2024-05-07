import React from 'react';
import { PasswordResetRequestForm } from '@local/features/accounts/PasswordResetRequestForm';
import { Grid, Paper, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function ForgotPassword() {
    const theme = useTheme();
    const mdUpBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Grid container direction='column' alignContent='center' justifyContent='center' width='100%' height='100%'>
            <Paper
                sx={{
                    padding: theme.spacing(2),
                    boxShadow: mdUpBreakpoint ? theme.shadows[10] : 'none',
                    borderRadius: 1,
                }}
            >
                <PasswordResetRequestForm onSuccess={() => null} onFailure={() => null} />
            </Paper>
        </Grid>
    );
}
