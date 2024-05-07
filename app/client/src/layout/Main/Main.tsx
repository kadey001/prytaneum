/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';

import { Container as MUIContainer, ContainerProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
    children?: React.ReactNodeArray | React.ReactNode;
    spacing?: number;
    disablePadding?: boolean;
} & Omit<ContainerProps, 'children'>;

const Container = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { children, disablePadding, ...passThroughProps } = props;
    const theme = useTheme();

    return (
        <MUIContainer
            disableGutters
            maxWidth={false}
            ref={ref}
            sx={{
                height: '100%',
                width: '100%',
                flex: '1 1 100%',
                display: 'flex',
                padding: !disablePadding && props.spacing ? theme.spacing(props.spacing) : 0,
                [theme.breakpoints.up('lg')]: {
                    maxWidth: '90%',
                },
            }}
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
