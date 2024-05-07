import * as React from 'react';
import { Grid, GridProps } from '@mui/material';

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
    gridProps?: GridProps;
    disableGrow?: boolean;
}

export function FormActions({ children, gridProps, disableGrow }: Props) {
    const count = React.Children.count(children);

    return (
        <Grid
            item
            width='100%'
            container
            justifyContent='space-evenly'
            alignContent='flex-end'
            alignItems='center'
            {...gridProps}
        >
            {React.Children.map(children, (child, idx) => (
                <Grid
                    item
                    xs='auto'
                    sx={{
                        flexGrow: disableGrow ? 0 : 1,
                        padding: (theme) => (idx < count - 1 ? theme.spacing(0, 2, 0, 0) : 0),
                    }}
                >
                    {child}
                </Grid>
            ))}
        </Grid>
    );
}
