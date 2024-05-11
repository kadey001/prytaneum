import React from 'react';
import { Document, Page } from 'react-pdf';
import { pdfJsOptions } from '@local/pages/_app';
import { Typography, IconButton, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useWindowDimensions from '@local/core/useWindowDimensions';

interface Props {
    url: string | null;
}

export function PdfViewer({ url }: Props) {
    const { width } = useWindowDimensions();
    const [numPages, setNumPages] = React.useState<number>(1);
    const [pageNumber, setPageNumber] = React.useState<number>(1);

    const onDocumentLoadSuccess = ({ numPages: _numPages }: { numPages: number }) => {
        setNumPages(_numPages);
    };

    const goToPrevPage = () => setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () => setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

    const canGoForward = React.useMemo(() => pageNumber < numPages, [pageNumber, numPages]);
    const canGoBack = React.useMemo(() => pageNumber > 1, [pageNumber]);

    // TODO: Improve error handling
    return (
        <React.Fragment>
            <Grid container justifyContent='center'>
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
            </Grid>
            <Document
                options={pdfJsOptions}
                renderMode='canvas'
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={console.error}
            >
                <Page pageNumber={1} width={width} />
            </Document>
        </React.Fragment>
    );
}
