import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode | React.ReactNodeArray;
    styles?: GridProps['sx'];
}

export function Form({ onSubmit, children, styles }: Props) {
    const theme = useTheme();
    return (
        <Grid
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
        >
            {children}
        </Grid>
    );
}

Form.propTypes = {
    className: PropTypes.string,
};
