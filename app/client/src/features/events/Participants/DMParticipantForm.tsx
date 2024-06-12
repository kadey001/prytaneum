import * as React from 'react';
import { Button, TextField, Typography } from '@mui/material';

import { Form } from '@local/components/Form';
import { FormTitle } from '@local/components/FormTitle';
import { FormContent } from '@local/components/FormContent';
import { FormActions } from '@local/components/FormActions';
import { useForm } from '@local/core';
import { FEEDBACK_MAX_LENGTH } from '@local/utils/rules';
import type { Participant } from './ParticipantsList';

export type TDMParticipantFormState = { message: string; recipientId: string };

export interface Props {
    participant: Participant;
    onSubmit?: (state: TDMParticipantFormState) => void;
    onCancel?: () => void;
}

export function DMParticipantForm({ participant, onSubmit, onCancel }: Props) {
    // form related hooks
    const [form, errors, handleSubmit, handleChange] = useForm({
        message: '',
        recipientId: participant.id,
    });

    const isInputValid = React.useMemo(() => form.message.trim().length !== 0, [form]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTitle title='Direct Message Participant' />
            <FormContent>
                <input type='hidden' name='recipientId' value={participant.id} />
                <TextField
                    id='feedback-field'
                    name='dm-participant'
                    label={`Send your message directly to ${participant.firstName}.`}
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
                    <Button color='primary' onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button disabled={!isInputValid} type='submit' variant='contained' color='primary'>
                    DM
                </Button>
            </FormActions>
        </Form>
    );
}
