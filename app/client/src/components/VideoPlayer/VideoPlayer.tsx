import * as React from 'react';
import { Typography, Grid } from '@mui/material';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

export type VideoPlayerProps = ReactPlayerProps;

/** Displays the video stream that plays during the townhall
 *  @category Component
 *  @constructor VideoPlayer
 *  @param ReactPlayerProps
 *  @param {string | string[] | SourceProps[] | MediaStream} ReactPlayerProps.url URL
 *  @param {any} ReactPlayerProps.rest rest of props to pass to ReactPlayer
 */
export function VideoPlayer({ url, rest }: ReactPlayerProps) {
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%', // 16:9 Aspect Ratio (divide 9 by 16 = 0.5625)
            }}
        >
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
                {url !== '' ? (
                    <ReactPlayer
                        url={url}
                        playing={process.env.NODE_ENV === 'production'}
                        muted
                        width='100%'
                        height='100%'
                        playsinline
                        controls
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...rest}
                    />
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
