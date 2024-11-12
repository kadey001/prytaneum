import * as React from 'react';
import { Grid, List, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { isAfter, isBefore } from 'date-fns';

import { DashboardEventListItem } from './DashboardEventListItem';
import { useRefresh } from '../core';

export type TDashboardEvent = {
    readonly id: string;
    readonly title: string | null;
    readonly description: string | null;
    readonly isActive: boolean | null;
    readonly isViewerModerator: boolean | null;
    readonly startDateTime: Date | null;
    readonly endDateTime: Date | null;
    readonly organization: {
        readonly name: string;
    } | null;
};

interface DashboardEventsProps {
    dashboardEvents: readonly TDashboardEvent[];
}

export function DashboardEvents({ dashboardEvents }: DashboardEventsProps) {
    const theme = useTheme();
    const lgUpBreakpoint = useMediaQuery(theme.breakpoints.up('lg'));
    const [now, setNow] = React.useState(new Date());
    useRefresh({ refreshInterval: 5000 /* 5 seconds */, callback: () => setNow(new Date()) });

    const upcomingEvents = React.useMemo(() => {
        return dashboardEvents.filter((event) => {
            if (!event.startDateTime || event.isActive) return false;
            return isAfter(new Date(event.startDateTime), now);
        });
    }, [dashboardEvents, now]);

    const ongoingEvents = React.useMemo(() => {
        return dashboardEvents.filter((event) => {
            if (!event.startDateTime || !event.endDateTime) return Boolean(event.isActive);
            return (
                Boolean(event.isActive) ||
                (isBefore(new Date(event.startDateTime), now) && isAfter(new Date(event.endDateTime), now))
            );
        });
    }, [dashboardEvents, now]);

    return (
        <Grid container textAlign='center' paddingLeft={lgUpBreakpoint ? '250px' : 0}>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                aria-labelledby='current-events-subheader'
                subheader={
                    <Typography
                        data-test-id='dashboard-current-events-header'
                        id='nested-current-events-subheader'
                        variant='h6'
                        marginBottom={theme.spacing(1)}
                    >
                        Current Events
                    </Typography>
                }
            >
                {ongoingEvents.length === 0 && (
                    <Grid container justifyContent='center'>
                        <Typography variant='subtitle2'>No Ongoing Events To Display</Typography>
                    </Grid>
                )}
                {ongoingEvents.map((event, idx) => (
                    <DashboardEventListItem key={event.id} event={event} divider={idx !== dashboardEvents.length - 1} />
                ))}
            </List>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                aria-labelledby='upcoming-events-subheader'
                subheader={
                    <Typography
                        data-test-id='dashboard-upcoming-events-header'
                        id='nested-upcoming-events-subheader'
                        variant='h6'
                        marginBottom={theme.spacing(1)}
                    >
                        Upcoming Events
                    </Typography>
                }
            >
                {upcomingEvents.length === 0 && (
                    <Grid container justifyContent='center'>
                        <Typography variant='subtitle2'>No Upcoming Events To Display</Typography>
                    </Grid>
                )}
                {upcomingEvents.map((event, idx) => (
                    <DashboardEventListItem key={event.id} event={event} divider={idx !== dashboardEvents.length - 1} />
                ))}
            </List>
        </Grid>
    );
}
