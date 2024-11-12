/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import {
    Dialog,
    Avatar,
    ListItem,
    ListItemText,
    ListItemAvatar,
    List,
    Typography,
    Grid,
    Collapse,
    IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { graphql, useRefetchableFragment } from 'react-relay';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { SpeakerListFragment$key } from '@local/__generated__/SpeakerListFragment.graphql';
import { SpeakerCard } from './SpeakerCard';
import { useRefresh } from '@local/core';

interface SpeakerItemProps {
    className?: string;
    fragmentRef: SpeakerListFragment$key;
}

export const SPEAKER_LIST_FRAGMENT = graphql`
    fragment SpeakerListFragment on Event @refetchable(queryName: "SpeakerListRefetchQuery") {
        speakers {
            edges {
                node {
                    id
                    pictureUrl
                    name
                    description
                    title
                }
                cursor
            }
        }
    }
`;

export function SpeakerList({ fragmentRef, className }: SpeakerItemProps) {
    const theme = useTheme();
    const [data, refetch] = useRefetchableFragment(SPEAKER_LIST_FRAGMENT, fragmentRef);
    const { speakers } = data;

    const [openCard, setOpenCard] = React.useState(''); // use id instead to determine which dialog to open
    const [isIn, setIsIn] = React.useState(false);

    const REFRESH_INTERVAL = 30000; // 30 seconds
    const refresh = React.useCallback(() => {
        refetch({}, { fetchPolicy: 'store-and-network' });
    }, [refetch]);
    useRefresh({ refreshInterval: REFRESH_INTERVAL, callback: refresh });

    const speakerEdges = React.useMemo(() => speakers?.edges ?? [], [speakers]);

    const getIconTransform = () => {
        return isIn ? 'rotate(180deg)' : 'rotate(0deg)';
    };

    return (
        <React.Fragment>
            <Grid container alignItems='center' style={{ marginTop: theme.spacing(0.5), fontSize: '1.5rem' }}>
                <PeopleOutlineIcon fontSize='inherit' />
                {speakerEdges.length === 0 ? (
                    <Typography color='textSecondary' variant='body1' style={{ marginLeft: theme.spacing(2) }}>
                        No Speakers to display
                    </Typography>
                ) : (
                    <React.Fragment>
                        <Typography variant='h5' style={{ marginLeft: theme.spacing(2), fontWeight: 600 }}>
                            {speakerEdges.length} Speaker(s)
                        </Typography>
                        <IconButton
                            style={{
                                padding: theme.spacing(1),
                                transform: getIconTransform(),
                                transition: theme.transitions.create('transform', {
                                    duration: theme.transitions.duration.shortest,
                                }),
                            }}
                            aria-label='show more'
                            onClick={() => setIsIn((prev) => !prev)}
                            size='large'
                        >
                            <ArrowDropDownIcon style={{ fontSize: '1.5rem', color: 'black' }} />
                        </IconButton>
                    </React.Fragment>
                )}
            </Grid>
            <Collapse in={isIn}>
                <List className={className}>
                    {speakerEdges.map(({ node }) => (
                        <li key={node.id}>
                            <ListItem button onClick={() => setOpenCard(node.id)} style={{ padding: theme.spacing(1) }}>
                                {node.pictureUrl && (
                                    <ListItemAvatar>
                                        <Avatar alt={`${node.name}-avatar`} src={node.pictureUrl} />
                                    </ListItemAvatar>
                                )}
                                <ListItemText primary={node.name} secondary={node.title} />
                            </ListItem>
                            {node.pictureUrl && node.name && node.title && node.description && (
                                <Dialog open={openCard === node.id} onClose={() => setOpenCard('')}>
                                    <SpeakerCard
                                        image={node.pictureUrl}
                                        title={node.name}
                                        subtitle={node.title}
                                        description={node.description}
                                    />
                                </Dialog>
                            )}
                        </li>
                    ))}
                </List>
            </Collapse>
        </React.Fragment>
    );
}
