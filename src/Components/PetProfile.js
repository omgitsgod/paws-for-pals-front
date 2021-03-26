import React from 'react';
import { Typography, Icon } from '@material-ui/core';
import LocationOn from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  img: {
    height: '380px',
    width: '85%',
    userDrag: 'none',
  },
  distance: {
    color: 'gray',
  },
  description: {
    color: '#393535',
  },
  card: {
    backgroundColor: 'white',
    padding: '5px',
    width: '95%',
    maxWidth: '95%',
    height: '85vh',
    maxHeight: '570px',
    willChange: 'transform',
    color: 'black',
    borderRadius: '10px',
    boxShadow:
      '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
  },
}));

const PetProfile = ({ pet }) => {
  const classes = useStyles();
  const photo = pet.photos[0].full;
  const { name, distance, description } = pet;
  const nameSpaceCount = name.split(' ').length - 1;
  const nameVariant = nameSpaceCount > 1 ? 'h5' : 'h4';

  return (
      <div
        className={classes.card}
      >
        <img src={photo} className={classes.img} alt='Pal' />
        <Typography variant={nameVariant} align='left'>
          {name}
        </Typography>
        {distance ? (
          <Typography className={classes.distance} variant='h6' align='left'>
            <Icon>
              <LocationOn />
            </Icon>
            {distance > 1 ? distance.toFixed(2) : '< 1'} miles away
          </Typography>
        ) : null}

        <Typography className={classes.description} align='left'>
          {description}
        </Typography>
      </div>
  );
};

export default PetProfile;
