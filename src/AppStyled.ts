import { Grow } from '@mui/material';
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

export const GrowStyled = styled(Grow)({
  position: 'absolute',
  left: '100px',
  backgroundColor: '#ffffff',
  boxShadow: '0 0 3px #e5e5e5',
  border: '1px solid #e1e1e1',
  padding: '15px 25px',
  borderRadius: '5px',
  zIndex: 1,
});
