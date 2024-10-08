import * as React from 'react';
import { useRouter } from 'next/router';
import { graphql, useRefetchableFragment } from 'react-relay';
import { Button, Grid, Typography } from '@mui/material';

import { useUser } from '@local/features/accounts';
import { GoogleMeetSettingsFragment$key } from '@local/__generated__/GoogleMeetSettingsFragment.graphql';
import { useEvent } from '../useEvent';

export const GOOGLE_MEET_SETTINGS_FRAGMENT = graphql`
    fragment GoogleMeetSettingsFragment on Event @refetchable(queryName: "GoogleMeetSettingsFragmentRefresh") {
        googleMeetUrl
    }
`;

interface GoogleMeetSettingsProps {
    fragmentRef: GoogleMeetSettingsFragment$key;
}

// TODO: Implement GoogleMeetSettings component
// TODO: Check for oAuth token, auth/re-auth if necessary
// TODO: If auth is successful, display options to configure and create a Google Meet
// TODO: Attach the created Google Meet to the event
export const GoogleMeetSettings = ({ fragmentRef }: GoogleMeetSettingsProps) => {
    const [fragmentData] = useRefetchableFragment(GOOGLE_MEET_SETTINGS_FRAGMENT, fragmentRef);
    const router = useRouter();
    const { user } = useUser();
    const { eventId } = useEvent();
    const [meetingUrl, setMeetingUrl] = React.useState(fragmentData.googleMeetUrl || '');

    const handleClick = () => {
        if (!user) {
            return console.error('User not found, please login');
        }
        const currentRoute = process.env.NEXT_PUBLIC_BASE_URL + router.asPath; // Get the current route to redirect back to

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/meet`, {
            method: 'POST',
            body: JSON.stringify({
                userId: user.id,
                postAuthRedirectUrl: `${currentRoute}`,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            console.log(res);
            if (!res.ok || res.status !== 200) {
                console.error(res.statusText);
                return;
            }
            res.json().then((data) => {
                router.push(data.url);
            });
        });
    };

    // TODO: Store auth token locally to use for calling Google Meet API directly (Need refresh logic/checks)
    const createMeet = () => {
        if (!user) {
            return console.error('User not found, please login');
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/google-meet/create`, {
            method: 'POST',
            body: JSON.stringify({
                userId: user.id,
                eventId,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Aceess-Control-Allow-Methods': 'POST',
            },
        }).then((res) => {
            console.log(res);
            if (!res.ok || res.status !== 200) {
                console.error(res.statusText);
                return;
            }
            res.json().then((data) => {
                console.log(data);
                if (!data.meetingUri) {
                    return console.error('Meeting URL not found');
                }
                setMeetingUrl(data.meetingUri);
            });
        });
    };

    const handleViewMeeting = () => {
        if (meetingUrl) {
            window.location.href = meetingUrl;
        }
    };

    // TODO: Only show auth button if needed
    // TODO: Add option to reveal/hide the url (in case button isn't working)
    // TODO: Improve the "Create Google Meet" with modal and config options
    return (
        <Grid container justifyContent='center' alignItems='center' direction='column'>
            <Grid item>
                <Typography variant='h6'>Google Meet Settings</Typography>
            </Grid>
            <React.Fragment>
                <Button variant='contained' onClick={handleClick}>
                    Authenticate with Google
                </Button>
                {meetingUrl === '' ? (
                    <Button onClick={createMeet}>Create Google Meet</Button>
                ) : (
                    <Button onClick={createMeet}>Re-Create Google Meet</Button>
                )}

                {meetingUrl ? <Button onClick={handleViewMeeting}>View/Edit Meeting</Button> : null}
                {meetingUrl ? <p>URL: {meetingUrl}</p> : null}
            </React.Fragment>
        </Grid>
    );
};
