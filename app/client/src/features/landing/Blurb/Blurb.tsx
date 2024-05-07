import * as React from 'react';
import { Grid, Typography } from '@mui/material';

interface Props {
    title?: string;
    icon?: React.ReactNode;
    paragraphs?: string[];
    titleColor?: string;
    paragraphsColor?: string;
}

export function Blurb({ title, icon, paragraphs, titleColor, paragraphsColor }: Props) {
    return (
        <Grid
            item
            xs={12}
            sx={{ display: 'flex', flexDirection: 'column', gap: (theme) => theme.spacing(2), textAlign: 'center' }}
        >
            {title && (
                <Typography variant='h4' color={titleColor} fontSize='25px'>
                    {title}
                </Typography>
            )}
            {icon && (
                <Grid
                    item
                    container
                    sx={{
                        '& > *': {
                            fontSize: '5.5rem',
                        },
                    }}
                >
                    {icon}
                </Grid>
            )}
            {paragraphs?.map((paragraph, index) => (
                <Typography key={index} variant='body1' color={paragraphsColor} fontSize='18px'>
                    {paragraph}
                </Typography>
            ))}
        </Grid>
    );
}
