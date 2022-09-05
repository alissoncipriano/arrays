import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Box } from '@mui/system';
import { filtersType, Person } from '@src/constants/types';
import { handleFilters } from '../../utils';
import MTable from '../../../../models/Table';

interface IProps {
  filters: filtersType;
  setFilters: React.Dispatch<React.SetStateAction<filtersType>>;
  setTableData: React.Dispatch<React.SetStateAction<Person[]>>;
}

export const Filters = ({ filters, setFilters, setTableData }: IProps) => {
  return (
    <>
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
                  setFilters(handleFilters.update(filters, 'gender', e.target))
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
                {MTable.getNat().length > 0 &&
                  MTable.getNat().map((el, index) => (
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
            setTableData(MTable.getPeople());
          }}
          // disabled={
          //   filters.some((obj) => obj.selected === true) ? false : true
          // }
        >
          Limpar filtros
        </Button>
      </form>
    </>
  );
};
