import * as React from 'react';
import { graphql, useRefetchableFragment } from 'react-relay';
import { Button, Grid, Typography } from '@mui/material';

import { GoogleMeetSettingsFragment$key } from '@local/__generated__/GoogleMeetSettingsFragment.graphql';
import { GoogleMeetForm } from './GoogleMeetForm';

export const GOOGLE_MEET_SETTINGS_FRAGMENT = graphql`
    fragment GoogleMeetSettingsFragment on Event @refetchable(queryName: "GoogleMeetSettingsFragmentRefresh") {
        googleMeetUrl
    }
`;

interface GoogleMeetSettingsProps {
    fragmentRef: GoogleMeetSettingsFragment$key;
}

export const GoogleMeetSettings = ({ fragmentRef }: GoogleMeetSettingsProps) => {
    const [fragmentData] = useRefetchableFragment(GOOGLE_MEET_SETTINGS_FRAGMENT, fragmentRef);
    const [meetingUrl, setMeetingUrl] = React.useState(fragmentData.googleMeetUrl || '');

    const handleViewMeeting = () => {
        window.location.href = meetingUrl;
    };

    return (
        <React.Fragment>
            <Grid container justifyContent='center' alignItems='center' direction='column'>
                <Grid item>
                    <Typography variant='h6'>Google Meet Settings</Typography>
                </Grid>
                <React.Fragment>
                    <GoogleMeetForm setMeetingUrl={setMeetingUrl} />
                    {meetingUrl ? <Button onClick={handleViewMeeting}>View/Edit Meeting</Button> : null}
                    {meetingUrl ? <p>URL: {meetingUrl}</p> : null}
                </React.Fragment>
            </Grid>
        </React.Fragment>
    );
};
