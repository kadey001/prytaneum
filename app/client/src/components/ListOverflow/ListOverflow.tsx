import React, { Fragment } from 'react';
import { List, Divider, Typography } from '@mui/material';

import ListCell from './ListCell';

export interface Props {
    rowProps: Array<{
        _id: string | number;
        primary: string;
        secondary?: string;
    }>;
    emptyMessage?: string;
}

const ListOverflow = ({ rowProps, emptyMessage }: Props) => {
    if (rowProps.length === 0) {
        return <Typography>{emptyMessage}</Typography>;
    }

    const structuredUserList = rowProps.map((row) => (
        <Fragment key={row._id}>
            <ListCell primary={row.primary} secondary={row.secondary} />
            <li>
                <Divider />
            </li>
        </Fragment>
    ));

    return (
        <List
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: (theme) => theme.palette.background.paper,
                overflow: 'auto',
            }}
        >
            {structuredUserList}
        </List>
    );
};

export default ListOverflow;
