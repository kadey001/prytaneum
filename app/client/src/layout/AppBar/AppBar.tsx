import * as React from 'react';
import MUIAppBar, { AppBarProps } from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { useQueryLoader } from 'react-relay';

import { ConditionalRender } from '@local/components';
import { UserMenu, UserMenuLoader } from '@local/features/accounts';
import Title from './Title';
import { USER_CONTEXT_QUERY } from '@local/features/accounts/UserContext';
import { UserContextQuery } from '@local/__generated__/UserContextQuery.graphql';
import { useMediaQuery } from '@mui/material';

function PreloadedUserMenu() {
    const [queryRef, loadQuery] = useQueryLoader<UserContextQuery>(USER_CONTEXT_QUERY);
    React.useEffect(() => {
        if (!queryRef) loadQuery({});
    }, [loadQuery, queryRef]);

    if (!queryRef) return <UserMenuLoader />;

    return <UserMenu queryRef={queryRef} />;
}

export function AppBar({ children, ...rest }: AppBarProps) {
    const theme = useTheme();
    const lgBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <MUIAppBar
            style={{
                backgroundColor: '#fff',
                color: theme.palette.getContrastText('#fff'),
                flexGrow: 0,
                overscrollBehavior: 'contain',
                marginBottom: lgBreakpoint ? theme.spacing(3) : theme.spacing(0),
            }}
            sx={{
                '&::after': {
                    content: '""',
                    width: '95%',
                    margin: '0 2.5%',
                    position: 'absolute',
                    height: '6px',
                    bottom: '-1px',
                    borderRadius: '4px',
                    // borderBottom: `3px solid ${theme.palette.primary.light}`,
                },
            }}
            position='sticky'
            {...rest}
        >
            <Toolbar>
                {children}
                <Title />
                <ConditionalRender client>
                    <React.Suspense fallback={<UserMenuLoader />}>
                        <PreloadedUserMenu />
                    </React.Suspense>
                </ConditionalRender>
                <ConditionalRender server>
                    <UserMenuLoader />
                </ConditionalRender>
            </Toolbar>
        </MUIAppBar>
    );
}
