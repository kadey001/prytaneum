import React, { useState } from 'react';
import {
    DndContext,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    UniqueIdentifier,
    DragOverEvent,
    DragOverlay,
    closestCorners,
    MouseSensor,
    KeyboardSensor,
    PointerSensor,
} from '@dnd-kit/core';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { arrayMove } from '@dnd-kit/sortable';
import { QuestionListContainer } from './QuestionListContainer';
import { SelectChangeEvent, Stack, Tab, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Node } from './EventLiveNewModeratorView';
import { useOnDeck } from './hooks/OnDeck/useOnDeck';
import type { Question, Topic } from './types';
import { StyledColumnGrid } from '@local/components/StyledColumnGrid';
import { SortableQuestion } from './SortableQuestion';
import { useDebounce } from '@local/core/useDebounce';
import { QuestionQueueContainer } from './QuestionQueueContainer';
import { CurrentQuestionCard } from '../Moderation/ManageQuestions/CurrentQuestionCard';
import { useTopicQueuePush } from './hooks/TopicQueue/useTopicQueuePush';
import { useTopicQueueRemove } from './hooks/TopicQueue/useTopicQueueRemove';
import { EventTopicContext } from './EventTopicContext';
import { StyledTabs } from '@local/components/StyledTabs';
import { OnDeckContainer } from './OnDeckContainer';
import { useQuestionModQueue } from './hooks/useQuestionModQueue';
import { useOnDeckEnqueued } from './hooks/OnDeck/useOnDeckEnqueued';
import { useOnDeckDequeued } from './hooks/OnDeck/useOnDeckDequeued';
import { Loader } from '@local/components';
import { useUpdateOnDeckPosition } from './hooks/OnDeck/useUpdateOnDeckPosition';
import { useUpdateTopicQueuePosition } from './hooks/TopicQueue/useUpdateTopicQueuePosition';
import { QuestionListSkeleton } from '@local/components/QuestionListSkeleton/QuestionListSkeleton';
import { useSnack } from '@local/core';
import { VerticalPanelResizeHandle } from '@local/components/PanelHandle';

type ItemsType = {
    topicQueue: Question[];
    onDeck: Question[];
};

interface QuestionModerationPanelsProps {
    node: Node;
    topics: readonly Topic[];
    refresh: () => void;
}

