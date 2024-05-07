import * as React from 'react';
import { Typography, Grid, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export interface AccordionData {
    title: string;
    description: string;
    component: JSX.Element | ((b: boolean) => JSX.Element) | null;
}

interface Props {
    config: AccordionData[];
}

/**
 * Similar to SectionList, but does not use material UI list* and instead just uses the grid to display JSX elements passed in with a title and layout.
 * @category Component
 * @constructor SettingsMenu
 * @param Props
 * @param {AccordionData[]} config of the content
 */
export function SettingsMenu({ config }: Props) {
    const theme = useTheme();

    return (
        <div style={{ height: '100%', width: '100%' }}>
            {config.map(
                ({ title: sectionTitle, description, component }, idx) =>
                    component && (
                        <Grid container marginTop={theme.spacing(4)} key={sectionTitle}>
                            <Grid item xs={12} margin={theme.spacing(0, 0, 2, 0)}>
                                <Typography variant='h5'>{sectionTitle}</Typography>
                                <Typography variant='body2' color='textSecondary'>
                                    {description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {component}
                            </Grid>
                            {idx !== config.length - 1 && (
                                <Grid item xs={12}>
                                    <Divider style={{ marginTop: theme.spacing(2) }} />
                                </Grid>
                            )}
                        </Grid>
                    )
            )}
        </div>
    );
}
