import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  '@global': {
    '*': {
      boxSizing: 'border-box',
    },
    'html, body': {
      background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.type == 'light' ? '#fff' : '#424242'})`,
      overscrollBehaviorY: 'contain',
      margin: 0,
      padding: 0,
      height: '100%',
      width: '100%',
      userSelect: 'none',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif',
      position: 'fixed',
      overflow: 'hidden',
    },
    '#root': {
      position: 'fixed',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
    },
    '.App': {
      textAlign: 'center',
    },
    '.Content': {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
    },
  },
}));

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
