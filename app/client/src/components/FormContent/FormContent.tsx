import * as React from 'react';
import { Grid, GridProps } from '@mui/material';

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    gridProps?: GridProps;
}

export function FormContent({ children, gridProps }: Props) {
    const count = React.Children.count(children);

    return (
        <Grid
            item
            width='100%'
            data-test-id='form-content'
            container
            alignItems='center'
            alignContent='center'
            {...gridProps}
        >
            {React.Children.map(children, (child, idx) => (
                <Grid item width='100%' sx={{ padding: (theme) => (idx < count - 1 ? theme.spacing(0, 0, 2, 0) : 0) }}>
                    {child}
                </Grid>
            ))}
        </Grid>
    );
}
