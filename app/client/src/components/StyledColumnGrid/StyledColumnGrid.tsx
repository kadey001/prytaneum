import * as React from 'react';
import { Grid } from '@mui/material';
import type { GridProps } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

export interface StyledColumnGridProps {
    children: React.ReactNode;
    props?: GridProps;
    scrollable?: boolean;
}

export const StyledColumnGrid = ({ children, props, scrollable = true }: StyledColumnGridProps) => {
    const theme = useTheme();
    return (
        <Grid
            width={props?.width ? props.width : '100%'}
            container
            justifyContent='center'
            padding={1}
            sx={{
                border: 5,
                borderImage: `linear-gradient(${theme.palette.custom.creamCan},${alpha(
                    theme.palette.custom.creamCan,
                    0.06
                )}) 10`,
                backgroundColor: alpha(theme.palette.custom.creamCan, 0.06),
                overflowY: scrollable ? 'scroll' : 'hidden',
            }}
            {...props}
        >
            {children}
        </Grid>
    );
};
