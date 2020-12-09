import React from 'react';
import { Typography, Modal, Backdrop, Fade, FormControl, InputLabel, Input, IconButton, Button, Divider } from '@material-ui/core';
import { GpsFixedTwoTone as LocationIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

function ZipCodeModal(props) {
  const { classes, open, setOpen, setZip } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const zipCode = e.target.zipcode.value;
    zipCode.match(/^\d{5}(-\d{4})?$/) ? setZip(zipCode) : console.log('nope');
  };

  const handleLocation = async (position) => {
    const { latitude, longitude } = position.coords;
    const location = `${latitude},${longitude}`;
    setZip(location);
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography variant='h5'>Enter Zip Code</Typography>
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
                Submit
              </Button>
            </FormControl>
          </form>
          <Divider />
          <Typography variant='h5'>Allow Access To Location</Typography>
          <IconButton
            aria-haspopup='true'
            color='primary'
            onClick={() =>
              navigator.geolocation.getCurrentPosition(handleLocation)
            }
          >
            <LocationIcon />
            <Typography variant='h5'>Find Me</Typography>
          </IconButton>
        </div>
      </Fade>
    </Modal>
  );
}

const styles = (theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

export default withStyles(styles)(ZipCodeModal);