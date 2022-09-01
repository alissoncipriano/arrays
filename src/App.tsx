import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { AppStyled } from './AppStyled';
import { Person } from './constants/types';
import Table from './models/Table';
import { columns, filterObject } from './features/home/constants';
import { fetchTableData } from './utils/functionUtils';
import { handleFilters } from './features/home/utils';

function App() {
  const [tableData, setTableData] = useState<Person[]>([]);
  const [filters, setFilters] = useState(filterObject);

  useEffect(() => {
    fetchTableData().then(() => {
      setTableData(Table.getPeople());
    });
  }, []);

  return (
    <AppStyled>
      <Typography variant='h3' fontSize='2em'>
        Manipulação de arrays em JS
      </Typography>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ minHeight: '70vh', flex: 2, marginTop: '4em' }}>
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </Box>

        <Box
          sx={{
            marginTop: '4em',
            flex: 1,
            boxSizing: 'border-box',
            padding: '0 4em',
          }}
        >
          <Box sx={{ width: '100%', marginBottom: 5 }}>
            <FormControl sx={{ width: '100%' }} variant='outlined'>
              <InputLabel htmlFor='search-bar'>Buscar por nome...</InputLabel>
              <OutlinedInput
                id='search-bar'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton aria-label='search' edge='end'>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label='Buscar por nome...'
              />
            </FormControl>
          </Box>

          <Typography sx={{ marginBottom: '15px', fontWeight: '800' }}>
            Filtros:
          </Typography>

          <form>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  padding: '10px 0 10px 20px',
                  border: '1px solid #e1e1e1',
                  borderRadius: 1,
                  marginRight: 1,
                }}
              >
                <FormControl sx={{ flex: 1 }}>
                  <Typography>Gênero:</Typography>
                  <RadioGroup
                    row
                    aria-labelledby='genders-group'
                    name='genders-group'
                    value={filters.gender.value}
                    sx={{ flexDirection: 'column', paddingRight: 5 }}
                    onChange={(e) =>
                      setFilters(
                        handleFilters.update(filters, 'gender', e.target)
                      )
                    }
                  >
                    <FormControlLabel
                      value='feminino'
                      control={<Radio />}
                      label='Feminino'
                    />
                    <FormControlLabel
                      value='masculino'
                      control={<Radio />}
                      label='Masculino'
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ flex: 1, marginRight: 1 }}>
                <FormControl>
                  <TextField
                    id='outlined-number'
                    label='Idade'
                    type='number'
                    onChange={(e) =>
                      setFilters(handleFilters.update(filters, 'age', e.target))
                    }
                    value={filters.age.value}
                  />
                </FormControl>
              </Box>

              <Box sx={{ flex: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>
                    Naturalidade
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={filters.nationality.value}
                    label='Naturalidade'
                    onChange={(e) =>
                      setFilters(
                        handleFilters.update(filters, 'nationality', e.target)
                      )
                    }
                  >
                    {Table.getNat().length > 0 &&
                      Table.getNat().map((el, index) => (
                        <MenuItem value={String(el)} key={index}>
                          {el}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Button
              variant='contained'
              size='large'
              sx={{
                marginTop: 5,
                padding: 2,
                width: '100%',
              }}
              onClick={() => setTableData(handleFilters.apply(filters))}
              // disabled={
              //   Object.keys(filters).some((obj) => obj.selected === true) ? false : true
              // }
            >
              Filtrar
            </Button>

            <Button
              variant='outlined'
              size='large'
              sx={{
                marginTop: 1,
                padding: 2,
                width: '100%',
              }}
              onClick={() => {
                setFilters(handleFilters.clean());
                setTableData(Table.getPeople());
              }}
              // disabled={
              //   filters.some((obj) => obj.selected === true) ? false : true
              // }
            >
              Limpar filtros
            </Button>
          </form>
        </Box>
      </Box>
    </AppStyled>
  );
}

export default App;
