import * as React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import { Typography, Grid, useMediaQuery } from '@mui/material';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { DefaultTheme } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    outerContainer: {
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 Aspect Ratio (divide 9 by 16 = 0.5625)
    },
    innerContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    placeholder: {
        width: '100%',
        height: '100%',
        backgroundColor: 'lightGrey',
    },
    moderatorPlaceholder: {
        [theme.breakpoints.up('md')]: {
            width: '35%',
            height: '35%',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            height: '100%',
        },
        backgroundColor: 'lightGrey',
    },
}));

export type VideoPlayerProps = ReactPlayerProps;

/** Displays the video stream that plays during the townhall
 *  @category Component
 *  @constructor VideoPlayer
 *  @param ReactPlayerProps
 *  @param {string | string[] | SourceProps[] | MediaStream} ReactPlayerProps.url URL
 *  @param {boolean} isModerator
 *  @param {any} ReactPlayerProps.rest rest of props to pass to ReactPlayer
 */
export function VideoPlayer({ url, isModerator, rest }: ReactPlayerProps & { isModerator: boolean }) {
    const classes = useStyles();
    const matches = useMediaQuery((theme: DefaultTheme) => theme.breakpoints.up('md'));

    const getVideoSize = () => {
        if (isModerator) {
            return matches ? '35%' : '100%';
        }
        return '100%';
    };

    return (
        <div className={classes.outerContainer}>
            <div className={classes.innerContainer}>
                {url !== '' ? (
                    <ReactPlayer
                        url={url}
                        playing={process.env.NODE_ENV === 'production'}
                        width={getVideoSize()}
                        height={getVideoSize()}
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
                        className={isModerator ? classes.moderatorPlaceholder : classes.placeholder}
                    >
                        <Typography>Prytaneum: A Crucial Tool for Democracy</Typography>
                    </Grid>
                )}
            </div>
        </div>
    );
}

VideoPlayer.propTypes = {
    url: PropTypes.string.isRequired,
};
