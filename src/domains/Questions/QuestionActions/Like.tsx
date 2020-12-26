import React from 'react';
import { Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import useEndpoint from 'hooks/useEndpoint';
import LoadingButton from 'components/LoadingButton';
import { createLike, deleteLike } from '../api';

interface Props {
    townhallId: string;
    questionId: string;
    onLike: () => void;
    className?: string;
    liked?: boolean;
}

export default function Like({
    className,
    questionId,
    townhallId,
    liked,
    onLike,
}: Props) {
    const apiFnMemo = React.useMemo(() => {
        if (liked) return deleteLike;
        return createLike;
    }, [liked]);
    const apiFn = React.useCallback(() => apiFnMemo(townhallId, questionId), [
        townhallId,
        questionId,
        apiFnMemo,
    ]);
    const [run, isLoading] = useEndpoint(apiFn, { onSuccess: onLike });

    return (
        <LoadingButton loading={isLoading}>
            <Button
                color={liked ? 'secondary' : 'inherit'}
                onClick={run}
                endIcon={<ThumbUpIcon fontSize='small' />}
                fullWidth
                className={className}
            >
                Like
            </Button>
        </LoadingButton>
    );
}

Like.defaultProps = {
    className: undefined,
    liked: false,
};
