import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { backHost } from '../config';

const useStyles = makeStyles({
  organize: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    willChange: 'transform',
    display: 'flex',
    marginTop: '20vh',
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
  return (
    <div className={classes.organize}>
      <Grid container spacing={3}>
        {favorites.map((fav) => (
          <Grid item xs={12} sm={3}>
          <img src={fav.primary_photo_cropped.small} key={fav.id} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FavoriteContainer;