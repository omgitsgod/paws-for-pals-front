import React, { useState, useEffect, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteCard from './FavoriteCard';
import { backHost } from '../config';

const useStyles = makeStyles({
  organize: {
    width: '100vw',
    height: '80vh',
    willChange: 'transform',
    display: 'flex',
    marginTop: '10vh',
    overflow: 'scroll',
  },
});

function FavoriteContainer({ handleFavoritePet, setPet, isAuthenticated }) {
  const classes = useStyles();
  const [favorites, setFavorites] = useState([]);
  const fetchFavorites = useMemo(() => isAuthenticated ? async () => {
    const url = `${backHost}/get_favorites`;
    const data = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    }).then((r) => r.json());
    console.log('favorites', data);
    setFavorites(data);
  } : async () => {
    let favorites = JSON.parse(localStorage.getItem('favorites'))
    if (favorites) {
    setFavorites(favorites);
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated])
  useEffect( () => {
    fetchFavorites();
  }, [fetchFavorites])
  const favoriteCards = favorites.map((fav) => (
    <FavoriteCard fav={fav} key={fav.id} fetchFavorites={fetchFavorites} handleFavoritePet={handleFavoritePet} setPet={setPet} isAuthenticated={isAuthenticated} />
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