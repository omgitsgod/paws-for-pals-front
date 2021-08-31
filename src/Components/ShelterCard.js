import React, { useState, useEffect } from 'react';
import { Typography, Icon, useMediaQuery, Button, Divider, CircularProgress } from '@material-ui/core';
import { LocationOn as LocationIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import { useSpring, animated } from 'react-spring';
import { backHost } from '../config';

const useStyles = makeStyles((theme) => ({
  img: {
    height: '380px',
    width: '85%',
    userDrag: 'none',
  },
  profileImg: {
    height: '280px',
  },
  link: {
    textDecoration: 'none'
  },
  distance: {
    color: 'gray',
  },
  description: {
    color:
      theme.palette.type === 'light' ? '#393535' : 'rgba(255, 255, 255, 0.7)',
  },
  shelterCard: {
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
    gridGap: '5px',
  },
  contact: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
}));

function ShelterCard({ loadedShelter, id }) {
  const classes = useStyles();
  const [shelter, setShelter] = useState(loadedShelter || {});
  const nameSpaceCount = shelter.name?.split(' ').length - 1;
  const nameVariant = nameSpaceCount > 1 ? 'h5' : 'h4';
  const mobile = useMediaQuery('(max-width:600px)');
  const cardStyle = useSpring({
    from: { opacity: 0, width: '45vh' },
    to: {
      opacity: 1,
      width: mobile ? '50vh' : '85vh',
      height: mobile ? '100%' : null,
    },
    leave: { opacity: 0, width: '45vh' },
  });
  const handleHours = (days) => {
    const hours = []
    for (const day in days) {
      hours.push(days[day] ? (<Typography align='right' key={day}>{day}: {days[day]}</Typography>) : (<div key={day}><Typography component='span' align='right'>{day}: <Typography align='right' color='error' display='inline'>closed</Typography></Typography><br /></div>));
    }
    return hours;
  }

  useEffect(() => {
    const fetchShelter = async () => {
      const url = `${backHost}/shelter?id=${id}`;
      const data = await fetch(url).then((r) => r.json());
      setShelter(data);
    };
    if (!loadedShelter) {
      fetchShelter();
    }
  }, [loadedShelter, id]);

  return (
    <>
      {shelter.photos ? (
        <animated.div className={classes.shelterCard} style={cardStyle}>
          <Carousel navButtonsAlwaysVisible={shelter.photos?.length > 1}>
            {shelter.photos.map((image, i) => (
              <img
                key={i}
                src={image.full}
                className={classes.profileImg}
                alt='Shelter'
              />
            ))}
          </Carousel>
          <Typography variant={nameVariant} align='left'>
            {shelter.name}
          </Typography>
          <div className={classes.info}>
            <div>
              <Typography
                className={classes.distance}
                variant='h6'
                align='left'
              >
                <Icon>
                  <LocationIcon />
                </Icon>
                {shelter.distance ? (shelter.distance > 1 ? shelter.distance.toFixed(2) : '< 1') + ' miles away' : shelter.address.city ? `${shelter.address.city}, ${shelter.address.state}` : null}
              </Typography>
              <Typography className={classes.description} align='left'>
                {shelter.mission_statement}
              </Typography>
              <Divider />
              <Button
                className={classes.contact}
                variant='contained'
                color='primary'
              >
                View Pets
              </Button>
              <Button
                className={classes.contact}
                variant='contained'
                color='primary'
              >
                Contact me
              </Button>
            </div>
            <div>
              {handleHours(shelter.hours)}
            </div>
          </div>
        </animated.div>
      ) : (
        <CircularProgress
          style={{ marginTop: '40vh', height: '80px', width: '80px' }}
        />
      )}
    </>
  );
}
export default ShelterCard;
