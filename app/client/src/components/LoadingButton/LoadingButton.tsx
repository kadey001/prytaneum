import * as React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
    loading: boolean;
    children: React.ReactNode;
    disabled?: boolean;
}

export const LoadingButton = ({ loading, onClick, children, disabled = false, ...restProps }: LoadingButtonProps) => {
    return (
        <Button
            onClick={onClick}
            disabled={loading || disabled}
            variant='contained'
            color='primary'
            style={{ position: 'relative' }}
            {...restProps}
        >
            {loading && <CircularProgress size={24} style={{ position: 'absolute' }} />}
            {children}
        </Button>
    );
};
