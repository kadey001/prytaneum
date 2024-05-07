import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, GridProps } from '@mui/material';

interface Props {
    gridProps?: GridProps;
}

/**
 * @description generic Loader that displays in the center vertically and horizontally of its parent component
 * requires that the parent component have a height
 * @category Component
 * @constructor Loader
 */
export const Loader = ({ gridProps }: Props) => {
    return (
        <Grid container justifyContent='center' width='100%' height='100%' {...gridProps}>
            <Grid item xs={12} container direction='column' alignContent='center'>
                <CircularProgress sx={{ display: 'flex', flex: 1 }} />
            </Grid>
        </Grid>
    );
};
