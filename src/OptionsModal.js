import React, { useState } from 'react';
import {
  Typography,
  Modal,
  Backdrop,
  Fade,
  FormControl,
  FormLabel,
  RadioGroup,
  FormGroup,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Input,
  IconButton,
  Button,
  Divider,
  Radio,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ZipCodeModal from './ZipCodeModal';

function OptionsModal(props) {
  const { classes, open, setZip } = props;
  const [type, setType] = useState('Dog');
  const [age, setAge] = useState({
    baby: true,
    young: true,
    adult: true,
    senior: true,
  });
  const [location, setLocation] = useState('None');

  const handleType = (e) => {
    setType(e.target.value);
  };
  const handleAge = (e) => {
    setAge({ ...age, [e.target.name]: e.target.checked });
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const type = e.target.type.value;
    const location = e.target.location.value;
    console.log(type);
    console.log(age);
    console.log(location);
  };
  if (location !== 'Choose') {
    return (
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography variant='h5' align='center'>
            Options
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl margin='normal' required fullWidth>
              <FormLabel component='legend'>Type</FormLabel>
              <RadioGroup
                aria-label='type'
                name='type'
                value={type}
                onChange={handleType}
                row
              >
                <FormControlLabel value='Dog' control={<Radio />} label='Dog' />
                <FormControlLabel value='Cat' control={<Radio />} label='Cat' />
              </RadioGroup>
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <FormLabel component='legend'>Age</FormLabel>
              <FormGroup name='age' row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={age.baby}
                      onChange={handleAge}
                      name='baby'
                    />
                  }
                  label='Baby'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={age.young}
                      onChange={handleAge}
                      name='young'
                    />
                  }
                  label='Young'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={age.adult}
                      onChange={handleAge}
                      name='adult'
                    />
                  }
                  label='Adult'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={age.senior}
                      onChange={handleAge}
                      name='senior'
                    />
                  }
                  label='Senior'
                />
              </FormGroup>
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <FormLabel component='legend'>location</FormLabel>
              <RadioGroup
                aria-label='type'
                name='location'
                value={location}
                onChange={handleLocation}
                row
              >
                <FormControlLabel
                  value='None'
                  control={<Radio />}
                  label='None'
                />
                <FormControlLabel
                  value='Choose'
                  control={<Radio />}
                  label='Choose Location'
                />
              </RadioGroup>
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <FormLabel component='legend'>Distance</FormLabel>
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              //   color='primary'
              className={classes.submit}
              style={{ background: 'transparent', boxShadow: 'none' }}
            >
              FILTER RESULTS
            </Button>
          </form>
        </div>
      </Fade>
    );
  } else {
    return (<ZipCodeModal open={open} setZip={setZip} />)
  }
  
}

const styles = (theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

export default withStyles(styles)(OptionsModal);
