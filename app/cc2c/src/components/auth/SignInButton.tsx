'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
    visible: boolean;
}

export function SignInButton({ visible, ...restProps }: Props): JSX.Element | null {
    if (!visible) return null;
    return (
        <Button variant='contained' color='primary' onClick={() => signIn('email')} {...restProps}>
            Sign In
        </Button>
    );
}
