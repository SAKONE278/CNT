import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import shadows from './shadows';
import typography from './typography';

const getTheme = () => createTheme({
  palette: {
    background: {
      default: '#121212',
      paper: '#1f1f1f',
      deep: '#000000',
    },
    primary: {
      main: '#feb100',
    },
    secondary: {
      main: '#000000',
    },
    text: {
      primary: colors.common.white,
      secondary: '#F4F4F4',
    },
    mode: 'dark',
  },
  colors,
  shadows,
  typography,
  dark: true,
});

export default getTheme;
