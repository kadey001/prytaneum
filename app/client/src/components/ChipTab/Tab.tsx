import * as React from 'react';
import { Tab as MUITab, TabProps } from '@mui/material';
import { lighten, darken, useTheme } from '@mui/material/styles';

interface Props {
    variant?: 'secondary' | 'primary';
}

function Tab(props: TabProps & Props) {
    const theme = useTheme();
    const { variant, ...restProps } = props;

    return (
        <MUITab
            style={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.pxToRem(13),
                height: 32, // material io spec for chips
                marginRight: theme.spacing(1),
                backgroundColor: theme.palette.grey[300],
                borderRadius: 24, // chip spec?
                border: '1px solid grey',
                minWidth: 'unset',
                minHeight: 'unset',
                color: variant === 'secondary' ? darken(theme.palette.primary.main, 0.9) : theme.palette.primary.main,
            }}
            sx={{
                '&.Mui-selected': {
                    transition: 'background-color 300ms ease-in-out',
                },
                backgroundColor:
                    variant === 'secondary'
                        ? lighten(theme.palette.primary.main, 0.7)
                        : lighten(theme.palette.primary.main, 0.65),
            }}
            {...restProps}
        />
    );
}

Tab.defaultProps = {
    variant: 'primary',
};

export default Tab;
