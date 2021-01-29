import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';

dotenv.config();

const primaryFont = '"Architects Daughter", cursive';
const secondaryFont = '"Shadows Into Light", cursive';

const theme = createMuiTheme({
  typography: {
    fontFamily: primaryFont,
    button: {
      textTransform: 'none',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