export function QuestionModerationPanels({ node, topics }: QuestionModerationPanelsProps) {
    const theme = useTheme();
    const xlUpBreakpoint = useMediaQuery(theme.breakpoints.up('xl'));
    const { displaySnack } = useSnack();
    const { id: eventId } = node;
    const [topic, setTopic] = useState<string>('default');
    const { queue, connections: queueConnections } = useQuestionModQueue({ fragmentRef: node, topic });
    const {
        enqueuedQuestions,
        connections: onDeckConnections,
        currentQuestionPosition,
    } = useOnDeck({ fragmentRef: node });
    const [previousContainer, setPreviousContainer] = useState<string | number | null>(null);
    const [items, setItems] = useState<ItemsType>({
        topicQueue: queue,
        onDeck: enqueuedQuestions,
    });
    const connections = React.useMemo(
        () => [...queueConnections, ...onDeckConnections],
        [queueConnections, onDeckConnections]
    );

    useTopicQueuePush({ eventId, topic, connections: queueConnections });
    useTopicQueueRemove({ eventId, topic, connections: queueConnections });
    const { updateTopicQueuePosition } = useUpdateTopicQueuePosition({ eventId, topic });
    const { addQuestionToOnDeck } = useOnDeckEnqueued({ connections: onDeckConnections, topics });
    const { removeFromOnDeck } = useOnDeckDequeued({ connections: onDeckConnections, topics, topic });

    const { updateOnDeckPosition } = useUpdateOnDeckPosition({ eventId });

    // TODO: Update to separate states to avoid unnecessary copies
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

    const allSortableQuestions = React.useMemo(() => {
        return [...queue, ...enqueuedQuestions];
    }, [queue, enqueuedQuestions]);

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10, // Need to move the mouse 10 pixels before the drag starts
        },
    });
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10, // Need to move the mouse 10 pixels before the drag starts
        },
    });
    const sensors = useSensors(pointerSensor, mouseSensor, useSensor(KeyboardSensor));

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

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const { id } = active;
        const activeContainer = findContainer(id);
        if (!activeContainer) {
            return displaySnack('Active container not found', { variant: 'error' });
        }
        setPreviousContainer(activeContainer);
        setActiveId(id);
    }

    function handleDragOver(event: DragOverEvent) {
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
                [activeContainer]: [...prev[activeContainer].filter((item) => item.id !== active.id)],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    items[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length),
                ],
            };
        });
    }

    // Debounce the drag over event to prevent too many state updates in a short period of time
    const handleDebouncedDragOver = useDebounce(handleDragOver, 250);

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
                        questionId: activeQuestion.id.toString(),
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
                        questionId: activeQuestion.id.toString(),
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
                    eventId,
                    questionId: activeQuestion.id.toString(),
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
                removeFromOnDeck({
                    eventId,
                    list: updatedTopicQueue,
                    questionId: activeQuestion.id.toString(),
                    movedQuestionIndex: overIndex,
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
            eventId,
            removeFromOnDeck,
        ]
    );

    function handleChange(event: SelectChangeEvent<typeof topic>) {
        event.preventDefault();
        setTopic(event.target.value as string);
    }

    const heldQuestion = React.useMemo(() => {
        if (activeId) return allSortableQuestions.find((question) => question.id === activeId);
        return undefined;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeId]);

    if (!topics) return <Loader />;

    return (
        <EventTopicContext.Provider value={{ topic }}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDebouncedDragOver}
                onDragEnd={handleDragEnd}
                autoScroll={{ layoutShiftCompensation: false }}
            >
                <DragOverlay>
                    {activeId && heldQuestion ? (
                        <SortableQuestion
                            question={heldQuestion}
                            connections={[]}
                            queueEnabled={false}
                            heldQuestion={true}
                        />
                    ) : null}
                </DragOverlay>
                <PanelGroup autoSaveId='question-mod-panels' direction='horizontal'>
                    <Panel defaultSize={33} minSize={25} maxSize={50}>
                        <Stack direction='column' alignItems='center' height='100%' width='100%'>
                            <StyledTabs value='Question List'>
                                <Tab label='Question List' value='Question List' />
                            </StyledTabs>
                            <StyledColumnGrid
                                props={{
                                    id: 'scrollable-tab',
                                    display: 'flex',
                                    flexGrow: 1,
                                    width: '100%',
                                    height: '100%',
                                    padding: 0,
                                }}
                                scrollable={false}
                            >
                                <React.Suspense fallback={<QuestionListSkeleton xlUpBreakpoint={xlUpBreakpoint} />}>
                                    <QuestionListContainer
                                        fragmentRef={node}
                                        isVisible={true}
                                        topic={topic}
                                        handleTopicChange={handleChange}
                                        connections={connections}
                                        topics={topics}
                                    />
                                </React.Suspense>
                            </StyledColumnGrid>
                        </Stack>
                    </Panel>
                    <VerticalPanelResizeHandle />
                    <Panel defaultSize={33} minSize={25} maxSize={50}>
                        <Stack direction='column' alignItems='center' height='100%' width='100%'>
                            <StyledTabs value='Topic Queue'>
                                <Tab label='Topic Queue' value='Topic Queue' />
                            </StyledTabs>
                            <StyledColumnGrid
                                props={{
                                    id: 'scrollable-tab',
                                    display: 'flex',
                                    flexGrow: 1,
                                    width: '100%',
                                    height: '100%',
                                    padding: 0,
                                }}
                                scrollable={true}
                            >
                                <React.Suspense fallback={<Loader />}>
                                    <QuestionQueueContainer
                                        id='topicQueue'
                                        questions={items.topicQueue}
                                        topic={topic}
                                    />
                                </React.Suspense>
                            </StyledColumnGrid>
                        </Stack>
                    </Panel>
                    <VerticalPanelResizeHandle />
                    <Panel defaultSize={33} minSize={25} maxSize={50}>
                        <Stack direction='column' alignItems='center' height='100%' width='100%'>
                            <CurrentQuestionCard isViewerModerator={true} fragmentRef={node} />
                            <StyledTabs value='On Deck'>
                                <Tab label='On Deck' value='On Deck' />
                            </StyledTabs>
                            <StyledColumnGrid
                                props={{
                                    id: 'scrollable-tab',
                                    display: 'flex',
                                    flexGrow: 1,
                                    width: '100%',
                                    height: '100%',
                                    maxWidth: '100%',
                                    padding: 0,
                                }}
                                scrollable={true}
                            >
                                <React.Suspense fallback={<Loader />}>
                                    <OnDeckContainer id='onDeck' questions={items.onDeck} connections={connections} />
                                </React.Suspense>
                            </StyledColumnGrid>
                        </Stack>
                    </Panel>
                </PanelGroup>
            </DndContext>
        </EventTopicContext.Provider>
    );
}
