import * as React from 'react';
import { Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';

import type { OrgProfileQuery } from '@local/__generated__/OrgProfileQuery.graphql';
import { OrgEventList, OrgMemberList } from '@local/features/organizations';
import { Loader } from '@local/components/Loader';
import { useUser } from '../accounts';

export const ORG_PROFILE = graphql`
    query OrgProfileQuery($id: ID!, $count: Int, $cursor: String) {
        node(id: $id) {
            id
            ... on Organization {
                name
                ...OrgEventListFragment
                ...OrgMemberListFragment
            }
        }
    }
`;

interface Props {
    queryRef: PreloadedQuery<OrgProfileQuery>;
}

export const OrgProfile = ({ queryRef }: Props) => {
    const theme = useTheme();
    const lgBreakpointUp = useMediaQuery(theme.breakpoints.up('lg'));
    const { node } = usePreloadedQuery(ORG_PROFILE, queryRef);
    const { user } = useUser();

    if (!node || !user) return <Loader />;

    return (
        <Grid
            container
            style={lgBreakpointUp ? { width: '80%', marginLeft: 250 } : { width: '100%', marginLeft: 0 }}
            sx={{
                height: '100%',
                '& > *': {
                    margin: theme.spacing(2, 0),
                },
            }}
            alignItems='flex-start'
            alignContent='flex-start'
        >
            <Typography variant='h4'>{node?.name ?? 'Unknown Organization'}</Typography>
            <Grid component={Paper} container item direction='column' style={{ padding: theme.spacing(3) }}>
                <Typography variant='h5'>Events</Typography>
                {node && <OrgEventList fragementRef={node} />}
            </Grid>
            <Grid component={Paper} container item direction='column' style={{ padding: theme.spacing(3) }}>
                <Typography variant='h5'>Members</Typography>
                {node && <OrgMemberList fragmentRef={node} />}
            </Grid>
        </Grid>
    );
};
