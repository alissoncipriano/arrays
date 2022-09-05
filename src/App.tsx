import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppStyled } from './AppStyled';
import { Person } from './constants/types';
import MTable from './models/Table';
import { columns, filterObject } from './features/home/constants';
import { fetchTableData } from './utils/functionUtils';
import { Table } from './features/home/components/Table/Table';
import { Filters } from './features/home/components/Filters/Filters';
import { Search } from './features/home/components/Search/Search';

function App() {
  const [tableData, setTableData] = useState<Person[]>([]);
  const [filters, setFilters] = useState(filterObject);

  useEffect(() => {
    fetchTableData().then(() => {
      setTableData(MTable.getPeople());
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
        <Table
          rows={tableData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />

        <Box
          sx={{
            marginTop: '4em',
            flex: 1,
            boxSizing: 'border-box',
            padding: '0 4em',
          }}
        >
          <Search />

          <Filters
            filters={filters}
            setFilters={setFilters}
            setTableData={setTableData}
          />
        </Box>
      </Box>
    </AppStyled>
  );
}

export default App;
