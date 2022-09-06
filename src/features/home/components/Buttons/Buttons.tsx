import { Button } from '@mui/material';
import { filtersType, Person } from '@src/constants/types';
import { handleFilters } from '../../utils';
import Table from '../../../../models/Table';

interface IProps {
  filters: filtersType;
  setTableData: React.Dispatch<React.SetStateAction<Person[]>>;
  setFilters: React.Dispatch<React.SetStateAction<filtersType>>;
}

export const Buttons = ({ filters, setTableData, setFilters }: IProps) => {
  return (
    <>
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
    </>
  );
};
