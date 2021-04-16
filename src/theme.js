import { createMuiTheme } from '@material-ui/core/styles';

const primaryFont = '"Architects Daughter", cursive';
const secondaryFont = '"Shadows Into Light", cursive';

export const dark = {
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: primaryFont,
    button: {
      textTransform: 'none',
    },
  },
};

export const light = {
  palette: {
    type: 'light',
  },
  typography: {
    fontFamily: primaryFont,
    button: {
      textTransform: 'none',
    },
  },
};
