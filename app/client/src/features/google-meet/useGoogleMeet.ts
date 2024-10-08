// @ts-nocheck
import React from 'react';
import { useRefetchableFragment } from 'react-relay';
import { graphql } from 'relay-runtime';

import { useGoogleMeetFragment$key } from '@local/__generated__/useGoogleMeetFragment.graphql';
import { useUser } from '../accounts';

export const USE_GOOGLE_MEET_FRAGMENT = graphql`
    fragment useGoogleMeetFragment on Event @refetchable(queryName: "useGoogleMeetRefresh") {
        googleMeetUrl
    }
`;

interface GoogleMeetProps {
    fragmentRef: useGoogleMeetFragment$key;
}

// TODO: Find a way to refresh (so if a google meet is set up while a mod is waiting in the event it would still show up)
export function useGoogleMeet({ fragmentRef }: GoogleMeetProps) {
    const [data] = useRefetchableFragment(USE_GOOGLE_MEET_FRAGMENT, fragmentRef);
    const builder = window.meet();
    const [displayReloadButton, setDisplayReloadButton] = React.useState(false);
    const { user } = useUser();

    const buildMeetApp = React.useCallback(() => {
        const PARENT_ELEMENT = document.getElementById('google-meet');
        if (!PARENT_ELEMENT) throw new Error('Parent element not found');

        // Configure event handlers
        builder.on('showToast', ({ message }) => {
            console.log('Toast:', message);
        });
        builder.on('linkClicked', ({ url: _url }) => {
            console.log(_url);
        });
        builder.on('callStarted', () => {
            console.log('callStarted');
        });
        builder.on('callEnded', () => {
            console.log('callEnded');
            setDisplayReloadButton(true);
        });

        // Configure builder
        builder.setHideChatWhenDisabled(true);
        builder.setPreferredAnonymousUserName(user ? user.firstName + ' ' + user.lastName : 'Anonymous Participant');
        builder.setHostUrlSharing(true);
        builder.setIgnoreBrowserCompatibilityChecks(true);
        // builder.setShowMeetingInfo(false);
        // builder.setEnableEndCallRating(false);

        // TODO: Update elements
        const frameSet = {
            dialog: {
                element: PARENT_ELEMENT,
                options: {
                    cssClasses: 'meet-frame-dialog',
                },
            },
            docked: {
                element: PARENT_ELEMENT,
                options: {
                    cssClasses: 'meet-frame-docked',
                },
            },
            pip: {
                element: PARENT_ELEMENT,
                options: {
                    cssClasses: 'meet-frame-pip',
                },
            },
        };
        builder.useFrameSet(frameSet);

        try {
            const app = builder.build({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MEET_API_KEY as string,
                parentElement: PARENT_ELEMENT,
            });
            return app;
        } catch (error) {
            console.error(error);
        }
    }, [builder, user]);

    const connectToMeetingWithUrl = React.useCallback(
        (url: string) => {
            const meetApp = buildMeetApp();
            if (!meetApp) return;

            meetApp
                .init()
                .then(() => {
                    console.log('Joining call...');
                    meetApp.joinCallFromUrl(url).then((result) => {
                        if (result === 1) console.log('Successfully joined call');
                        else console.error('Failed to join call');
                    });
                })
                .catch((err) => {
                    console.error(err);
                    // TODO: Display browser compatibility message (or other error message)
                });
        },
        [buildMeetApp]
    );

    const connectToMeeting = React.useCallback(() => {
        const meetApp = buildMeetApp();
        if (!meetApp) return;
        meetApp
            .init()
            .then(() => {
                console.log('Joining call...');
                if (!data.googleMeetUrl) throw new Error('Google Meet Url Not Found');
                meetApp.joinCallFromUrl(data.googleMeetUrl).then((result) => {
                    if (result === 1) console.log('Successfully joined call');
                    else console.error('Failed to join call');
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, [buildMeetApp, data.googleMeetUrl]);

    return { connectToMeetingWithUrl, connectToMeeting, displayReloadButton };
}
