import * as React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogProps, Grid, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { UploadReadingMaterials } from './UploadReadingMaterials';
import { Topic } from './types';
import { EditTopics } from './EditTopics';
import { FinalizeTopics } from './FinalizeTopics';
import { useResponsiveDialog } from '@local/components';
import { useFinalizeTopics } from './hooks/useFinalizeTopics';
import { PreloadedTopicList } from './TopicList';
import { useSnack } from '@local/core';

type TTopicContext = {
    topics: Topic[];
    setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
    isReadingMaterialsUploaded: boolean;
};

export const TopicContext = React.createContext<TTopicContext>({
    topics: [],
    setTopics: () => {},
    isReadingMaterialsUploaded: false,
});

const steps = ['Generate Topics', 'Edit Topics', 'Finalize'];

interface Props {}

export function EventTopicSettings({}: Props) {
    const router = useRouter();
    const { displaySnack } = useSnack();
    const [activeStep, setActiveStep] = React.useState(0);
    const [isReadingMaterialsUploaded, setIsReadingMaterialsUploaded] = React.useState(false);
    const [topics, setTopics] = React.useState<Topic[]>([]);
    const [isOpen, open, close] = useResponsiveDialog();
    const { finalizeTopics } = useFinalizeTopics();

    const handleCloseDialog: DialogProps['onClose'] = (event, reason) => {
        if (reason === 'backdropClick') return;
        close();
        setIsReadingMaterialsUploaded(false);
        setTopics([]);
        setActiveStep(0);
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            const onSuccess = () => {
                close();
                displaySnack('Topics have been successfully generated.', { variant: 'success' });
                router.reload();
            };
            finalizeTopics(topics, onSuccess);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onReadingMaterialsUploaded = () => {
        setIsReadingMaterialsUploaded(true);
        // Automatically go to the next step once reading materials are uploaded
        handleNext();
    };

    const isStepFailed = (step: number) => {
        if (step === 0 && activeStep > 0) {
            return !isReadingMaterialsUploaded;
        }
    };

    const disableNext = React.useMemo(() => {
        if (activeStep === 1) {
            return topics.length === 0;
        }
        return false;
    }, [activeStep, topics.length]);

    const memoizedTopics = React.useMemo(() => topics, [topics]);

    React.useEffect(() => {
        console.log('Topics:', topics);
        console.log('memoizedTopics:', memoizedTopics);
    }, [topics, memoizedTopics]);

    return (
        <TopicContext.Provider value={{ topics: memoizedTopics, setTopics, isReadingMaterialsUploaded }}>
            <PreloadedTopicList />
            <Dialog open={isOpen} onClose={handleCloseDialog} maxWidth='lg' fullWidth>
                <Grid container justifyContent='end'>
                    <IconButton onClick={close}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <Stepper activeStep={activeStep} sx={{ paddingX: '2rem' }}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                            error?: boolean;
                        } = {};
                        if (isStepFailed(index)) {
                            labelProps.optional = (
                                <Stack direction='column'>
                                    <Typography variant='caption' color='error'>
                                        No Materials Uploaded.
                                    </Typography>
                                    <Typography variant='caption' color='error'>
                                        Manual Topics Only.
                                    </Typography>
                                </Stack>
                            );
                            labelProps.error = true;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === 0 && (
                    <Grid container justifyContent='center' padding='2rem'>
                        <UploadReadingMaterials onSuccess={onReadingMaterialsUploaded} setTopics={setTopics} />
                    </Grid>
                )}
                {activeStep === 1 && (
                    <Grid container justifyContent='center' padding='2rem'>
                        <EditTopics />
                    </Grid>
                )}
                {activeStep === 2 && (
                    <Grid container justifyContent='center' padding='2rem'>
                        <FinalizeTopics topics={topics} />
                    </Grid>
                )}
                <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, padding: '2rem' }}>
                        <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button disabled={disableNext} onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            </Dialog>
            <Grid container justifyContent='flex-end'>
                <Button variant='outlined' onClick={() => open()}>
                    Setup Topics
                </Button>
            </Grid>
        </TopicContext.Provider>
    );
}
