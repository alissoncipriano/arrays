import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { GridSearchIcon } from '@mui/x-data-grid';
import { handleSearch } from '../../utils';
import { filtersType, Person } from '@src/constants/types';

interface IProps {
  setTableData: React.Dispatch<React.SetStateAction<Person[]>>;
  setFilters: React.Dispatch<React.SetStateAction<filtersType>>;
  filters: filtersType;
}

export const Search = ({ setTableData, filters, setFilters }: IProps) => {
  return (
    <Box sx={{ width: '100%', marginBottom: 5 }}>
      <FormControl sx={{ width: '100%' }} variant='outlined'>
        <InputLabel htmlFor='search-bar'>Buscar por nome...</InputLabel>
        <OutlinedInput
          id='search-bar'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='search'
                edge='end'
                onClick={() =>
                  setTableData(handleSearch(filters.searchByName.value))
                }
              >
                <GridSearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label='Buscar por nome...'
          value={filters.searchByName.value}
          onChange={(e) => {
            setFilters({
              ...filters,
              searchByName: { selected: true, value: e.target.value },
            });
          }}
        />
      </FormControl>
    </Box>
  );
};
