import * as React from 'react';
import {
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Typography,
    useMediaQuery,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import { MobileDateTimePicker, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { DateTimeValidationError } from '@mui/x-date-pickers/models';
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [startDateError, setStartDateError] = React.useState<DateTimeValidationError | null>(null);
    const [endDateError, setEndDateError] = React.useState<DateTimeValidationError | null>(null);
    const [state, errors, handleSubmit, handleChange, setState] = useForm<TEventForm>(
        form || initialState,
        validationSchema
    );

    const startDateErrorMessage = React.useMemo(() => {
        switch (startDateError) {
            case 'maxDate':
                return 'Start date must be less than end date & time!';
            case 'maxTime':
                return 'Start time must be less than end date & time!';
            case 'minDate':
                return 'Please select a date that is now or in the future';
            case 'minTime':
                return 'Please select a time that is now or in the future';
            case 'invalidDate':
                return 'Your date is not valid';
            default:
                return '';
        }
    }, [startDateError]);

    const endDateErrorMessage = React.useMemo(() => {
        switch (endDateError) {
            case 'minDate':
                return 'End date must be greater than start date & time!';
            case 'minTime':
                return 'End time must be greater than start date & time!';
            case 'invalidDate':
                return 'Your date is not valid';

            default:
                return '';
        }
    }, [endDateError]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className={className}>
            <FormTitle title={title || 'Event Form'} />
            <FormContent>
                <FormControl required error={Boolean(errors.title)} fullWidth variant='outlined'>
                    <InputLabel>Title</InputLabel>
                    <OutlinedInput
                        id='event-title-input'
                        label='Title'
                        name='title'
                        error={Boolean(errors.title)}
                        value={state.title}
                        onChange={handleChange('title')}
                        endAdornment={
                            <InputAdornment position='end'>
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
                            </InputAdornment>
                        }
                        aria-describedby='event-title-input'
                        aria-label='event title input'
                    />
                    <FormHelperText style={{ color: 'red' }}>{errors.title}</FormHelperText>
                </FormControl>
                <FormControl required error={Boolean(errors.topic)} fullWidth variant='outlined'>
                    <InputLabel>Topic</InputLabel>
                    <OutlinedInput
                        id='event-topic-input'
                        label='Topic'
                        name='topic'
                        value={state.topic}
                        onChange={handleChange('topic')}
                        endAdornment={
                            <InputAdornment position='end'>
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
                            </InputAdornment>
                        }
                        aria-describedby='event-topic-input'
                        aria-label='event topic input'
                    />
                    <FormHelperText style={{ color: 'red' }}>{errors.topic}</FormHelperText>
                </FormControl>
                <FormControl error={Boolean(errors.description)} fullWidth variant='outlined'>
                    <InputLabel>Description</InputLabel>
                    <OutlinedInput
                        id='event-description-input'
                        label='Description'
                        name='description'
                        value={state.description}
                        onChange={handleChange('description')}
                        endAdornment={
                            <InputAdornment position='end'>
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
                            </InputAdornment>
                        }
                        aria-describedby='event-description-input'
                        aria-label='event description input'
                    />
                    <FormHelperText style={{ color: 'red' }}>{errors.description}</FormHelperText>
                </FormControl>
                {isMobile && (
                    <React.Fragment>
                        <Typography variant='caption'>Start Date & Time</Typography>
                        <MobileDateTimePicker
                            value={state.startDateTime}
                            onChange={(value) =>
                                setState((currentState) => ({ ...currentState, startDateTime: value || new Date() }))
                            }
                            disablePast={true}
                            maxDate={state.endDateTime}
                        />
                        <div style={{ height: theme.spacing(2) }} />
                        <Typography variant='caption'>End Date & Time</Typography>
                        <MobileDateTimePicker
                            value={state.endDateTime}
                            onChange={(value) =>
                                setState((currentState) => ({ ...currentState, endDateTime: value || new Date() }))
                            }
                            minDate={state.startDateTime}
                        />
                    </React.Fragment>
                )}
                {!isMobile && (
                    <React.Fragment>
                        <Typography variant='caption'>Start Date & Time</Typography>
                        <DesktopDateTimePicker
                            value={state.startDateTime}
                            onChange={(value) =>
                                setState((currentState) => ({ ...currentState, startDateTime: value || new Date() }))
                            }
                            onError={(error) => setStartDateError(error)}
                            slotProps={{
                                textField: { placeholder: 'Start Date & Time', helperText: startDateErrorMessage },
                            }}
                        />
                        <div style={{ height: theme.spacing(2) }} />
                        <Typography variant='caption'>End Date & Time</Typography>
                        <DesktopDateTimePicker
                            value={state.endDateTime}
                            onChange={(value) =>
                                setState((currentState) => ({ ...currentState, endDateTime: value || new Date() }))
                            }
                            onError={(error) => setEndDateError(error)}
                            minDateTime={state.startDateTime}
                            slotProps={{
                                textField: { placeholder: 'End Date & Time', helperText: endDateErrorMessage },
                            }}
                        />
                    </React.Fragment>
                )}
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                {onCancel && (
                    <Button variant='outlined' color='primary' disableElevation onClick={onCancel}>
                        Cancel
                    </Button>
                )}

                <Button disabled={!!startDateError || !!endDateError} type='submit' variant='contained' color='primary'>
                    {formType}
                </Button>
            </FormActions>
        </Form>
    );
}
