import React from 'react';
import { Typography, Icon, useMediaQuery, Button, Divider } from '@material-ui/core';
import { LocationOn as LocationIcon, Close as CloseIcon, Check as CheckIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated, to as interpolate } from 'react-spring';

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
    color:
      theme.palette.type === 'light' ? '#393535' : 'rgba(255, 255, 255, 0.7)',
  },
  card: {
    backgroundColor: theme.palette.type === 'light' ? 'white' : '#424242',
    padding: '5px',
    width: '45vh',
    overflow: 'hidden',
    maxWidth: '300px',
    height: '85vh',
    maxHeight: '570px',
    willChange: 'transform',
    color: 'black',
    borderRadius: '10px',
    boxShadow:
      theme.palette.type === 'light'
        ? '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)'
        : null,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderStyle: 'solid',
  },
  profileCard: {
    backgroundColor: theme.palette.type === 'light' ? 'white' : '#424242',
    padding: '20px',
    willChange: 'transform',
    color: 'black',
    borderRadius: '10px',
    boxShadow:
      theme.palette.type === 'light'
        ? '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)'
        : null,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderStyle: 'solid',
    overflow: 'scroll',
  },
  info: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
  },
  contact: {
    marginTop: theme.spacing(1),
  },
}));

function Card({ animate, card, source, spring }) {
  const classes = useStyles();
  const { name, distance, description, species, age, breeds, status, attributes, gender, size } = card;
  const { rot, scale, trans, bind, i, x, y } = spring || {};
  const photo = card.photos[0].full;
  const nameSpaceCount = name.split(' ').length - 1;
  const nameVariant = nameSpaceCount > 1 ? 'h5' : 'h4';
  const mobile = useMediaQuery('(max-width:600px)');
  const cardStyle = useSpring({
    from: { opacity: 0, width: '45vh' },
    to: {
      opacity: 1,
      width: mobile ? '50vh' : '85vh',
      height: mobile ? '87vh' : null,
      marginTop: mobile ? '6.5vh' : null,
    },
    leave: { opacity: 0, width: '45vh' },
  });
  const checkIcon = (bool) => (bool ? (<Icon color='action'><CheckIcon/></Icon>) : (<Icon color='error'><CloseIcon /></Icon>))

  const displayDeck = () => (
      <animated.div className={classes.organize} key={spring.i} style={{ x, y }}>
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
            <LocationIcon />
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
  const displayProfile = () => (
    <animated.div className={classes.profileCard} style={cardStyle}>
      <img src={photo} className={classes.img} alt='Pal' />
      <Typography variant={nameVariant} align='left'>
        {name}
      </Typography>
      <div className={classes.info}>
        <div>
          {distance ? (
            <Typography className={classes.distance} variant='h6' align='left'>
              <Icon>
                <LocationIcon />
              </Icon>
              {distance > 1 ? distance.toFixed(2) : '< 1'} miles away
            </Typography>
          ) : null}

          <Typography className={classes.description} align='left'>
            {description}
          </Typography>
          <Divider />
          <Button
            className={classes.contact}
            variant='contained'
            color='primary'
          >
            Contact me
          </Button>
        </div>
        <div style={{ marginTop: '-5vh' }}>
          <Typography align='right'>
            {breeds.primary}
            {breeds.secondary ? `/${breeds.secondary}` : null} -{' '}
            {age === 'Baby' ? (species === 'Dog' ? 'Puppy' : 'Kitten') : age}
          </Typography>
          <Typography align='right'>{size} sized {gender}</Typography>
          <Typography align='right'>{status}</Typography>
          <Typography align='right'>
            {checkIcon(attributes.house_trained)}House Trained
          </Typography>
          <Typography align='right'>
            {checkIcon(attributes.shots_current)}Shots Current
          </Typography>
          <Typography align='right'>
            {checkIcon(attributes.spayed_neutered)}Spayed/Neutered
          </Typography>
          <Typography align='right'>
            {checkIcon(attributes.special_needs)}Special Needs
          </Typography>
        </div>
      </div>
    </animated.div>
  );
  if (source === 'deck') {
    return displayDeck();
  }
  if (source === 'profile') {
    return displayProfile();
  }
};

export default Card;
