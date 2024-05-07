/* eslint-disable react/require-default-props */
import * as React from 'react';
import { Grid, Typography } from '@mui/material';

interface Props {
    helpText?: string;
    name: string;
    children: JSX.Element;
}

export default function SettingsItem({ helpText, name, children }: Props) {
    return (
        <Grid item xs={12} container justifyContent='flex-start' alignItems='center' flex={helpText ? 0 : 1}>
            <Grid item flex={1}>
                <Typography>{name}</Typography>
                {helpText && (
                    <Typography variant='caption' color='textSecondary'>
                        {helpText}
                    </Typography>
                )}
            </Grid>
            {children}
        </Grid>
    );
}
