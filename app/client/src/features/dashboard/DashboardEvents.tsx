import * as React from 'react';
import {
    Button,
    Card,
    CardContent,
    Grid,
    List,
    ListItemSecondaryAction,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { isAfter, isBefore } from 'date-fns';

import { useRouter } from 'next/router';
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
    const smDownBreakpoint = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const [now, setNow] = React.useState(new Date());
    useRefresh({ refreshInterval: 5000 /* 5 seconds */, callback: () => setNow(new Date()) });

    const handleNav = (event: TDashboardEvent) => () => {
        if (event.isViewerModerator) router.push(`/events/${event.id}/mod`);
        else if (event.isActive) router.push(`/events/${event.id}/live`);
        else router.push(`/events/${event.id}/pre`);
    };

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

    const eventButtonText = (event: TDashboardEvent) => {
        const { isViewerModerator, isActive } = event;
        if (isViewerModerator) return 'Moderate';
        else if (isActive) return 'Join';
        else return 'Pre Event';
    };

    return (
        <Grid container width={lgUpBreakpoint ? '80%' : '100%'} marginLeft={lgUpBreakpoint ? '250px' : '0px'}>
            <Grid item xs={12} marginBottom={theme.spacing(4)}>
                <Card style={{ padding: theme.spacing(1) }}>
                    <CardContent>
                        <Typography
                            data-test-id='dashboard-current-events-header'
                            variant='h6'
                            marginBottom={theme.spacing(1)}
                        >
                            Current Events
                        </Typography>
                        <List>
                            {ongoingEvents.map((event, idx) => (
                                <DashboardEventListItem
                                    key={event.id}
                                    event={event}
                                    divider={idx !== dashboardEvents.length - 1}
                                >
                                    {smDownBreakpoint ? (
                                        <Button
                                            aria-label='view live feed of current event'
                                            variant='contained'
                                            color='primary'
                                            onClick={handleNav(event)}
                                            data-test-id='dashboard-ongoing-event-join-button'
                                        >
                                            {eventButtonText(event)}
                                        </Button>
                                    ) : (
                                        <ListItemSecondaryAction>
                                            <Button
                                                aria-label='view live feed of current event'
                                                variant='contained'
                                                color='primary'
                                                onClick={handleNav(event)}
                                                data-test-id='dashboard-ongoing-event-join-button'
                                            >
                                                {eventButtonText(event)}
                                            </Button>
                                        </ListItemSecondaryAction>
                                    )}
                                </DashboardEventListItem>
                            ))}
                        </List>
                        <Typography
                            data-test-id='dashboard-upcoming-events-header'
                            variant='h6'
                            marginBottom={theme.spacing(1)}
                        >
                            Upcoming Events
                        </Typography>
                        <List>
                            {upcomingEvents.map((event, idx) => (
                                <DashboardEventListItem
                                    key={event.id}
                                    event={event}
                                    divider={idx !== dashboardEvents.length - 1}
                                >
                                    {smDownBreakpoint ? (
                                        <Button
                                            aria-label='view live feed of current event'
                                            variant='contained'
                                            color='primary'
                                            onClick={handleNav(event)}
                                            data-test-id='dashboard-upcoming-event-join-button'
                                        >
                                            {eventButtonText(event)}
                                        </Button>
                                    ) : (
                                        <ListItemSecondaryAction>
                                            <Button
                                                aria-label='view live feed of current event'
                                                variant='contained'
                                                color='primary'
                                                onClick={handleNav(event)}
                                                data-test-id='dashboard-upcoming-event-join-button'
                                            >
                                                {eventButtonText(event)}
                                            </Button>
                                        </ListItemSecondaryAction>
                                    )}
                                </DashboardEventListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
