import * as React from 'react';
import { Typography, Stack, Box, Grid } from '@mui/material';
import { Question } from './types';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { SortableQuestion } from './SortableQuestion';

interface Props {
    id: UniqueIdentifier;
    questions: Question[];
    connections: string[];
}

// TODO: Fix the workaround height issue
export function OnDeckContainer({ id, questions, connections }: Props) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <Stack direction='column' maxHeight={0}>
            {questions.length === 0 && (
                <Grid container paddingRight={1}>
                    <Box
                        ref={setNodeRef}
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            width: '100%',
                            minHeight: '250px',
                            maxHeight: '100%',
                            borderRadius: 1,
                            bgcolor: (theme) => theme.palette.grey[300],
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem',
                            borderWidth: 3,
                            borderColor: (theme) => theme.palette.grey[500],
                            borderStyle: 'dashed',
                        }}
                    >
                        <Typography align='center' variant='body1' marginTop='1rem'>
                            Drag and drop questions from the topic queue to here to start the On Deck Queue.
                        </Typography>
                    </Box>
                </Grid>
            )}
            <SortableContext id={id as string} items={questions} strategy={verticalListSortingStrategy}>
                {questions.length > 0 &&
                    questions.map((question) => (
                        <SortableQuestion
                            key={question.id}
                            question={question}
                            connections={connections}
                            queueEnabled={false}
                        />
                    ))}
            </SortableContext>
        </Stack>
    );
}
