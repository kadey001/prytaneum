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
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { arrayMove } from '@dnd-kit/sortable';
import { QuestionListContainer } from './QuestionListContainer';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Tab } from '@mui/material';
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
    const { id: eventId } = node;
    const [topic, setTopic] = useState<string>('default');
    const { queue, connections: queueConnections } = useQuestionModQueue({ fragmentRef: node, topic });
    const { enqueuedQuestions, connections: onDeckConnections } = useOnDeck({ fragmentRef: node });
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

    function findContainer(id: UniqueIdentifier) {
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
    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const { id } = active;
        const activeContainer = findContainer(id);
        if (!activeContainer) {
            throw new Error('No active container found.');
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

    function handleDragEnd(event: DragEndEvent) {
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

        if (activeIndex !== overIndex) {
            setItems((_items) => ({
                ..._items,
                [overContainer]: arrayMove(_items[overContainer], activeIndex, overIndex),
            }));
        }

        const activeQuestion = items[activeContainer][activeIndex];

        if (previousContainer === overContainer) {
            // TODO: If onDeck, handle reordering onDeck
            if (activeContainer === 'onDeck') {
                console.log('Reordering onDeck');
                const minPosition = parseInt(activeQuestion.onDeckPosition || '0');
                updateOnDeckPosition({
                    questionId: id.toString(),
                    list: items.onDeck,
                    sourceIdx: activeIndex,
                    destinationIdx: overIndex,
                    minPosition,
                });
            }
            if (activeContainer === 'topicQueue') {
                console.log('Reordering topic queue');
            }
            // TODO: Otherwise, handle reordering topic queue
        }

        // Moving questions from topic queue to onDeck
        if (activeContainer === 'onDeck' && previousContainer === 'topicQueue') {
            addQuestionToOnDeck({
                eventId,
                questionId: activeQuestion.id.toString(),
                list: items.onDeck,
                movedQuestionIndex: overIndex,
                cursor: activeQuestion.cursor,
            });
        }

        // Moving questions from onDeck to topic queue
        if (activeContainer === 'topicQueue' && previousContainer === 'onDeck') {
            removeFromOnDeck({
                eventId,
                list: items.topicQueue,
                questionId: activeQuestion.id.toString(),
                movedQuestionIndex: overIndex,
            });
        }

        // Cleanup the state
        setActiveId(null);
        setPreviousContainer(null);
    }

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
                    {activeId && heldQuestion ? <SortableQuestion question={heldQuestion} connections={[]} /> : null}
                </DragOverlay>
                <PanelGroup autoSaveId='question-mod-panels' direction='horizontal'>
                    <Panel defaultSize={33} minSize={25} maxSize={50} style={{ paddingTop: '1rem' }}>
                        <Grid container justifyContent='center'>
                            <FormControl sx={{ width: '95%', marginBottom: '0.5rem' }}>
                                <InputLabel id='topic-select-label'>Topic</InputLabel>
                                <Select
                                    labelId='topic-select-label'
                                    id='topic-select'
                                    value={topic}
                                    label='Topic'
                                    onChange={handleChange}
                                >
                                    <MenuItem value='default'>Default</MenuItem>
                                    {topics.map((_topic) => (
                                        <MenuItem key={_topic.id} value={_topic.topic}>
                                            {_topic.topic}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <StyledColumnGrid
                            props={{
                                id: 'scrollable-tab',
                                display: 'flex',
                                flexGrow: 1,
                                width: '98%',
                                height: '100%',
                                padding: 0,
                                paddingBottom: '3rem',
                            }}
                            scrollable={false}
                        >
                            <QuestionListContainer
                                fragmentRef={node}
                                isVisible={true}
                                topic={topic}
                                connections={connections}
                                topics={topics}
                            />
                        </StyledColumnGrid>
                    </Panel>
                    <PanelResizeHandle />
                    <Panel defaultSize={33} minSize={25} maxSize={50}>
                        <StyledTabs value='Topic Queue'>
                            <Tab label='Topic Queue' value='Topic Queue' />
                        </StyledTabs>
                        <StyledColumnGrid
                            props={{
                                id: 'scrollable-tab',
                                display: 'flex',
                                flexGrow: 1,
                                width: '98%',
                                height: '96%',
                                padding: 0,
                                // paddingBottom: '48px',
                            }}
                            scrollable={true}
                        >
                            <QuestionQueueContainer id='topicQueue' questions={items.topicQueue} topic={topic} />
                        </StyledColumnGrid>
                    </Panel>
                    <PanelResizeHandle />
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
                                    width: '98%',
                                    height: '100%',
                                    maxWidth: '100%',
                                    padding: 0,
                                }}
                                scrollable={true}
                            >
                                <OnDeckContainer id='onDeck' questions={items.onDeck} connections={connections} />
                            </StyledColumnGrid>
                        </Stack>
                    </Panel>
                </PanelGroup>
            </DndContext>
        </EventTopicContext.Provider>
    );
}
