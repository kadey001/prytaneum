import * as React from 'react';
import { styled } from '@mui/material/styles';

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
}

const RootStyled = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 100%',
    overflowY: 'auto',
    overscrollBehavior: 'none',
}));

/**
 * Wraps everything in the app style wise
 */
export default function Page({ children }: Props) {
    return (
        <RootStyled id='page'>
            {children}
        </RootStyled>
    );
}
