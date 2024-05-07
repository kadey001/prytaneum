import * as React from 'react';

import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

export interface Props {
    primary: string;
    secondary?: string;
    avatar?: string;
}
// FIXME:
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ListCell = ({ primary, secondary, avatar }: Props) => (
    <li>
        <ListItem button>
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
    </li>
);

export default ListCell;
