import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { animated } from 'react-spring';
import Card from './Card';

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
}));

const PetCard = ({ i, x, y, rot, scale, trans, bind, cards }) => {
  const classes = useStyles();
  const card = cards[i];
  const spring = {rot, scale, trans, bind, i, x, y}

  return (
    <Card card={card} source='deck' spring={spring} />
  );
};

export default PetCard;
