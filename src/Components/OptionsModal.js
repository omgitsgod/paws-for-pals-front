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
  IconButton,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ZipCodeModal from './ZipCodeModal';
import { dogBreeds, catBreeds } from '../config';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function OptionsModal({ open, setOpen, setOptions, initialOptions }) {
  const classes = useStyles();
  const [type, setType] = useState(initialOptions.type);
  const [age, setAge] = useState(initialOptions.age);
  const [locationType, setLocationType] = useState(initialOptions.location ? 'Zip' : 'Any');
  const [location, setLocation] = useState(initialOptions.location ? initialOptions.location : null);
  const [breeds, setBreeds] = useState(initialOptions.breed ? initialOptions.breed : []);

  const handleType = (e) => {
    setType(e.target.value);
  };
  const handleAge = (e) => {
    setAge({ ...age, [e.target.name]: e.target.checked });
  };
  const handleLocationType = (e) => {
    const value = e.target?.value || e
    console.log(value)
    setLocationType(value);
    if (value === 'Any') {
      setLocation(null);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const tempOptions = {};
    const type = e.target.type.value;
    tempOptions.type = type;
    tempOptions.age = age;
    if (location) {
      tempOptions.location = location;
    }
    if (e.target.distance) {
      tempOptions.distance = e.target.distance.value;
    }
    if (breeds.length > 0) {
      tempOptions.breed = breeds
    }
    setOptions(tempOptions);
    localStorage.setItem('options', JSON.stringify(tempOptions));
    console.log(tempOptions);
    setOpen(false);
  };
  const handleLocation = (e) => {
    setLocation(e);
    setLocationType('Zip');
  };
  const handleBreed = (x, breed) => {
   (dogBreeds.includes(breed) || catBreeds.includes(breed)) && setBreeds((breeds) => [...breeds, breed]);
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
          <IconButton
            aria-label='close'
            aria-controls='close'
            aria-haspopup='true'
            onClick={() => setOpen(false)}
            style={{ float: 'right' }}
          >
            <CloseIcon />
          </IconButton>
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
            {breeds.length < 5 ? (
              <FormControl margin='normal' fullWidth>
                <FormLabel component='legend'>Breed</FormLabel>
                <Autocomplete
                  autoComplete
                  key={breeds[breeds.length -1] || ''}
                  autoHighlight
                  options={type === 'Dog' ? dogBreeds : catBreeds}
                  onInputChange={handleBreed}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            ) : (
              <Typography
              >
                Please remove a selection to add more breeds!
              </Typography>
            )}
            {breeds.map(
              (breed, i) =>
                breed && (
                  <Typography
                    color='secondary'
                    display='inline'
                    variant='subtitle1'
                    key={i}
                    onClick={() =>
                      setBreeds((breeds) => breeds.filter((x) => x !== breed))
                    }
                  >
                    {breed}
                    {breeds.length > 0 && i < breeds.length - 1 && ', '}
                  </Typography>
                )
            )}
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
            {locationType === 'Zip' ? (
              <FormControl margin='normal' required fullWidth>
                <FormLabel component='legend'>Distance</FormLabel>
                <Slider
                  defaultValue={
                    initialOptions.distance
                      ? parseInt(initialOptions.distance)
                      : 10
                  }
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
            <div style={{ textAlign: 'center' }}>
              <Button
                type='submit'
                variant='outlined'
                className={classes.submit}
                style={{ background: 'transparent', boxShadow: 'none' }}
              >
                FIND MY PAL
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    );
  } else {
    return <ZipCodeModal open={open} handleLocation={handleLocation} handleLocationType={handleLocationType} />;
  }
}

export default OptionsModal;
