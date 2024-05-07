import * as React from 'react';
import { Grid, Typography, Divider } from '@mui/material';

interface Props {
    errorMessage?: string;
}

export default function NotFound({ errorMessage }: Props) {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
            <Grid container justifyContent='center' direction='column' alignContent='stretch'>
                <Grid container justifyContent='center'>
                    <Typography variant='h3' color='error' display='inline'>
                        404
                    </Typography>
                    &nbsp;
                    <Typography variant='h3' display='inline' fontWeight={100}>
                        Not found
                    </Typography>
                </Grid>
                <Divider variant='middle' sx={{ marginBottom: (theme) => theme.spacing(3) }} />
                <Grid container justifyContent='center' sx={{ marginBottom: (theme) => theme.spacing(3) }}>
                    <Typography variant='subtitle2' component='div'>
                        Please check the link and try again
                    </Typography>
                </Grid>
                {errorMessage && (
                    <Grid container justifyContent='center'>
                        <Typography>
                            We received the following error: &nbsp;
                            <b>{errorMessage}</b>
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

NotFound.defaultProps = {
    errorMessage: undefined,
};
