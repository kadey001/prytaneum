import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Avatar, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import DoneIcon from '@mui/icons-material/Done';

interface Props {
    // eslint-disable-next-line react/require-default-props
    img?: string;
}

export default function UserProfile({ img }: Props) {
    const theme = useTheme();

    return (
        <div style={{ padding: theme.spacing(0, 1, 1, 1), height: '100%', width: '100%' }}>
            <Grid container alignContent='center' spacing={2}>
                <Grid component='span' item xs={12}>
                    <Avatar src={img} alt='Profile Avatar' />
                    {/* ROUTING: to page to upload new photo */}
                </Grid>
                <Grid component='span' item xs={12}>
                    <TextField
                        inputProps={{ 'aria-label': 'E-mail' }}
                        label='E-mail'
                        aria-label='E-mail'
                        required
                        type='text'
                        value='TODO'
                        onChange={() => {}}
                    />
                </Grid>
                <Grid component='span' item xs={12}>
                    <TextField
                        inputProps={{ 'aria-label': 'Password' }}
                        label='Password'
                        aria-label='Password'
                        required
                        type='password'
                        value='TODO'
                        onChange={() => {}}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
