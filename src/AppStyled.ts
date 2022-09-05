import { Box, styled } from '@mui/system';

export const AppStyled = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  boxSizing: 'border-box',
  padding: '5em',
}));
