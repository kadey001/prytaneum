import * as React from 'react';
import { Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

import { EventVideoInfoPopper, useEventInfoPopper } from '../EventInfoPoppers';

export type VideoPlayerProps = ReactPlayerProps;

/** Displays the video stream that plays during the townhall
 *  @category Component
 *  @constructor VideoPlayer
 *  @param ReactPlayerProps
 *  @param {string | string[] | SourceProps[] | MediaStream} ReactPlayerProps.url URL
 *  @param {any} ReactPlayerProps.rest rest of props to pass to ReactPlayer
 */
export function VideoPlayer({ url, rest }: ReactPlayerProps) {
    const theme = useTheme();
    const [currentPopper] = useEventInfoPopper();
    const videoContainerRef = React.useRef<HTMLDivElement | null>(null);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%', // 16:9 Aspect Ratio (divide 9 by 16 = 0.5625)
            }}
        >
            <EventVideoInfoPopper videoContainerRef={videoContainerRef} />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: currentPopper === 0 ? theme.zIndex.drawer + 2 : 0,
                }}
                ref={videoContainerRef}
            >
                {url !== '' ? (
                    <React.Fragment>
                        <ReactPlayer
                            url={url}
                            playing={process.env.NODE_ENV === 'production'}
                            muted
                            width='100%'
                            height='100%'
                            playsinline
                            controls
                            {...rest}
                        />
                    </React.Fragment>
                ) : (
                    <Grid
                        container
                        justifyContent='center'
                        alignContent='center'
                        width='100%'
                        height='100%'
                        style={{ backgroundColor: 'lightGrey' }}
                    >
                        <Typography>Prytaneum: A Crucial Tool for Democracy</Typography>
                    </Grid>
                )}
            </div>
        </div>
    );
}
