import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
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
import { SelectChangeEvent } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AppStyled } from './AppStyled';
import { Person } from './constants/types';
import Table from './models/Table';
import { columns, filterObject } from './features/home/constants';
import { fetchTableData } from './utils/functionUtils';

function App() {
  const [tableData, setTableData] = useState<Person[]>([]);
  const [filters, setFilters] = useState(filterObject);

  const handleChangeNationality = (event) => {
    const newNationality = {
      ...filters.nationality,
      selected: true,
      value: event.target.value as string,
    };

    setFilters({ ...filters, nationality: newNationality });
  };

  const handleChangeAge = (event) => {
    const newAge = {
      ...filters.age,
      selected: true,
      value: event.target.value as string,
    };

    setFilters({ ...filters, age: newAge });
  };

  const handleChangeGender = (event) => {
    const newGender = {
      ...filters.gender,
      selected: true,
      value: (event.target as HTMLInputElement).value,
    };

    setFilters({ ...filters, gender: newGender });
  };

  const filterCase = (): string => {
    if (
      filters.gender.selected &&
      filters.age.selected &&
      filters.nationality.selected
    )
      return 'all';
    if (filters.gender.selected && filters.age.selected) return 'gender-age';
    if (filters.gender.selected && filters.nationality.selected)
      return 'gender-nationality';
    if (filters.age.selected && filters.nationality.selected)
      return 'age-nationality';
    if (filters.gender.selected) return 'gender';
    if (filters.age.selected) return 'age';
    return 'nationality';
  };

  const handleFilter = () => {
    switch (filterCase()) {
      case 'all':
        setTableData(
          Table.getPeople().filter(
            (el) =>
              el.gender === filters.gender.value &&
              el.age === Number.parseInt(filters.age.value) &&
              el.nat === filters.nationality.value
          )
        );
        break;
      case 'gender-age':
        setTableData(
          Table.getPeople().filter(
            (el) =>
              el.gender === filters.gender.value &&
              el.age === Number.parseInt(filters.age.value)
          )
        );
        break;
      case 'gender-nationality':
        setTableData(
          Table.getPeople().filter(
            (el) =>
              el.gender === filters.gender.value &&
              el.nat === filters.nationality.value
          )
        );
        break;

      case 'age-nationality':
        setTableData(
          Table.getPeople().filter(
            (el) =>
              el.age === Number.parseInt(filters.age.value) &&
              el.nat === filters.nationality.value
          )
        );
        break;
      case 'gender':
        setTableData(
          Table.getPeople().filter((el) => el.gender === filters.gender.value)
        );
        break;
      case 'age':
        setTableData(
          Table.getPeople().filter(
            (el) => el.age === Number.parseInt(filters.age.value)
          )
        );
        break;
      case 'nationality':
        setTableData(
          Table.getPeople().filter((el) => el.nat === filters.nationality.value)
        );
        break;
    }
  };

  const handleFilterClean = () => {
    setFilters({ ...filterObject });
    setTableData(Table.getPeople());
  };

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
                    onChange={handleChangeGender}
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
                    onChange={handleChangeAge}
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
                    onChange={handleChangeNationality}
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
              onClick={handleFilter}
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
              onClick={handleFilterClean}
              // disabled={
              //   filters.some((obj) => obj.selected === true) ? false : true
              // }
            >
              Limpar filtros
            </Button>
          </form>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '70vh',
          flex: 1,
          marginTop: '4em',
        }}
      >
        <Typography variant='h4' fontSize='1.8em' marginBottom={3}>
          Tabela original
        </Typography>

        <DataGrid
          rows={Table.getPeople()}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </AppStyled>
  );
}

export default App;
