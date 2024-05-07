/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

interface RequiredProps {
    onChange: (f: File) => void;
}

interface DefaultProps {
    fileName?: string;
}

function UploadField({ onChange, fileName }: RequiredProps & DefaultProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const { files } = e.target;
        if (files && files.length > 0) {
            onChange(files.item(0) as File);
        }
    };
    // NOTE: must have this b/c if state changes type something weird happens
    return (
        <Grid container alignItems='center'>
            <Grid item xs='auto'>
                <label htmlFor='chosen-file'>
                    <TextField
                        variant='outlined'
                        color='primary'
                        value={fileName}
                        label='Chosen File'
                        placeholder='No File Chosen'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </label>
            </Grid>
            <label htmlFor='selected-file'>
                <input
                    accept='.csv'
                    style={{ display: 'none' }}
                    id='contained-button-file'
                    type='file'
                    onChange={handleChange}
                />
            </label>
            <Grid item xs='auto'>
                <label htmlFor='contained-button-file'>
                    <Button
                        variant='outlined'
                        component='span'
                        color='primary'
                        sx={{ margin: (theme) => theme.spacing(1) }}
                    >
                        Select File
                    </Button>
                </label>
            </Grid>
        </Grid>
    );
}

export default UploadField;
