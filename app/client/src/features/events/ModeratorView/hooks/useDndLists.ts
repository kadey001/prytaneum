import React, { useState } from 'react';
import {
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    UniqueIdentifier,
    DragOverEvent,
    MouseSensor,
    KeyboardSensor,
    PointerSensor,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { useSnack } from '@local/core/useSnack';
import { useOnDeck } from './OnDeck/useOnDeck';
import { useTopicQueuePush } from './TopicQueue/useTopicQueuePush';
import { useTopicQueueRemove } from './TopicQueue/useTopicQueueRemove';
import { useQuestionModQueue } from './useQuestionModQueue';
import { useOnDeckEnqueued } from './OnDeck/useOnDeckEnqueued';
import { useOnDeckDequeued } from './OnDeck/useOnDeckDequeued';
import { useUpdateOnDeckPosition } from './OnDeck/useUpdateOnDeckPosition';
import { useUpdateTopicQueuePosition } from './TopicQueue/useUpdateTopicQueuePosition';
import { Question, Topic } from '../types';

type ItemsType = {
    topicQueue: Question[];
    onDeck: Question[];
};

interface Props {
    node: any;
    topic: string;
    topics: readonly Topic[];
}

export function useDndLists({ node, topic, topics }: Props) {
    const { id: eventId } = node;

    // -- Hooks --
    const { displaySnack } = useSnack();
    const { queue, connections: queueConnections } = useQuestionModQueue({ fragmentRef: node, topic });
    const {
        enqueuedQuestions,
        questionRecord,
        connections: onDeckConnections,
        currentQuestionPosition,
    } = useOnDeck({ fragmentRef: node });

    // -- Relay Mutation/Subscription hooks --
    useTopicQueuePush({ eventId, topic, connections: queueConnections });
    useTopicQueueRemove({ eventId, topic, connections: queueConnections });

    const { updateTopicQueuePosition } = useUpdateTopicQueuePosition({ eventId, topic });
    const { addQuestionToOnDeck } = useOnDeckEnqueued({ connections: onDeckConnections, topics, topic });
    const { removeFromOnDeck } = useOnDeckDequeued({ connections: onDeckConnections, topics, topic });
    const { updateOnDeckPosition } = useUpdateOnDeckPosition({ eventId });

    // -- State --
    const [previousContainer, setPreviousContainer] = useState<string | number | null>(null);
    const [items, setItems] = useState<ItemsType>({
        topicQueue: queue,
        onDeck: enqueuedQuestions,
    });

    React.useEffect(() => {
        setItems((prev) => {
            return {
                ...prev,
                topicQueue: queue,
            };
        });
    }, [queue]);

    React.useEffect(() => {
        setItems((prev) => {
            return {
                ...prev,
                onDeck: enqueuedQuestions,
            };
        });
    }, [enqueuedQuestions]);

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    // Store the previous items to revert back if moving between lists fails
    const [previousItems, setPreviousItems] = useState<ItemsType>(items);

    const allSortableQuestions = React.useMemo(() => {
        return [...queue, ...enqueuedQuestions];
    }, [queue, enqueuedQuestions]);

    const findContainer = React.useCallback(
        (id: UniqueIdentifier) => {
            for (let i = 0; i < Object.keys(items).length; i++) {
                const key = Object.keys(items)[i] as keyof ItemsType;
                if (key === id) return id;
                const _questions = items[key];
                const found = _questions.find((question) => question.id === id);
                if (found) {
                    return key as keyof ItemsType;
                }
            }
            return null;
        },
        [items]
    );

    const handleDragStart = React.useCallback(
        (event: DragStartEvent) => {
            const { active } = event;
            const { id } = active;
            const activeContainer = findContainer(id);
            if (!activeContainer) {
                return displaySnack('Active container not found', { variant: 'error' });
            }
            setPreviousContainer(activeContainer);
            setActiveId(id);
            setPreviousItems(items);
        },
        [findContainer, items, displaySnack]
    );

    const handleDragOver = React.useCallback(
        (event: DragOverEvent) => {
            const { active, over } = event;
            const { id } = active;
            if (!over) {
                return;
            }
            const { id: overId } = over;
            // Find the containers
            const activeContainer = findContainer(id);
            const overContainer = findContainer(overId);
            if (!activeContainer || !overContainer || activeContainer === overContainer) {
                return;
            }
            setItems((prev) => {
                const activeItems = prev[activeContainer];
                const overItems = prev[overContainer];
                // Find the indexes for the items
                const activeIndex = activeItems.findIndex((question) => question.id === id);
                const overIndex = overItems.findIndex((question) => question.id === overId);
                let newIndex;
                if (overId in prev) {
                    // We're at the root droppable of a container
                    newIndex = overItems.length + 1;
                } else {
                    const isBelowLastItem = over && overIndex === overItems.length - 1;
                    const modifier = isBelowLastItem ? 1 : 0;
                    newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
                }

                return {
                    ...prev,
                    [activeContainer]: [...prev[activeContainer].filter((_question) => _question.id !== active.id)],
                    [overContainer]: [
                        ...prev[overContainer].slice(0, newIndex),
                        items[activeContainer][activeIndex],
                        ...prev[overContainer].slice(newIndex, prev[overContainer].length),
                    ],
                };
            });
        },
        [findContainer, items]
    );

    const handleDragEnd = React.useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;
            const { id } = active;
            if (!over) return;
            const { id: overId } = over;

            // Since the lists are changed by onDragOver, the active and over containers are the same
            // We can use previousContainer to find the original container the item came from
            const activeContainer = findContainer(id);
            const overContainer = findContainer(overId);

            if (!activeContainer || !overContainer || activeContainer !== overContainer) {
                return;
            }

            const activeIndex = items[activeContainer].findIndex((question) => question.id === id);
            const overIndex = items[overContainer].findIndex((question) => question.id === overId);
            const activeQuestion = items[activeContainer][activeIndex];

            if (previousContainer === overContainer) {
                if (activeContainer === 'onDeck') {
                    // Update the onDeck position before calculating the new position
                    // This way we know the destination index is correctly pointing to the moved question
                    // This consistancy is key to always properly calculating the new position
                    const onDeck = items.onDeck;
                    const updatedOnDeck = arrayMove(onDeck, activeIndex, overIndex);
                    updateOnDeckPosition({
                        question: activeQuestion,
                        list: updatedOnDeck,
                        sourceIdx: activeIndex,
                        destinationIdx: overIndex,
                        currentQuestionPosition,
                    });
                }
                if (activeContainer === 'topicQueue') {
                    // Update the topic queue position before calculating the new position
                    const topicQueue = items.topicQueue;
                    const updatedTopicQueue = arrayMove(topicQueue, activeIndex, overIndex);
                    updateTopicQueuePosition({
                        question: activeQuestion,
                        list: updatedTopicQueue,
                        sourceIdx: activeIndex,
                        destinationIdx: overIndex,
                        currentQuestionPosition,
                        currentTopic: topic,
                    });
                }
            }

            // Moving questions from topic queue to onDeck
            if (activeContainer === 'onDeck' && previousContainer === 'topicQueue') {
                // Update the onDeck position before calculating the new position
                // This way we know the destination index is correctly pointing to the moved question
                // This consistancy is key to always properly calculating the new position
                const onDeck = items.onDeck;
                const updatedOnDeck = arrayMove(onDeck, activeIndex, overIndex);
                addQuestionToOnDeck({
                    question: activeQuestion,
                    list: updatedOnDeck,
                    movedQuestionIndex: overIndex,
                    cursor: activeQuestion.cursor,
                    currentQuestionPosition,
                });
            }

            // Moving questions from onDeck to topic queue
            if (activeContainer === 'topicQueue' && previousContainer === 'onDeck') {
                // Update the topic queue position before calculating the new position
                // This way we know the destination index is correctly pointing to the moved question
                // This consistancy is key to always properly calculating the new position
                const topicQueue = items.topicQueue;
                const updatedTopicQueue = arrayMove(topicQueue, activeIndex, overIndex);
                const revertChange = () => {
                    setItems(previousItems);
                };
                removeFromOnDeck({
                    question: activeQuestion,
                    list: updatedTopicQueue,
                    movedQuestionIndex: overIndex,
                    revertChange,
                });
            }

            // Cleanup the state
            setActiveId(null);
            setPreviousContainer(null);
        },
        [
            findContainer,
            items,
            previousContainer,
            updateOnDeckPosition,
            currentQuestionPosition,
            updateTopicQueuePosition,
            topic,
            addQuestionToOnDeck,
            removeFromOnDeck,
            previousItems,
        ]
    );

    const heldQuestion = React.useMemo(() => {
        if (activeId) return allSortableQuestions.find((question) => question.id === activeId);
        return undefined;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeId]);

    // -- Memoized connections --
    const connections = React.useMemo(
        () => [...queueConnections, ...onDeckConnections],
        [queueConnections, onDeckConnections]
    );

    // -- Memoized draggable lists --
    const onDeckQuestions = React.useMemo(() => items.onDeck, [items.onDeck]);
    const topicQueueQuestions = React.useMemo(() => items.topicQueue, [items.topicQueue]);

    // -- Sensors --
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10, // Need to move the mouse 10 pixels before the drag starts
            delay: 150, // Delay the drag start by 250ms
            tolerance: 5, // Allow for some movement in the pointer
        },
    });
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10, // Need to move the mouse 10 pixels before the drag starts
            delay: 150, // Delay the drag start by 250ms
            tolerance: 5, // Allow for some movement in the pointer
        },
    });
    const sensors = useSensors(pointerSensor, mouseSensor, useSensor(KeyboardSensor));

    return {
        items,
        activeId,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        heldQuestion,
        onDeckQuestions,
        topicQueueQuestions,
        questionRecord,
        connections,
        sensors,
    };
}
