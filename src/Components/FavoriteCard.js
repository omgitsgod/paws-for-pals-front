import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, a } from '@react-spring/web';
import { backHost } from '../config';

const useStyles = makeStyles({
  card: {
    cursor: 'pointer',
    willChange: 'transform, opacity',
    margin: '20px',
  },
  back: {
    backgroundSize: 'cover',
    backgroundImage: (fav) => `url(${fav.primary_photo_cropped.small})`,
    height: '380px',
    width: '85%',
  },
  front: {
    backgroundSize: 'cover',
    backgroundImage: (fav) =>
      `linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(${fav.primary_photo_cropped.small})`,
    height: '380px',
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: '10%',
  },
});

function FavoriteCard({ fav, fetchFavorites, handleFavoritePet, setPet }) {
  const classes = useStyles(fav);
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  const deleteFavorite = async () => {
    const url = `${backHost}/delete_favorite?id=${fav.id}`;
    const data = await fetch(url, {
      method: 'POST',
      credentials: 'include',
    }).then(fetchFavorites);
  };
  const deleteFavoriteUnauth = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const filteredFavorites = favorites.map((item) => (item = JSON.parse(item))).filter((item) => item.id !== fav.id);
    const stringifiedFavorites = JSON.stringify(filteredFavorites);
    localStorage.setItem('favorites', stringifiedFavorites);
  };
  return (
    <Grid item xs={12} sm={3}>
        {!flipped ? (
          <a.div
            className={`${classes.card} ${classes.back}`}
            style={{ opacity: opacity.to((o) => 1 - o), transform }}
            onClick={() => setFlipped((state) => {
              setPet(fav);
              return !state})}
          ></a.div>
        ) : (
          <a.div
            className={`${classes.card} ${classes.front}`}
            style={{
              opacity,
              transform,
              rotateX: '180deg',
            }}
            onClick={() => setFlipped((state) => !state)}
          >
            <Button className={classes.button} variant='contained' color='primary' onClick={()=> handleFavoritePet(fav)}>View Pet</Button>
            <Button className={classes.button} variant='contained' color='primary' onClick={()=>console.log('view shelter')}>View Shelter</Button>
            <Button className={classes.button} variant='contained' color='primary' onClick={deleteFavorite}>Delete</Button>
          </a.div>
        )}
    </Grid>
  );
}

export default FavoriteCard;
