import React from 'react';
import { useRouter } from 'next/router';
import { graphql, useFragment } from 'react-relay';

import { Grid, Button, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useSnack } from '@local/core';
import ReadingMaterialsViewer from './ReadingMaterialsViewer';
import { ReadingMaterialsEventSettingsFragment$key } from '@local/__generated__/ReadingMaterialsEventSettingsFragment.graphql';

interface ReadingMaterialsEventSettingsProps {
    fragmentRef: ReadingMaterialsEventSettingsFragment$key;
}

export const READING_MATERIALS_EVENT_SETTINGS_FRAGMENT = graphql`
    fragment ReadingMaterialsEventSettingsFragment on Event {
        id
        readingMaterialsUrl
    }
`;

export default function ReadingMaterialsEventSettings({ fragmentRef }: ReadingMaterialsEventSettingsProps) {
    const router = useRouter();
    const { id: eventId, readingMaterialsUrl } = useFragment(READING_MATERIALS_EVENT_SETTINGS_FRAGMENT, fragmentRef);
    const [pdfFile, setPDFFile] = React.useState<File | null>(null);
    const [isUploading, setIsUploading] = React.useState(false);
    const { displaySnack } = useSnack();

    const attachPDF = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            // Validate csv file
            const limit = 5 * 1024 * 1024; // 5 MB
            if (e.target.files[0]?.size > limit) {
                displaySnack('File size too large. Max 5MB.', { variant: 'error' });
                const file = document.getElementById('reading-materials') as HTMLInputElement;
                file.value = file.defaultValue;
                return;
            }
            setPDFFile(e.target.files[0]);
        }
    };

    const uploadReadingMaterials = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (pdfFile === null) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('eventId', eventId);
        formData.append('reading-materials', pdfFile);
        fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL + '/upload-reading-materials', {
            method: 'POST',
            body: formData,
        })
            .then((res) => {
                // Remove file from input upon success
                setPDFFile(null);
                const file = document.getElementById('reading-materials') as HTMLInputElement;
                file.value = file.defaultValue;
                setIsUploading(false);
                if (res.status === 200) {
                    res.json().then((data: unknown) => {
                        if (!data) {
                            displaySnack('Something went wrong, please try again later.', { variant: 'error' });
                            return;
                        }
                        const { isError, message } = data as { isError: boolean; message: string };
                        if (isError) displaySnack(message, { variant: 'error' });
                        else {
                            displaySnack('Reading Materials Uploaded.', { variant: 'success' });
                            router.reload();
                        }
                    });
                } else {
                    displaySnack('Reading Materials failed to upload.', { variant: 'error' });
                }
            })
            .catch((err) => {
                console.error(err);
                setIsUploading(false);
            });
    };

    return (
        <Grid container>
            <ReadingMaterialsViewer url={readingMaterialsUrl} />
            <Grid container direction='row' alignItems='center' justifyContent='right'>
                <Tooltip
                    title='File Must be a PDF. | NOTE: New uploads will replace any existing ones.'
                    enterTouchDelay={0}
                >
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
                <input id='reading-materials' type='file' accept='.pdf' onChange={attachPDF} />
                <Button disabled={pdfFile === null || isUploading} onClick={uploadReadingMaterials} variant='outlined'>
                    Upload Reading Materials
                </Button>
            </Grid>
        </Grid>
    );
}
