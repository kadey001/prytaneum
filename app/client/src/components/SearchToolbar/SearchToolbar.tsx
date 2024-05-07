import * as React from 'react';
import PropTypes from 'prop-types';
import { Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export interface Props {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    label: string;
}

const SearchToolbar = ({ onChange, label }: Props) => {
    return (
        <Paper sx={{ display: 'flex', borderRadius: '12px', margin: (theme) => theme.spacing(1) }}>
            <TextField
                // disableUnderline
                onChange={onChange}
                label={label}
            />
            <SearchIcon style={{ alignSelf: 'center' }} aria-label='SearchIcon' />
        </Paper>
    );
};

SearchToolbar.propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default SearchToolbar;
