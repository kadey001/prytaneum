import * as React from 'react';
import { useMutation, graphql } from 'react-relay';
import { DialogContent, IconButton, Tooltip } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

import type { DMParticipantMutation } from '@local/__generated__/DMParticipantMutation.graphql';
import { ResponsiveDialog, useResponsiveDialog } from '@local/components/ResponsiveDialog';
import { useUser } from '@local/features/accounts';
import { isURL } from '@local/utils/index';
import { FEEDBACK_MAX_LENGTH } from '@local/utils/rules';
import { useSnack } from '@local/features/core/useSnack';
import { DMParticipantForm, TDMParticipantFormState } from './DMParticipantForm';
import { useEvent } from '../useEvent';
import type { Participant } from './useParticipantList';

export const DM_PARTICIPANT_MUTATION = graphql`
    mutation DMParticipantMutation($input: CreateFeedbackDM!) {
        createFeedbackDM(input: $input) {
            isError
            message
            body {
                cursor
                node {
                    id
                    createdAt
                    message
                    createdBy {
                        id
                        firstName
                        lastName
                    }
                }
            }
        }
    }
`;

interface Props {
    participant: Participant;
}

export function DMParticipant({ participant }: Props) {
    const [isOpen, open, close] = useResponsiveDialog();
    const { user } = useUser();
    const { eventId } = useEvent();
    const [commit] = useMutation<DMParticipantMutation>(DM_PARTICIPANT_MUTATION);
    const { displaySnack } = useSnack();

    const isButtonDisabled = React.useMemo(() => {
        if (!user) return true;
        if (user.id === participant.id) return true;
    }, [participant.id, user]);

    function handleSubmit(form: TDMParticipantFormState) {
        try {
            // Validate length and url presence before submitting to avoid unessisary serverside validation
            if (form.message.length > FEEDBACK_MAX_LENGTH) throw new Error('Question is too long!');
            if (isURL(form.message)) throw new Error('No links are allowed!');
            commit({
                variables: { input: { ...form, eventId } },
                onCompleted(payload) {
                    try {
                        if (payload.createFeedbackDM.isError) throw new Error(payload.createFeedbackDM.message);
                        close();
                        displaySnack('Feedback submitted!', { variant: 'success' });
                    } catch (err) {
                        if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
                        else displaySnack('Something went wrong!', { variant: 'error' });
                    }
                },
            });
        } catch (err) {
            if (err instanceof Error) displaySnack(err.message, { variant: 'error' });
            else displaySnack('Something went wrong!', { variant: 'error' });
        }
    }

    return (
        <React.Fragment>
            <ResponsiveDialog open={isOpen} onClose={close}>
                <DialogContent>
                    <DMParticipantForm participant={participant} onCancel={close} onSubmit={handleSubmit} />
                </DialogContent>
            </ResponsiveDialog>
            <IconButton
                aria-label={`Direct Message Participant ${participant.firstName}`}
                disabled={isButtonDisabled}
                onClick={open}
            >
                <Tooltip title={`Direct Message Participant ${participant.firstName}`} placement='top'>
                    <MessageIcon sx={{ color: 'primary.main' }} />
                </Tooltip>
            </IconButton>
        </React.Fragment>
    );
}
