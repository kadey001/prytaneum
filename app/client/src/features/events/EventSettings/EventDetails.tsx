import { useMemo } from 'react';
import { Typography, Grid, Button, DialogContent } from '@mui/material';
import { useFragment, graphql } from 'react-relay';
import { Edit } from '@mui/icons-material';

import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import type { EventDetailsFragment$key } from '@local/__generated__/EventDetailsFragment.graphql';
import { formatDate } from '@local/utils/format';
import { UpdateEvent } from '@local/features/events';

export interface EventDetailsProps {
    fragmentRef: EventDetailsFragment$key;
    className?: string;
}

export const EVENT_DETAILS_FRAGMENT = graphql`
    fragment EventDetailsFragment on Event {
        id
        title
        topic
        description
        startDateTime
        endDateTime
    }
`;

// dates are actually strings when passed in, javascript shenanigans...
const formatDates = (dates: (string | Date | null)[]) =>
    dates.map((date) => formatDate(date || new Date(), 'MMM do, yyyy @ h:mm a'));

export function EventDetails({ fragmentRef }: EventDetailsProps) {
    const [isOpen, open, close] = useResponsiveDialog();
    const {
        id,
        startDateTime: startStr,
        endDateTime: endStr,
        ...data
    } = useFragment(EVENT_DETAILS_FRAGMENT, fragmentRef);

    // https://github.com/facebook/relay/issues/91
    const [startDateTime, endDateTime] = useMemo(() => formatDates([startStr, endStr]), [startStr, endStr]);

    const formattedData = useMemo(() => ({ ...data, startDateTime, endDateTime }), [data, startDateTime, endDateTime]);

    const entries = useMemo(() => Object.entries(formattedData), [formattedData]);

    return (
        <Grid
            container
            sx={{
                '& > *:not(:last-child)': {
                    marginBottom: (theme) => theme.spacing(1),
                },
            }}
        >
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <UpdateEvent
                        form={{
                            title: formattedData.title ?? '',
                            topic: formattedData.topic ?? '',
                            description: formattedData.description ?? '',
                            startDateTime: startStr ? new Date(startStr) : new Date(),
                            endDateTime: endStr ? new Date(endStr) : new Date(),
                        }}
                        eventId={id}
                        onSubmit={close}
                        onCancel={close}
                    />
                </DialogContent>
            </ResponsiveDialog>
            {entries.map(([key, value]) => (
                <Grid item xs={12} key={key}>
                    <Typography variant='overline'>
                        {key === 'startDateTime' && 'START DATE & TIME'}
                        {key === 'endDateTime' && 'END DATE & TIME'}
                        {key !== 'startDateTime' && key !== 'endDateTime' && key}
                    </Typography>
                    <Typography sx={{ marginLeft: (theme) => theme.spacing(2) }}>{value}</Typography>
                </Grid>
            ))}
            <Grid item xs={12} container justifyContent='flex-end'>
                <Grid item>
                    <Button variant='outlined' onClick={open} startIcon={<Edit />}>
                        Modify Details
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
