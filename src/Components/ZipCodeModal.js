import React from 'react';
import {
  Typography,
  Fade,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  Button,
  Divider,
} from '@material-ui/core';
import { GpsFixedTwoTone as LocationIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ZipCodeModal({ open, handleLocation, handleLocationType }) {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    const zipCode = e.target.zipcode.value;
    zipCode.match(/^\d{5}(-\d{4})?$/) ? handleLocation(zipCode) : console.log('nope');
  };
  const handleCoords = async (position) => {
    const { latitude, longitude } = position.coords;
    const location = `${latitude},${longitude}`;
    handleLocation(location);
  };
  return (
    <Fade in={open}>
      <div className={classes.paper}>
        <IconButton
          aria-label='back'
          aria-controls='back'
          aria-haspopup='true'
          onClick={() => handleLocationType('Any')}
          style={{ position:'absolute'}}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='h5' align='center'>Enter Zip Code</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='zipcode'>Zip Code</InputLabel>
            <Input id='zipcode' name='zipcode' autoComplete='off' />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              //   color='primary'
              className={classes.submit}
              style={{ background: 'transparent', boxShadow: 'none' }}
            >
              SUBMIT
            </Button>
          </FormControl>
        </form>
        <Divider />
        <Typography variant='h5'>Allow Access To Location</Typography>
        <IconButton
          aria-haspopup='true'
          color='primary'
          onClick={() =>
            navigator.geolocation.getCurrentPosition(handleCoords)
          }
        >
          <LocationIcon />
          <Typography variant='h5'>Find Me</Typography>
        </IconButton>
      </div>
    </Fade>
  );
}

export default ZipCodeModal;
