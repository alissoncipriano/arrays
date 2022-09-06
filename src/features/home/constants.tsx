import { GridColDef } from '@mui/x-data-grid';
import { ProfilePic } from './components/ProfilePic/ProfilePic';

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
  searchByName: {
    selected: false,
    value: '',
  },
};

const columns: GridColDef[] = [
  {
    field: 'picture',
    headerName: 'Foto',
    width: 90,
    renderCell: (params) => <ProfilePic url={params.value} />,
    sortable: false,
  },
  { field: 'name', headerName: 'Nome', width: 180, sortable: false },
  { field: 'email', headerName: 'Email', width: 280, sortable: false },
  { field: 'phone', headerName: 'Celular', width: 160, sortable: false },
  { field: 'age', headerName: 'Idade', width: 90, sortable: false },
  { field: 'nat', headerName: 'Naturalidade', width: 120, sortable: false },
  { field: 'gender', headerName: 'Gênero', width: 90, sortable: false },
];

export { filterObject, columns };
