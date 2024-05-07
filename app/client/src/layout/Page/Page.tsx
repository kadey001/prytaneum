import * as React from 'react';

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
}

/**
 * Wraps everything in the app style wise
 */
export default function Page({ children }: Props) {
    return (
        <div
            id='page'
            style={{
                display: 'flex',
                flex: '1 1 100%',
                flexDirection: 'column',
                overflowY: 'auto',
                overscrollBehavior: 'none',
            }}
        >
            {children}
        </div>
    );
}
