import * as React from 'react';
import { Grid, Paper, Link, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

import { LoginForm, useUser } from '@local/features/accounts';

export default function Login() {
    const theme = useTheme();
    const mdDownBreakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    const { user } = useUser();

    React.useEffect(() => {
        if (user) router.push('/dashboard');
    }, [user, router]);

    return (
        <Grid
            container
            alignItems='center'
            justifyContent='center'
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexGrow: 1,
                flexDirection: mdDownBreakpoint ? 'column-reverse' : 'row',
            }}
        >
            <Grid item md={7}>
                <img
                    src='/static/login_illustration.png'
                    width='100%'
                    height='100%'
                    alt='Login Illustation'
                    style={{ objectFit: 'contain' }}
                />
            </Grid>
            <Grid item md={5} sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5rem' }}>
                <Paper
                    sx={{
                        maxWidth: 425,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: theme.spacing(3),
                        margin: theme.spacing(1),
                    }}
                >
                    <LoginForm
                        onSuccess={() => router.reload()}
                        secondaryActions={
                            <Link
                                href='/register'
                                underline={mdDownBreakpoint ? 'always' : 'hover'}
                                textAlign='center'
                                sx={[
                                    { color: theme.palette.primary.main, paddingTop: theme.spacing(2) },
                                    {
                                        '&:hover': {
                                            color: theme.palette.grey[600],
                                        },
                                    },
                                ]}
                            >
                                Don&apos;t have an account?
                            </Link>
                        }
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}
