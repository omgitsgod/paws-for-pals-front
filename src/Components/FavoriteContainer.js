import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteCard from './FavoriteCard';
import { backHost } from '../config';

const useStyles = makeStyles({
  organize: {
    width: '100vw',
    height: '100vh',
    willChange: 'transform',
    display: 'flex',
    marginTop: '10vh',
    justifyContent: 'center',
    overflow: 'scroll',
  },
});

function FavoriteContainer() {
  const classes = useStyles();
  const [favorites, setFavorites] = useState([]);
  const fetchFavorites = async () => {
    const url = `${backHost}/get_favorites`;
    const data = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((r) => r.json());
    console.log('favorites', data);
    setFavorites(data);
  }
  useEffect( () => {
    fetchFavorites();
  }, [])
  const favoriteCards = favorites.map((fav) => (
    <FavoriteCard fav={fav} key={fav.id} fetchFavorites={fetchFavorites} />
  ));
  
  return (
    <div className={classes.organize}>
      <Grid container spacing={3}>
        {favoriteCards}
      </Grid>
    </div>
  );
}

export default FavoriteContainer;