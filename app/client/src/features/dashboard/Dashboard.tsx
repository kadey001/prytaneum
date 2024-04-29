import * as React from 'react';
import {
    fetchQuery,
    graphql,
    PreloadedQuery,
    usePreloadedQuery,
    useQueryLoader,
    useRelayEnvironment,
} from 'react-relay';

import type { DashboardQuery } from '@local/__generated__/DashboardQuery.graphql';
import { ConditionalRender } from '@local/components/ConditionalRender';
import { Loader } from '@local/components/Loader';
import { DashboardEvents } from './DashboardEvents';

export const DASHBOARD_QUERY = graphql`
    query DashboardQuery {
        dashboardEvents {
            id
            startDateTime
            endDateTime
            title
            topic
            description
            isActive
            isViewerModerator
            organization {
                name
            }
        }
    }
`;

interface DashboardContainerProps {
    queryRef: PreloadedQuery<DashboardQuery>;
}

export function DashboardContainer({ queryRef }: DashboardContainerProps) {
    const { dashboardEvents } = usePreloadedQuery(DASHBOARD_QUERY, queryRef);

    if (!dashboardEvents) return <Loader />;
    return <DashboardEvents dashboardEvents={dashboardEvents} />;
}

export function PreloadedDashboard() {
    const [queryRef, loadQuery, dispose] = useQueryLoader<DashboardQuery>(DASHBOARD_QUERY);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const environment = useRelayEnvironment();
    const REFRESH_INTERVAL = 60000; // 60 seconds

    const refresh = React.useCallback(() => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        fetchQuery(environment, DASHBOARD_QUERY, {}).subscribe({
            complete: () => {
                setIsRefreshing(false);
                loadQuery({}, { fetchPolicy: 'store-or-network' });
            },
            error: (error: any) => {
                console.error(error);
                setIsRefreshing(false);
            },
        });
    }, [environment, isRefreshing, loadQuery]);

    React.useEffect(() => {
        // Load the query on initial render
        if (!queryRef) loadQuery({}, { fetchPolicy: 'network-only' });
        // Refresh the query every 20 seconds
        const interval = setInterval(refresh, REFRESH_INTERVAL);
        return () => {
            clearInterval(interval);
            dispose();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!queryRef) return <Loader />;
    return (
        <ConditionalRender client>
            <React.Suspense fallback={<Loader />}>
                <DashboardContainer queryRef={queryRef} />
            </React.Suspense>
        </ConditionalRender>
    );
}
