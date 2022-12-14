import { useMemo } from 'react';
import { graphql, usePaginationFragment } from 'react-relay';

import type { useUsersDashboardFragment$key } from '@local/__generated__/useUsersDashboardFragment.graphql';

const USE_USERS_DASHBOARD_FRAGMENT = graphql`
    fragment useUsersDashboardFragment on User
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 200 }
        after: { type: "String", defaultValue: "" }
        filter: { type: "UsersSearchFilters", defaultValue: { firstName: "", lastName: "", email: "" } }
    )
    @refetchable(queryName: "UsersDashboardPaginationQuery") {
        users(first: $first, after: $after, filter: $filter) @connection(key: "UsersDashboard_users") {
            edges {
                node {
                    id
                    firstName
                    lastName
                    email
                    avatar
                    isAdmin
                    canMakeOrgs
                }
            }
        }
    }
`;

interface UseUsersDashboardProps {
    fragmentRef: useUsersDashboardFragment$key;
}

export function useUsersDashboard({ fragmentRef }: UseUsersDashboardProps) {
    const { data, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch } =
        usePaginationFragment(USE_USERS_DASHBOARD_FRAGMENT, fragmentRef);

    const usersList = useMemo(() => {
        return data.users?.edges?.map((edge) => edge?.node) ?? [];
    }, [data.users?.edges]);

    return { usersList, loadNext, loadPrevious, hasNext, hasPrevious, isLoadingNext, isLoadingPrevious, refetch };
}
