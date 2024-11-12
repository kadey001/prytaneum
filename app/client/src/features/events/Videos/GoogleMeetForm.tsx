/* eslint-disable react/jsx-curly-newline */
import * as React from 'react';
import * as Yup from 'yup';
import { Grid, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

import { Form } from '@local/components/Form';
import { FormContent } from '@local/components/FormContent';
import { LoadingButton } from '@local/components/LoadingButton';
import { useSnack } from '@local/core';
import { useFormik } from 'formik';
import { useResponsiveDialog } from '@local/components';
import { useUser } from '@local/features/accounts';
import { useEvent } from '../useEvent';
import { FormActions } from '@local/components/FormActions';

type TGoogleMeetForm = {
    coHosts: string[];
};

interface GoogleMeetFormProps {
    onSuccess?: () => void;
    onFailure?: () => void;
    setMeetingUrl: (url: string) => void;
    secondaryActions?: React.ReactNode;
}

export function GoogleMeetForm({ onSuccess, onFailure, setMeetingUrl, secondaryActions }: GoogleMeetFormProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpen, handleOpen, handleClose] = useResponsiveDialog();
    const { user } = useUser();
    const { eventId } = useEvent();
    const { displaySnack } = useSnack();
    const formRef = React.useRef<HTMLFormElement>(null);

    const handleSuccess = () => {
        setIsLoading(false);
        handleClose();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        handleChange({ target: { name: 'coHosts', value: [] } });
        displaySnack('Google Meet created successfully', { variant: 'success' });
        if (onSuccess) onSuccess();
    };

    const handleFailure = () => {
        setIsLoading(false);
        displaySnack('Failed to create Google Meet', { variant: 'error' });
        if (onFailure) onFailure();
    };

    const createMeet = (submittedForm: TGoogleMeetForm) => {
        if (!user) {
            return console.error('User not found, please login');
        }
        setIsLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/google-meet/create`, {
            method: 'POST',
            body: JSON.stringify({
                userId: user.id,
                eventId,
                coHosts: submittedForm.coHosts,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Aceess-Control-Allow-Methods': 'POST',
            },
        }).then((res) => {
            if (!res.ok || res.status !== 200) {
                console.error(res.statusText);
                handleFailure();
                return;
            }
            type ExpectedData = { spaceName: string; meetingUri: string; meetingCode: string; failedCoHosts: string[] };
            res.json().then((data: ExpectedData) => {
                if (data.failedCoHosts && data.failedCoHosts.length > 0) {
                    console.error('Failed to add co-hosts: ', data.failedCoHosts);
                    displaySnack(`Failed to add the following users as co-hosts: ${data.failedCoHosts.join(', ')}`, {
                        variant: 'error',
                    });
                }
                if (!data.meetingUri) {
                    console.error('Meeting URL not found');
                    return handleFailure();
                }
                setMeetingUrl(data.meetingUri);
                handleSuccess();
            });
        });
    };

    const formValidation = Yup.object().shape({
        coHosts: Yup.array().of(Yup.string().email('Invalid email').required('Email is required')),
    });

    // TODO: Handle case where no co-hosts are added (should still be allowed)
    const { handleSubmit, handleChange, values, errors } = useFormik<TGoogleMeetForm>({
        initialValues: {
            coHosts: [],
        },
        validationSchema: formValidation,
        onSubmit: createMeet,
    });

    const handleExternalSubmit = () => {
        if (formRef.current) {
            // Manually trigger the form's onSubmit handler
            const event = new Event('submit', { cancelable: true });
            formRef.current.dispatchEvent(event);
            // Call the handleSubmit function directly
            handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
        }
    };

    const isAllInputsValid = React.useMemo(() => {
        return Object.values(errors).every((error) => !error);
    }, [errors]);

    return (
        <React.Fragment>
            <Button onClick={handleOpen}>Create Google Meet</Button>
            <Dialog open={isOpen} onClose={handleClose} maxWidth='lg' fullWidth>
                <DialogTitle>Google Meet Form</DialogTitle>
                <DialogContent>
                    <Grid container item xs={12} direction='column' alignItems='center'>
                        <Typography variant='subtitle1'>
                            Enter the email addresses of the co-hosts you would like to add to the Google Meet.
                        </Typography>
                        <Typography variant='subtitle2'>
                            Note: Must be gmail or google workspace emails (e.g. user@gmail.com, user@university.edu)
                        </Typography>
                    </Grid>
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <FormContent>
                            <TextField
                                id='google-meet-cohosts'
                                label='Co-Hosts (comma separated)'
                                value={values.coHosts} // Join array for display
                                onChange={(e) => {
                                    if (e.target.value === '') {
                                        return handleChange({ target: { name: 'coHosts', value: [] } });
                                    }
                                    const array = e.target.value.split(',').map((host) => host.trim());
                                    handleChange({ target: { name: 'coHosts', value: array } });
                                }}
                                helperText='Enter co-hosts emails separated by commas (Must be gmail or google workspace emails)'
                            />
                        </FormContent>
                        <FormActions>
                            {/* Hidden submit button so pressing the enter key still submits the form */}
                            <button type='submit' style={{ display: 'none' }} disabled={isLoading} />
                        </FormActions>
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <LoadingButton
                        loading={isLoading}
                        data-test-id='register-form-submit'
                        type='submit'
                        onClick={handleExternalSubmit}
                        variant='contained'
                        color='primary'
                        disabled={isLoading || !isAllInputsValid}
                    >
                        Create Google Meet
                    </LoadingButton>
                    {secondaryActions && <>{secondaryActions}</>}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
