import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

dotenv.config();

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Architects Daughter", cursive',
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
