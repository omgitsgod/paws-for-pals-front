import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { List, Store, Favorite } from '@material-ui/icons';
import DogIcon from '../DogIcon';
import CatIcon from '../CatIcon';

const useStyles = makeStyles({
  nav: {
    width: 500,
    bottomMargin: -30,
    positon: 'fixed',
    backgroundColor: '#282c34',
  },
});

function BottomNav({ selected, setSelected, pet }) {
  const classes = useStyles();
  
  return (
    <BottomNavigation
      value={selected}
      onChange={(event, newValue) => {
        setSelected(newValue);
      }}
      showLabels
      className={classes.nav}
    >
      <BottomNavigationAction label='List' value='list' icon={<List />} onClick={() => console.log(pet)} />
      <BottomNavigationAction label='Pet' value='pet' icon={pet.type === 'Dog' ? <DogIcon /> : <CatIcon />} onClick={() => console.log(pet)} />
      <BottomNavigationAction label='Shelter' value='shelter' icon={<Store />} onClick={() => console.log(pet)} />
      <BottomNavigationAction label='Favorites' value='favorites' icon={<Favorite />} />
    </BottomNavigation>
  );
}

export default BottomNav;
