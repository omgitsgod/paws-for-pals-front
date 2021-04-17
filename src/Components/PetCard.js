import React from 'react';
import { Typography, Icon } from '@material-ui/core';
import LocationOn from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';
import { animated, to as interpolate } from 'react-spring';

const useStyles = makeStyles((theme) => ({
  organize: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    willChange: 'transform',
    display: 'flex',
    marginTop: '20vh',
    justifyContent: 'center',
  },
  img: {
    height: '380px',
    width: '85%',
    userDrag: 'none',
  },
  distance: {
    color: 'gray',
  },
  description: {
    color: theme.palette.type === 'light' ? '#393535' :'rgba(255, 255, 255, 0.7)'
  },
  card: {
    backgroundColor: theme.palette.type === 'light' ? 'white' : '#424242',
    padding: '5px',
    width: '45vh',
    maxWidth: '300px',
    height: '85vh',
    maxHeight: '570px',
    willChange: 'transform',
    color: 'black',
    borderRadius: '10px',
    boxShadow:
      '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
  },
}));

const PetCard = ({ i, x, y, rot, scale, trans, bind, cards }) => {
  const classes = useStyles();
  const card = cards[i];
  const photo = card.photos[0].full;
  const { name, distance, description } = card;
  const nameSpaceCount = name.split(' ').length - 1;
  const nameVariant = nameSpaceCount > 1 ? 'h5' : 'h4';

  return (
    <animated.div className={classes.organize} key={i} style={{ x, y }}>
      <animated.div
        className={classes.card}
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
        }}
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
      </animated.div>
    </animated.div>
  );
};

export default PetCard;
