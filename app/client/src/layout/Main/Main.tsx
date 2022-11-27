/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';

import {
    Container as MUIContainer,
    ContainerProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = {
    children?: React.ReactNodeArray | React.ReactNode;
    spacing?: number;
} & Omit<ContainerProps, 'children'>;

const ContainerStyled = styled(MUIContainer)(() => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flex: '1 1 100%',
}));

const MainStyled = styled('main')(() => ({
    flex: '1 1 100%',
    position: 'relative',
}));

const Container = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { children, className, ...passThroughProps } = props;
    return (
        <ContainerStyled
            disableGutters
            maxWidth='lg'
            ref={ref}
            className={className}
            {...passThroughProps}
        >
            <MainStyled >{children}</MainStyled>
        </ContainerStyled>
    );
});

Container.defaultProps = {
    children: undefined,
    className: undefined,
};

Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    className: PropTypes.string,
};

export default Container;
