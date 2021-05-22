import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { List, Store, Favorite, Pets as PetIcon } from '@material-ui/icons';
import DogIcon from '../DogIcon';
import CatIcon from '../CatIcon';

const useStyles = makeStyles(theme => ({
  nav: {
    width: '100%',
    bottom: theme.spacing(0),
    position: 'fixed',
  },
}));

function BottomNav({ selected, setSelected, pet }) {
  const classes = useStyles();

  const petIconDisplay = (type) => {
    let icon
    switch (type) {
      case 'Dog':
        icon = (<DogIcon />);
        break;
      case 'Cat':
        icon = (<CatIcon />);
        break;
      default:
        icon = (<PetIcon />);
        break;
    }
    return icon
  } 
  
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
      <BottomNavigationAction label='Pet' value='pet' icon={petIconDisplay(pet.type)} onClick={() => console.log(pet)} />
      <BottomNavigationAction label='Shelter' value='shelter' icon={<Store />} onClick={() => console.log(pet)} />
      <BottomNavigationAction label='Favorites' value='favorites' icon={<Favorite />} />
    </BottomNavigation>
  );
}

export default BottomNav;
