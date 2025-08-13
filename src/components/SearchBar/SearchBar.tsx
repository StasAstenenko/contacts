'use client';

import { useState, useMemo, useEffect } from 'react';
import { TextField, InputAdornment, IconButton, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchInputProps) => {
  const [query, setQuery] = useState('');
  const theme = useTheme();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 300),
    [onSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <TextField
      value={query}
      onChange={handleChange}
      placeholder='Пошук...'
      variant='outlined'
      size='small'
      fullWidth
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          '& fieldset': { borderColor: theme.palette.divider },
          '&:hover fieldset': { borderColor: theme.palette.primary.main },
          '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
        },
        '& .MuiInputAdornment-root .MuiIconButton-root': {
          color: theme.palette.text.primary,
        },
        '& input': {
          color: theme.palette.text.primary,
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={() => onSearch(query)}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
