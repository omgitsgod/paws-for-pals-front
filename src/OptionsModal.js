import React, { useState } from 'react';
import {
  Typography,
  Fade,
  FormControl,
  FormLabel,
  RadioGroup,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Button,
  Radio,
  Slider,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ZipCodeModal from './ZipCodeModal';

function OptionsModal(props) {
  const { classes, open, setOpen, setOptions, setAnimal } = props;
  const [type, setType] = useState('Dog');
  const [age, setAge] = useState({
    baby: true,
    young: true,
    adult: true,
    senior: true,
  });
  const [locationType, setLocationType] = useState('Any');
  const [location, setLocation] = useState(null);

  const handleType = (e) => {
    setType(e.target.value);
  };
  const handleAge = (e) => {
    setAge({ ...age, [e.target.name]: e.target.checked });
  };
  const handleLocationType = (e) => {
    setLocationType(e.target.value);
  };
  const handleAgeString = (input) => {
    let age = '';
    for (const entry in input) {
      if (input[entry]) {
        age += `${entry},`;
      }
    }
    return age.slice(0, -1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const tempOptions = {};
    const type = e.target.type.value;
    const ageString = handleAgeString(age);
    tempOptions.age = ageString;
    if (location) {
      tempOptions.location = location;
    }
    if (e.target.distance) {
      tempOptions.distance = e.target.distance.value;
    }
    setOptions(tempOptions);
    setAnimal(type);
    console.log(tempOptions);
    setOpen(false);
  };
  const handleLocation = (e) => {
    setLocation(e);
    setLocationType('Zip');
  };
  const valueText = (value) => {
    return `${value} miles`;
  };
  const marks = [
    {
      value: 10,
      label: 10,
    },
    {
      value: 20,
      label: 20,
    },
    {
      value: 30,
      label: 30,
    },
    {
      value: 40,
      label: 40,
    },
    {
      value: 50,
      label: 50,
    },
    {
      value: 60,
      label: 60,
    },
    {
      value: 70,
      label: 70,
    },
    {
      value: 80,
      label: 80,
    },
    {
      value: 90,
      label: 90,
    },
    {
      value: 100,
      label: 100,
    },
  ];
  if (locationType !== 'Choose') {
    return (
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography variant='h5' align='center'>
            paws for pals
          </Typography>
          <Typography variant='h6' align='center'>
            find your new best friend
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
                aria-label='location'
                name='location'
                value={locationType}
                onChange={handleLocationType}
                row
              >
                <FormControlLabel value='Any' control={<Radio />} label='Any' />
                {location && locationType === 'Zip' ? (
                  <FormControlLabel
                    value='Zip'
                    control={<Radio />}
                    label={location}
                  />
                ) : (
                  <FormControlLabel
                    value='Choose'
                    control={<Radio />}
                    label='Choose Location'
                  />
                )}
              </RadioGroup>
            </FormControl>
            {locationType == 'Zip' ? (
              <FormControl margin='normal' required fullWidth>
                <FormLabel component='legend'>Distance</FormLabel>
                <Slider
                  defaultValue={10}
                  getAriaValueText={valueText}
                  name='distance'
                  aria-labelledby='distance'
                  valueLabelDisplay='auto'
                  step={5}
                  marks={marks}
                  min={5}
                  max={100}
                />
              </FormControl>
            ) : null}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              //   color='primary'
              className={classes.submit}
              style={{ background: 'transparent', boxShadow: 'none' }}
            >
              FIND MY PAL
            </Button>
          </form>
        </div>
      </Fade>
    );
  } else {
    return <ZipCodeModal open={open} setZip={handleLocation} />;
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