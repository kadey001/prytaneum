import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { useGoogleMeet } from './useGoogleMeet';
import { useGoogleMeetFragment$key } from '@local/__generated__/useGoogleMeetFragment.graphql';
import { Loader } from '@local/components';

const LoadingIndicator = () => (
    <Grid container direction='column' justifyContent='center' alignItems='center' style={{ height: '100%' }}>
        <Loader />
    </Grid>
);

const ReloadButton = ({ onReload }: { onReload: () => void }) => (
    <Grid container direction='column' justifyContent='center' alignItems='center' style={{ height: '100%' }}>
        <Typography variant='h6'>The call has ended.</Typography>
        <Button variant='contained' onClick={onReload}>
            Reload
        </Button>
        <Typography variant='body2' style={{ marginTop: '1rem', padding: '0 .5rem' }}>
            If you would like to re-join the call click on RELOAD.
        </Typography>
        <Typography variant='body2' style={{ marginTop: '1rem', padding: '0 .5rem' }}>
            If you are having trouble reloading, please refresh the page.
        </Typography>
    </Grid>
);

const ErrorMessage = () => (
    <Grid container direction='column' justifyContent='center' alignItems='center' style={{ height: '100%' }}>
        <Typography variant='subtitle1'>Error connecting to Google Meet</Typography>
        <Button variant='contained' onClick={() => window.location.reload()}>
            Reload
        </Button>
    </Grid>
);

interface GoogleMeetProps {
    fragmentRef: useGoogleMeetFragment$key;
}

function GoogleMeet({ fragmentRef }: GoogleMeetProps) {
    const router = useRouter();
    const { connectToMeeting, displayReloadButton, isLoading, isError } = useGoogleMeet({ fragmentRef });

    React.useEffect(() => {
        connectToMeeting();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <div id='meet-frame-dialog' />
            <div
                id='meet-frame-docked'
                className='meet-frame-docked'
                style={{ height: displayReloadButton || isError ? '100%' : 'auto' }}
            >
                {isLoading ? <LoadingIndicator /> : null}
                {displayReloadButton ? <ReloadButton onReload={() => router.reload()} /> : null}
                {isError ? <ErrorMessage /> : null}
            </div>
            <div id='meet-frame-pip' className='meet-frame-pip' />
        </React.Fragment>
    );
}

export default GoogleMeet;
