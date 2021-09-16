import { createTheme } from '@material-ui/core/styles';
import { red, teal } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      ...teal,
      contrastText: '#fff',
    },
    error: {
      main: red[900],
    },
    background: {
      default: '#F7F7F8',
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

export default theme;
