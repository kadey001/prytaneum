import * as React from 'react';
import { Grid, Typography, Divider, Stack, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';

import { formatDate } from '@local/utils/format';
import { useEventDetailsFragment$data } from '@local/__generated__/useEventDetailsFragment.graphql';
import { useRouter } from 'next/router';

interface Props {
    eventData: useEventDetailsFragment$data;
}

export function EventDetailsCard({ eventData }: Props) {
    const theme = useTheme();
    const { id: eventId, title, topic, description, startDateTime, endDateTime } = eventData;
    const router = useRouter();

    const handleRouteToSettings = React.useCallback(() => {
        router.push(`/events/${eventId}/settings`);
    }, [router, eventId]);

    const startTime = React.useMemo(
        () => formatDate(startDateTime ? new Date(startDateTime) : new Date(), 'h:mmaa'),
        [startDateTime]
    );
    const endTime = React.useMemo(
        () => formatDate(endDateTime ? new Date(endDateTime) : new Date(), 'h:mmaa'),
        [endDateTime]
    );

    return (
        <Grid container direction='column'>
            <Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
                <Typography variant='h5' marginTop={theme.spacing(1)} fontWeight={700}>
                    {title}
                </Typography>
                <Tooltip title='Event Settings'>
                    <IconButton onClick={handleRouteToSettings}>
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Typography color='textSecondary' variant='body1' marginBottom={theme.spacing(1)}>
                {startTime} - {endTime} • {topic} • {description}
            </Typography>
            <Divider style={{ background: 'black' }} />
        </Grid>
    );
}
