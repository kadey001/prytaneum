/* eslint-disable @typescript-eslint/indent */
import * as React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Question } from './types';
import EventQuestion from './EventQuestion';

interface Props {
    question: Question;
    connections: string[];
    queueEnabled?: boolean;
    heldQuestion?: boolean;
}

export const SortableQuestion = ({ question, connections, queueEnabled = true, heldQuestion = false }: Props) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: question.id });
    const style = { transition, transform: CSS.Transform.toString(transform) };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{ ...style, padding: '0.5rem', width: '100%', borderRadius: '10px' }}
        >
            <EventQuestion
                question={question}
                connections={connections}
                deleteEnabled={false}
                queueEnabled={queueEnabled}
                heldQuestion={heldQuestion}
            />
        </div>
    );
};
