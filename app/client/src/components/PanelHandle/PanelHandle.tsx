import React from 'react';
import { Grid, Divider } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { PanelResizeHandle } from 'react-resizable-panels';

interface VerticalPanelResizeHandleProps {
    alternateIcon?: React.ReactNode;
}

export function VerticalPanelResizeHandle({ alternateIcon }: VerticalPanelResizeHandleProps) {
    return (
        <PanelResizeHandle>
            <Grid container justifyContent='center' alignItems='center' height='100%'>
                <Grid container justifyContent='center' height='75%' width='1rem'>
                    <Divider orientation='vertical' variant='middle'>
                        {alternateIcon ? (
                            alternateIcon
                        ) : (
                            <DragHandleIcon
                                sx={{
                                    transform: 'rotate(90deg)',
                                    color: (theme) => theme.palette.grey[300],
                                }}
                            />
                        )}
                    </Divider>
                </Grid>
            </Grid>
        </PanelResizeHandle>
    );
}

interface HorizontalPanelResizeHandleProps {
    alternateIcon?: React.ReactNode;
}

export function HorizontalResizeHandle({ alternateIcon }: HorizontalPanelResizeHandleProps) {
    return (
        <PanelResizeHandle>
            <Divider sx={{ width: '100%', height: '0.5rem', transform: 'translateY(-0.5rem)' }}>
                {alternateIcon ? (
                    { alternateIcon }
                ) : (
                    <DragHandleIcon
                        sx={{
                            transform: 'translateY(-0.5rem)',
                            color: (theme) => theme.palette.grey[300],
                        }}
                    />
                )}
            </Divider>
        </PanelResizeHandle>
    );
}
