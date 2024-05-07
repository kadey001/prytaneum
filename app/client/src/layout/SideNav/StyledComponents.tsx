/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
    ListItemButton,
    ListItemIcon,
    ListSubheader,
    ListSubheaderProps,
    Divider,
    ListItemIconProps,
    DividerProps,
    ListItemButtonProps,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const StyledListItem = (props: ListItemButtonProps) => {
    return (
        <ListItemButton
            sx={[
                { color: 'black', borderRadius: (theme) => theme.custom.borderRadius },
                {
                    '&.MuiListItemIcon-root': {
                        color: (theme) => theme.palette.secondary.contrastText,
                    },
                },
            ]}
            {...props}
        />
    );
};

export const StyledListItemIcon = (props: ListItemIconProps) => {
    return <ListItemIcon sx={{ color: 'inherit' }} {...props} />;
};

export const StyledDivider = (props: DividerProps) => {
    return <Divider sx={{ marginBottom: (theme) => theme.spacing(1) }} {...props} />;
};

export const StyledSubheader = (props: ListSubheaderProps<'div'>) => {
    const theme = useTheme();
    return (
        <ListSubheader
            disableSticky
            component='div'
            sx={{ ...theme.typography.overline, fontSize: '1.25em' }}
            {...props}
        />
    );
};
