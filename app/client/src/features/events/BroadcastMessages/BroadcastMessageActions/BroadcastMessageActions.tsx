import React from 'react';
import { CardActions, CardActionsProps } from '@mui/material';
import { graphql, useFragment } from 'react-relay';

import type { BroadcastMessageActionsFragment$key } from '@local/__generated__/BroadcastMessageActionsFragment.graphql';
import { DeleteBroadcastMessageButton } from './DeleteBroadcastMessageButton';
import { EditBroadcastMessageButton } from './EditBroadcastMessageButton';

const BROADCAST_MESSAGE_ACTIONS_FRAGMENT = graphql`
    fragment BroadcastMessageActionsFragment on EventBroadcastMessage {
        id
        ...DeleteBroadcastMessageButtonFragment
        ...EditBroadcastMessageButtonFragment
    }
`;

export type BroadcastMessageActionProps = {
    deleteEnabled?: boolean;
    editEnabled?: boolean;
    fragmentRef: BroadcastMessageActionsFragment$key;
} & CardActionsProps;

export function BroadcastMessageActions({
    deleteEnabled = false,
    editEnabled = false,
    fragmentRef,
    ...props
}: BroadcastMessageActionProps) {
    const data = useFragment(BROADCAST_MESSAGE_ACTIONS_FRAGMENT, fragmentRef);
    return (
        <CardActions {...props} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {deleteEnabled && <DeleteBroadcastMessageButton fragmentRef={data} />}
            {editEnabled && <EditBroadcastMessageButton fragmentRef={data} />}
        </CardActions>
    );
}
