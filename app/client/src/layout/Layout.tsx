/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Grid, useMediaQuery, IconButton, ContainerProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useUser } from '@local/features/accounts';

import Main from './Main';
import Page from './Page';
import { AppBar } from './AppBar';
import { SideNav } from './SideNav';
// import { Footer } from './Footer';

export interface LayoutProps {
    children: React.ReactNode | React.ReactNodeArray;
    /**
     * for storybook only, should never be used in prod/app tree
     */
    showAsLoggedIn?: boolean;
    /**
     * for when displaying pages where we want no side nav (live townhalls)
     */
    hideSideNav?: boolean;
    /**
     * these are mui container props
     */
    ContainerProps?: Omit<ContainerProps, 'children'>;
    /**
     * disable default page padding
     */
    disablePadding?: boolean;
}

export function Layout({
    children,
    hideSideNav: noSideNav,
    ContainerProps: _ContainerProps,
    disablePadding,
}: LayoutProps) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { user } = useUser();

    // hardcode breakpoint based on when page resizes (default keys hid element too early or too late)
    const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const isSideNavHidden = React.useMemo(
        () => isLargeScreen || !!noSideNav || !user,
        [isLargeScreen, noSideNav, user]
    );

    return (
        <Page>
            <div style={{ backgroundColor: '#FFF', marginBottom: isSideNavHidden ? 0 : '64px' }}>
                <AppBar
                    sx={{
                        position: isSideNavHidden ? 'sticky' : 'fixed',
                        zIndex: () => (!isSideNavHidden ? theme.zIndex.drawer + 1 : undefined),
                    }}
                >
                    {isSideNavHidden && (
                        <IconButton
                            sx={{ marginRight: theme.spacing(2) }}
                            onClick={() => setOpen(!open)}
                            color='inherit'
                            size='large'
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </AppBar>
            </div>
            <Grid container sx={{ backgroundColor: '#FFFFFF' }} alignItems='flex-start' item xs={12}>
                <SideNav isOpen={open} close={() => setOpen(false)} isHidden={isSideNavHidden} />
                <Main disablePadding={disablePadding} {..._ContainerProps}>
                    {children}
                </Main>
            </Grid>
            {/* <Footer /> */}
        </Page>
    );
}

Layout.defaultProps = {
    showAsLoggedIn: false,
    noSideNav: false,
    ContainerProps: {},
    disablePadding: false,
};
