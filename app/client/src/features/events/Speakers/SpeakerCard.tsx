import * as React from 'react';
import { Card, CardHeader, CardContent, CardMedia } from '@mui/material';

export interface SpeakerCardProps {
    image: string;
    title: string;
    subtitle: string;
    description: string;
}

export function SpeakerCard({ image, title, subtitle, description }: SpeakerCardProps) {
    return (
        <Card style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxWidth: 400, maxHeight: 600 }}>
            <CardMedia
                sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 400, // to prevent image from overlapping card header/content
                    clipPath: (theme) => theme.custom.clipPath.slope,
                    flex: '1 0 100%',
                }}
                component='img'
                src={image}
            />
            <CardHeader style={{ flex: '1 0 100%' }} title={title} subheader={subtitle} />
            <CardContent style={{ flex: '1 0 100%' }}>{description}</CardContent>
        </Card>
    );
}
