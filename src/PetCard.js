import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { animated, to as interpolate } from 'react-spring';

const useStyles = makeStyles((theme) => ({
  organize: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    willChange: 'transform',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    backgroundSize: 'auto 85%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: '45vh',
    maxWidth: '300px',
    height: '85vh',
    maxHeight: '570px',
    willChange: 'transform',
    borderRadius: '10px',
    boxShadow: '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
  }
}));

const PetCard = ({ i, x, y, rot, scale, trans, bind, cards }) => {
  const classes = useStyles();
  const card = cards[i];
  return (
    <animated.div className={classes.organize} key={i} style={{ x, y }}>
      <animated.div
        className={classes.card}
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
          backgroundImage: `url(${card})`,
        }}
      />
    </animated.div>
  );
};

export default PetCard;
