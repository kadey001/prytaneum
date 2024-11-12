import * as React from 'react';
import { Grid, GridProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface FormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode | React.ReactNodeArray;
    styles?: GridProps['sx'];
    className?: string;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(({ onSubmit, children, styles, className }, ref) => {
    const theme = useTheme();
    return (
        <Grid
            ref={ref}
            noValidate
            component='form'
            autoComplete='off'
            onSubmit={onSubmit}
            container
            sx={{
                '& > *': { paddingBottom: theme.spacing(2) },
                '&:last-child': {
                    paddingBottom: 0,
                },
                width: '100%',
                marginTop: theme.spacing(2),
                ...styles,
            }}
            className={className}
        >
            {children}
        </Grid>
    );
});
