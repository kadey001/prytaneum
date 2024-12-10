import * as React from 'react';
import { Button, TextField, Typography } from '@mui/material';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { useForm } from '@local/core';
import { FEEDBACK_MAX_LENGTH } from '@local/utils/rules';
import { useEvent } from '../useEvent';

export type TLiveFeedbackFormState = { message: string };

export interface LiveFeedbackFormProps {
    reply?: React.ReactNode;
    onSubmit?: (state: TLiveFeedbackFormState) => void;
    onCancel?: () => void;
}

export function LiveFeedbackForm({ reply, onSubmit, onCancel }: LiveFeedbackFormProps) {
    // form related hooks
    const [form, errors, handleSubmit, handleChange] = useForm({
        message: '',
    });
    const { isModerator } = useEvent();

    const isFeedbackValid = React.useMemo(() => form.message.trim().length !== 0, [form]);

    const formTitle = React.useMemo(() => {
        if (isModerator) return 'Live Message Form';
        if (reply) return 'Live Feedback Reply Form';
        return 'Live Feedback Form';
    }, [isModerator, reply]);

    const formLabel = React.useMemo(() => {
        if (isModerator) return 'Send a message to other moderators';
        if (reply) return 'Feedback Reply...';
        return 'Send your feedback directly to the moderators';
    }, [isModerator, reply]);

    const buttonText = React.useMemo(() => {
        if (isModerator) return 'Send';
        return reply ? 'Reply' : 'Ask';
    }, [isModerator, reply]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title={formTitle} />
            {reply}
            <FormContent>
                <TextField
                    id='feedback-field'
                    name={reply ? 'feedback-reply' : 'feedback'}
                    label={formLabel}
                    autoFocus
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                    required
                    multiline
                    value={form.message}
                    onChange={handleChange('message')}
                />
                <Typography
                    variant='caption'
                    color={form.message.length > FEEDBACK_MAX_LENGTH ? 'red' : 'black'}
                    sx={{ display: 'block', textAlign: 'right' }}
                >
                    {form.message.length}/500
                </Typography>
            </FormContent>
            <FormActions disableGrow gridProps={{ justifyContent: 'flex-end' }}>
                {onCancel && (
                    <Button variant='outlined' color='primary' onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button disabled={!isFeedbackValid} type='submit' variant='contained' color='primary'>
                    {buttonText}
                </Button>
            </FormActions>
        </Form>
    );
}
