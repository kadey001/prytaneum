import { Paper, Grid, Typography, Divider, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { graphql, useFragment } from 'react-relay';

import type { EventProfileFragment$key } from '@local/__generated__/EventProfileFragment.graphql';

export interface EventProfileProps {
    fragmentRef: EventProfileFragment$key;
}

export const EVENT_PROFILE_FRAGMENT = graphql`
    fragment EventProfileFragment on Event {
        title
        topic
        description
        speakers {
            edges {
                node {
                    id
                    pictureUrl
                    name
                    title
                }
            }
        }
    }
`;

export function EventProfile({ fragmentRef }: EventProfileProps) {
    const theme = useTheme();
    const data = useFragment(EVENT_PROFILE_FRAGMENT, fragmentRef);

    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12} md={8}>
                <Grid
                    component={Paper}
                    padding={theme.spacing(3)}
                    sx={{
                        '& > *': {
                            marginBottom: theme.spacing(2),
                        },
                    }}
                >
                    <Grid item xs={12}>
                        <Typography variant='h4'>{data.title}</Typography>
                        <Typography color='textSecondary' paragraph>
                            {data.topic}
                        </Typography>
                        <Typography paragraph>{data.description}</Typography>
                    </Grid>
                    <Divider />
                    <Grid container item xs={12} justifyContent='center'>
                        <Button variant='contained' color='primary'>
                            I want to attend
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
