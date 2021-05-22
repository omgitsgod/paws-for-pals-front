import React, { useState, useEffect } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import GlobalStyles from '../GlobalStyles';
import useDarkMode from '../hooks/useDarkMode';
import TopBar from './TopBar';
import SpeedDialMenu from './SpeedDialMenu';
import BottomNav from './BottomNav'
import PetCardContainer from './PetCardContainer';
import FavoriteContainer from './FavoriteContainer';
import ShelterCard from './ShelterCard';
import ModalContainer from './ModalContainer';
import { dark, light } from '../theme';
import { backHost, removeHash } from '../config';


function App() {
  const [options, setOptions] = useState(localStorage.getItem('options') ? JSON.parse(localStorage.getItem('options')) : {
    type: 'Dog',
    age: {
      baby: true,
      young: true,
      adult: true,
      senior: true,
    },
  });
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modal, setModal] = useState(localStorage.getItem('options') ? false : true);
  const [selected, setSelected] = useState('list');
  const [shelters, setShelters] = useState([])
  const [pet, setPet] = useState({});
  const [darkMode, setDarkMode] = useDarkMode();
  const theme = createMuiTheme(darkMode ? dark : light);

  const login = (user) => {
    setUser(user);
    setIsAuthenticated(true);
    console.log('currently logged in as: ', user.name);
  };
  const handleLogin = async () => {
    const user = await fetch(backHost, {
      method: 'GET',
      credentials: 'include',
    }).then((r) => r.json());
    if (user.email) {
      login(user);
    }
  };
  const handleLogout = () => {
    fetch(`${backHost}/logout`, {
      method: 'GET',
      credentials: 'include',
    });
    setIsAuthenticated(false);
    setUser(null);
  };
  const handlePet = (data, liked, disliked) => {
    if (selected === 'list') {
      const less = data.length - 1 - liked - disliked;
      console.log('less: ', less);
      setPet(less >= 0 ? data[less] : {});
    }
  };
  const handleFavoritePet = (view, fav) => {
    setSelected(view);
    setPet(fav);
  }
  const handleShelters = async (ids) => {
    console.log('ids', ids)
    const results = await fetch(`${backHost}/shelters?ids=${JSON.stringify([...ids])}`).then(r => r.json());
    setShelters(results);
  }
  const handleLoadedShelter =
    shelters.length > 0 &&
    shelters.filter((x) => x.id === pet.organization_id)[0];
  const onClickActions = {
    changeOptions: () => setModal(true),
    getDogs: () => setOptions({...options, type: 'Dog'}),
    getCats: () => setOptions({...options, type: 'Cat'}),
  };
  const displaySwitch = (view) => {
    let result
    switch(view) {
      case 'list':
        return (
          <PetCardContainer
            key={options.type}
            type={options.type}
            options={options}
            handlePet={handlePet}
            pet={pet}
            selected={selected}
            isAuthenticated={isAuthenticated}
            handleShelters={handleShelters}
          />
        );
      case 'pet':
        return (
          <PetCardContainer
            key={options.type}
            type={options.type}
            options={options}
            handlePet={handlePet}
            pet={pet}
            selected={selected}
            isAuthenticated={isAuthenticated}
          />
        );
      case 'favorites':
        return (
          <FavoriteContainer
            handleFavoritePet={handleFavoritePet}
            setPet={setPet}
            isAuthenticated={isAuthenticated}
          />
        );
      case 'shelter':
        return (
          <ShelterCard loadedShelter={handleLoadedShelter} id={pet.organization_id}/>
        )
    }
    return result
  }
  useEffect(() => {
    removeHash();
    handleLogin();
  }, []);
  console.log(selected)
  console.log(theme)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className='App'>
        {!modal ? (
          <TopBar
            isAuthenticated={isAuthenticated}
            user={user}
            handleLogout={handleLogout}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        ) : null}
        <div className='Content'>
          {modal ? (
            <ModalContainer
              open={modal}
              setOpen={setModal}
              setOptions={setOptions}
              initialOptions={options}
            />) : displaySwitch(selected)}
          <SpeedDialMenu onClickActions={onClickActions} />
        </div>
        <BottomNav selected={selected} setSelected={setSelected} pet={pet} />
      </div>
    </ThemeProvider>
  );
}

export default App;
