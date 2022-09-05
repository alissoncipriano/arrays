import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { GridSearchIcon } from '@mui/x-data-grid';

export const Search = () => {
  return (
    <Box sx={{ width: '100%', marginBottom: 5 }}>
      <FormControl sx={{ width: '100%' }} variant='outlined'>
        <InputLabel htmlFor='search-bar'>Buscar por nome...</InputLabel>
        <OutlinedInput
          id='search-bar'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton aria-label='search' edge='end'>
                <GridSearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label='Buscar por nome...'
        />
      </FormControl>
    </Box>
  );
};
