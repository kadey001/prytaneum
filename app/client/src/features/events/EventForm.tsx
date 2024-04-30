import * as React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { MobileDateTimePicker } from '@mui/lab';
import * as Yup from 'yup';

import { Form } from '@local/components';
import { useForm } from '@local/core';
import type { CreateEvent as FormType } from '@local/graphql-types';
import { FormActions } from '@local/components/FormActions';
import { FormContent } from '@local/components/FormContent';
import { FormTitle } from '@local/components/FormTitle';
import { EVENT_TITLE_MAX_LENGTH, EVENT_TOPIC_MAX_LENGTH, EVENT_DESCRIPTION_MAX_LENGTH } from '@local/utils/rules';

export interface EventFormProps {
    onSubmit: (event: TEventForm) => void;
    onCancel?: () => void;
    formType: 'Create' | 'Update';
    className?: string;
    title?: string;
    form?: TEventForm;
}

export type TEventForm = Omit<FormType, 'orgId'>;

// convenience type helper for the schema below it
type TSchema = {
    [key in keyof TEventForm]: Yup.AnySchema;
};
const validationSchema = Yup.object().shape<TSchema>({
    title: Yup.string()
        .max(EVENT_TITLE_MAX_LENGTH, `Title must be ${EVENT_TITLE_MAX_LENGTH} characters or less`)
        .required('Please enter a title'),
    description: Yup.string()
        .max(EVENT_DESCRIPTION_MAX_LENGTH, `Description must be ${EVENT_DESCRIPTION_MAX_LENGTH} characters or less`)
        .optional(),
    startDateTime: Yup.date()
        .max(Yup.ref('endDateTime'), 'Start date & time must be less than end date & time!')
        .required('Please enter a start date'),
    endDateTime: Yup.date()
        .min(Yup.ref('startDateTime'), 'End date & time must be greater than start date & time!')
        .required(),
    topic: Yup.string()
        .max(EVENT_TOPIC_MAX_LENGTH, `Topic must be ${EVENT_TOPIC_MAX_LENGTH} characters or less`)
        .required('Please enter a topic'),
});

const initialState: TEventForm = {
    title: '',
    description: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    topic: '',
};

export function EventForm({ onCancel, onSubmit, title, className, form, formType }: EventFormProps) {
    const [state, errors, handleSubmit, handleChange, setState] = useForm<TEventForm>(
        form || initialState,
        validationSchema
    );

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={className}>
            <FormTitle title={title || 'Event Form'} />
            <FormContent>
                <TextField
                    autoFocus
                    error={Boolean(errors.title)}
                    helperText={errors.title}
                    required
                    label='Title'
                    name='title'
                    value={state.title}
                    onChange={handleChange('title')}
                />
                <Typography
                    variant='caption'
                    color={state.title.length > EVENT_TITLE_MAX_LENGTH ? 'red' : 'black'}
                    sx={{
                        display: 'block',
                        textAlign: 'right',
                    }}
                >
                    {state.title.length}/{EVENT_TITLE_MAX_LENGTH}
                </Typography>
                <TextField
                    error={Boolean(errors.topic)}
                    helperText={errors.topic}
                    required
                    label='Topic'
                    name='topic'
                    value={state.topic}
                    onChange={handleChange('topic')}
                />
                <Typography
                    variant='caption'
                    color={state.topic.length > EVENT_TOPIC_MAX_LENGTH ? 'red' : 'black'}
                    sx={{
                        display: 'block',
                        textAlign: 'right',
                    }}
                >
                    {state.topic.length}/{EVENT_TOPIC_MAX_LENGTH}
                </Typography>
                <TextField
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                    label='Description'
                    name='description'
                    value={state.description}
                    onChange={handleChange('description')}
                />
                <Typography
                    variant='caption'
                    color={state.description.length > EVENT_DESCRIPTION_MAX_LENGTH ? 'red' : 'black'}
                    sx={{
                        display: 'block',
                        textAlign: 'right',
                    }}
                >
                    {state.description.length}/{EVENT_DESCRIPTION_MAX_LENGTH}
                </Typography>
                <MobileDateTimePicker
                    value={state.startDateTime}
                    onChange={(value) =>
                        setState((currentState) => ({ ...currentState, startDateTime: value || new Date() }))
                    }
                    renderInput={(innerProps) => (
                        <TextField
                            {...innerProps}
                            label='Start Date & Time'
                            name='startDateTime'
                            required
                            error={Boolean(errors.startDateTime)}
                            helperText={errors.startDateTime}
                        />
                    )}
                />
                <MobileDateTimePicker
                    value={state.endDateTime}
                    onChange={(value) =>
                        setState((currentState) => ({ ...currentState, endDateTime: value || new Date() }))
                    }
                    renderInput={(innerProps) => (
                        <TextField
                            {...innerProps}
                            label='End Date & Time'
                            name='endDateTime'
                            required
                            error={Boolean(errors.endDateTime)}
                            helperText={errors.endDateTime}
                        />
                    )}
                />
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                {onCancel && (
                    <Button color='primary' disableElevation onClick={onCancel}>
                        Cancel
                    </Button>
                )}

                <Button type='submit' variant='contained' color='primary'>
                    {formType}
                </Button>
            </FormActions>
        </Form>
    );
}
