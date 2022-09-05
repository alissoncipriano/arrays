import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Person } from '../../../../constants/types';

interface IProps {
  rows: Person[];
  columns: GridColDef<any, any, any>[];
  pageSize: number;
  rowsPerPageOptions: number[];
  disableSelectionOnClick?: boolean;
}

export const Table = ({
  rows,
  columns,
  pageSize,
  rowsPerPageOptions,
  disableSelectionOnClick,
}: IProps) => {
  return (
    <Box sx={{ minHeight: '70vh', flex: 2, marginTop: '4em' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        disableSelectionOnClick
      />
    </Box>
  );
};
