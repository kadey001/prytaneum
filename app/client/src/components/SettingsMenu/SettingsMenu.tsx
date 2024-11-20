import * as React from 'react';
import { Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (e: React.SyntheticEvent, newExpanded: boolean) => {
        e.preventDefault();
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <React.Fragment>
            {config.map(
                ({ title: sectionTitle, description, component }, idx) =>
                    component && (
                        <Accordion
                            key={idx}
                            expanded={expanded === `panel-${sectionTitle}`}
                            onChange={handleChange(`panel-${sectionTitle}`)}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${sectionTitle}`}>
                                <Typography variant='h5'>{sectionTitle}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                    sx={{ transform: 'translate(0,-12px)', zIndex: 100 }}
                                >
                                    {description}
                                </Typography>
                                <Grid item xs={12}>
                                    {component}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    )
            )}
        </React.Fragment>
    );
}
