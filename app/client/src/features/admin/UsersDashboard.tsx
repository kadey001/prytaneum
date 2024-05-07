import * as React from 'react';
import { graphql, useQueryLoader, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { ConditionalRender, Loader } from '@local/components';
import type { UsersDashboardQuery } from '@local/__generated__/UsersDashboardQuery.graphql';
import { UsersTable } from './UsersTable';

const USERS_DASHBOARD_QUERY = graphql`
    query UsersDashboardQuery {
        me {
            ...useUsersDashboardFragment
        }
    }
`;

interface UsersListProps {
    queryRef: PreloadedQuery<UsersDashboardQuery>;
}

function UsersList({ queryRef }: UsersListProps) {
    const { me } = usePreloadedQuery(USERS_DASHBOARD_QUERY, queryRef);

    if (!me) return <Loader />;
    return <UsersTable fragmentRef={me} />;
}

function PreloadedUsersList() {
    const [query, loadQuery, disposeQuery] = useQueryLoader<UsersDashboardQuery>(USERS_DASHBOARD_QUERY);

    React.useEffect(() => {
        if (!query) loadQuery({}, { fetchPolicy: 'store-or-network' });
    }, [query, loadQuery]);

    React.useEffect(() => {
        return () => disposeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!query) return <Loader />;
    return <UsersList queryRef={query} />;
}

export function UsersDashboard() {
    const theme = useTheme();
    const lgUpBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Grid container width={lgUpBreakpoint ? '80%' : '100%'} marginLeft={lgUpBreakpoint ? '250px' : '0px'}>
            <Paper>
                <Grid paddingLeft='1rem'>
                    <Typography variant='h4'>Admin Dashboard: Users</Typography>
                </Grid>
                <ConditionalRender client>
                    <React.Suspense fallback={<Loader />}>
                        <PreloadedUsersList />
                    </React.Suspense>
                </ConditionalRender>
            </Paper>
        </Grid>
    );
}
