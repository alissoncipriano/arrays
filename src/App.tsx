import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { AppStyled } from './AppStyled';

const columns: GridColDef[] = [
  {
    field: 'picture',
    headerName: 'Foto',
    width: 90,
    renderCell: (params) => <Avatar src={params.value} />,
    sortable: false,
  },
  { field: 'name', headerName: 'Nome', width: 180, sortable: false },
  { field: 'email', headerName: 'Email', width: 280, sortable: false },
  { field: 'phone', headerName: 'Celular', width: 160, sortable: false },
  { field: 'age', headerName: 'Idade', width: 90, sortable: false },
  { field: 'nat', headerName: 'Naturalidade', width: 120, sortable: false },
  { field: 'gender', headerName: 'Gênero', width: 90, sortable: false },
];

async function getPeople() {
  const response = await fetch('https://randomuser.me/api/?results=50');
  return response.json();
}

type row = {
  id: number;
  picture: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  nat: string;
  gender: 'feminino' | 'masculino';
};

const filterObject = {
  gender: {
    selected: false,
    value: '',
  },
  age: {
    selected: false,
    value: '',
  },
  nationality: {
    selected: false,
    value: '',
  },
};

function App() {
  const [tableData, setTableData] = useState<row[]>([]);
  const [originalData, setOriginalData] = useState<row[]>([]);
  const [nationalities, setNationalities] = useState([]);
  const [filters, setFilters] = useState(filterObject);

  const handleChangeNationality = (event: SelectChangeEvent) => {
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

  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          originalData.filter(
            (el) =>
              el.gender === filters.gender.value &&
              el.age === Number.parseInt(filters.age.value) &&
              el.nat === filters.nationality.value
          )
        );
        break;
      case 'gender-age':
        setTableData(
          originalData.filter(
            (el) =>
              el.gender === filters.gender.value &&
              el.age === Number.parseInt(filters.age.value)
          )
        );
        break;
      case 'gender-nationality':
        setTableData(
          originalData.filter(
            (el) =>
              el.gender === filters.gender.value &&
              el.nat === filters.nationality.value
          )
        );
        break;

      case 'age-nationality':
        setTableData(
          originalData.filter(
            (el) =>
              el.age === Number.parseInt(filters.age.value) &&
              el.nat === filters.nationality.value
          )
        );
        break;
      case 'gender':
        setTableData(
          originalData.filter((el) => el.gender === filters.gender.value)
        );
        break;
      case 'age':
        setTableData(
          originalData.filter(
            (el) => el.age === Number.parseInt(filters.age.value)
          )
        );
        break;
      case 'nationality':
        setTableData(
          originalData.filter((el) => el.nat === filters.nationality.value)
        );
        break;
    }
  };

  const handleFilterClean = () => {
    setFilters({ ...filterObject });
    setTableData(originalData);
  };

  useEffect(() => {
    getPeople().then((data) => {
      const people = data.results.map((el, index) => ({
        id: index,
        picture: el.picture.thumbnail,
        name: `${el.name.first} ${el.name.last}`,
        email: el.email,
        phone: el.phone,
        age: el.dob.age,
        nat: el.nat,
        gender: el.gender === 'female' ? 'feminino' : 'masculino',
      }));

      const nationalities = data.results
        .map((p) => p.nat)
        .filter(function (value, index, array) {
          return array.indexOf(value) === index;
        });

      setTableData(people);
      setOriginalData(people);
      setNationalities(nationalities);
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
                    Nacionalidade
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={filters.nationality.value}
                    label='Nacionalidade'
                    onChange={handleChangeNationality}
                  >
                    {nationalities.length > 0 &&
                      nationalities.map((el) => (
                        <MenuItem value={el}>{el}</MenuItem>
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
          rows={originalData}
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
