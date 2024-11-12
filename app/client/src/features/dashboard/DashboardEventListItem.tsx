import * as React from 'react';
import { useRouter } from 'next/router';
import { ListItem, ListItemAvatar, ListItemSecondaryAction, Tooltip } from '@mui/material';
import { Shield } from '@mui/icons-material';
import { DashboardEvent } from '@local/features/dashboard/DashboardEvent';
import type { TDashboardEvent } from '@local/features/dashboard/DashboardEvents';
import { LoadingButton } from '@local/components/LoadingButton';

interface DashboardEventListItemProps {
    event: TDashboardEvent;
    divider: boolean;
    children?: React.ReactNode;
}

function ModeratorIcon({ isModerator }: { isModerator: boolean }) {
    if (isModerator)
        return (
            <ListItemAvatar>
                <Tooltip title='You are a moderator for this event'>
                    <Shield />
                </Tooltip>
            </ListItemAvatar>
        );
    return <></>;
}

export function DashboardEventListItem({ event, divider, children }: DashboardEventListItemProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (event.isViewerModerator) router.push(`/events/${event.id}/new-mod`);
            else if (event.isActive) router.push(`/events/${event.id}/live`);
            else router.push(`/events/${event.id}/pre`);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();

        if (event.isViewerModerator) {
            setIsLoading(true);
            router.push(`/events/${event.id}/settings`).catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
        }
    };

    const eventButtonText = (_event: TDashboardEvent) => {
        const { isViewerModerator, isActive } = _event;
        if (isViewerModerator) return 'Moderate';
        else if (isActive) return 'Join';
        else return 'Pre Event';
    };

    return (
        <ListItem
            key={event.id}
            divider={divider}
            button
            onClick={handleItemClick}
            disableRipple={!event.isViewerModerator}
            disableTouchRipple={!event.isViewerModerator}
            data-test-id={`dashboard-event-list-item-${event.title}`}
            disabled={isLoading}
        >
            <ModeratorIcon isModerator={!!event.isViewerModerator} />
            <DashboardEvent
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                startDateTime={event.startDateTime}
                organization={event.organization?.name}
            />

            <ListItemSecondaryAction>
                <LoadingButton
                    loading={isLoading}
                    aria-label='view live feed of current event'
                    variant='contained'
                    color='primary'
                    onClick={handleButtonClick}
                    data-test-id='dashboard-ongoing-event-join-button'
                >
                    {eventButtonText(event)}
                </LoadingButton>
            </ListItemSecondaryAction>
            {children}
        </ListItem>
    );
}
