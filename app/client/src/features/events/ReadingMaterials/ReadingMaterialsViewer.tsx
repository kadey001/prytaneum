import React from 'react';
import { Document, Page } from 'react-pdf';
import { pdfJsOptions } from '@local/pages/_app';
import { Grid, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface ReadingMaterialsViewerProps {
    url: string | null;
}

export default function ReadingMaterialsViewer({ url }: ReadingMaterialsViewerProps) {
    const [numPages, setNumPages] = React.useState<number>(1);
    const [pageNumber, setPageNumber] = React.useState<number>(1);

    const onDocumentLoadSuccess = ({ numPages: _numPages }: { numPages: number }) => {
        setNumPages(_numPages);
    };

    const goToPrevPage = () => setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () => setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

    const canGoForward = React.useMemo(() => pageNumber < numPages, [pageNumber, numPages]);
    const canGoBack = React.useMemo(() => pageNumber > 1, [pageNumber]);

    if (!url || url === '')
        return (
            <Grid container alignItems='center' direction='column' paddingY='1.5rem'>
                <Typography variant='body1' align='center'>
                    No reading materials found, please upload some to view them here.
                </Typography>
            </Grid>
        );

    return (
        <Grid container alignItems='center' direction='column'>
            <nav>
                <IconButton disabled={!canGoBack} onClick={goToPrevPage}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton disabled={!canGoForward} onClick={goToNextPage}>
                    <ArrowForwardIcon />
                </IconButton>
                <Typography variant='body2' align='center'>
                    Page {pageNumber} of {numPages}
                </Typography>
            </nav>
            <Document
                options={pdfJsOptions}
                renderMode='canvas'
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={console.error}
            >
                <Page pageNumber={1} />
            </Document>
        </Grid>
    );
}
