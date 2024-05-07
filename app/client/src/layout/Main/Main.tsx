/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';

import { Container as MUIContainer, ContainerProps, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
    children?: React.ReactNodeArray | React.ReactNode;
    spacing?: number;
    disablePadding?: boolean;
} & Omit<ContainerProps, 'children'>;

const Container = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { children, disablePadding, ...passThroughProps } = props;
    const theme = useTheme();
    const lgBreakpointUp = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <MUIContainer
            disableGutters
            maxWidth={false}
            ref={ref}
            sx={[
                {
                    height: '100%',
                    width: '100%',
                    flex: '1 1 100%',
                    display: 'flex',
                    padding: theme.spacing(props.spacing || 2),
                },
                lgBreakpointUp && { maxWidth: '100%' },
                Boolean(disablePadding) && { padding: 0 },
            ]}
            {...passThroughProps}
        >
            <main style={{ width: '100%', flex: '1 1 100%', position: 'relative' }}>{children}</main>
        </MUIContainer>
    );
});

Container.defaultProps = {
    children: undefined,
    className: undefined,
};

Container.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    className: PropTypes.string,
};

export default Container;
