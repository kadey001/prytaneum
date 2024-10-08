import React from 'react';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';

import { useGoogleMeet } from './useGoogleMeet';
import { useGoogleMeetFragment$key } from '@local/__generated__/useGoogleMeetFragment.graphql';

interface GoogleMeetProps {
    fragmentRef: useGoogleMeetFragment$key;
}

function GoogleMeet({ fragmentRef }: GoogleMeetProps) {
    const router = useRouter();
    const { connectToMeeting, displayReloadButton } = useGoogleMeet({ fragmentRef });

    React.useEffect(() => {
        connectToMeeting();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // TODO: Add a modal (or div with fixed position) that will be the meet-frame-dialog (for settings config)
    // TODO: Add componenet for the meet-frame-pip
    // TODO: Improved way to rejoin call after ending (better style for reload button)
    return (
        <React.Fragment>
            {displayReloadButton ? (
                <Grid container justifyContent='center' alignItems='center' style={{ height: '100%' }}>
                    <Button variant='contained' onClick={() => router.reload()}>
                        Reload
                    </Button>
                </Grid>
            ) : (
                <div id='google-meet' className='meet-frame' />
            )}
        </React.Fragment>
    );
}

export default GoogleMeet;
