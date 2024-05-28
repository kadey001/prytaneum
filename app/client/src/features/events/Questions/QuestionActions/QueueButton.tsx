import * as React from 'react';
import { graphql, useFragment } from 'react-relay';

import type { QueueButtonFragment$key } from '@local/__generated__/QueueButtonFragment.graphql';
import { EnqueueQuestionButton } from './EnqueueQuestionButton';
import { DequeueQuestionButton } from './DequeueQuestionButton';

export interface QueueButtonProps {
    fragmentRef: QueueButtonFragment$key;
}

export const QUEUE_BUTTON_FRAGMENT = graphql`
    fragment QueueButtonFragment on EventQuestion {
        id
        question
        position
        topics {
            topic
            position
        }
    }
`;

/**
 * Should only be used by moderators or when the user is a verified moderator
 */
export function QueueButton({ fragmentRef }: QueueButtonProps) {
    const { id: questionId, position, topics } = useFragment(QUEUE_BUTTON_FRAGMENT, fragmentRef);

    const isQueued = React.useMemo(() => {
        let _isQueued = false;
        if (position !== '-1') _isQueued = true;
        if (!topics) return _isQueued;
        topics.forEach((topic) => {
            if (topic.position !== '-1') _isQueued = true;
        });
        return _isQueued;
    }, [position, topics]);

    // TODO: add an animation for this using framer motion
    return isQueued ? (
        <div>
            <DequeueQuestionButton questionId={questionId} />
        </div>
    ) : (
        <div>
            <EnqueueQuestionButton questionId={questionId} />
        </div>
    );
}
