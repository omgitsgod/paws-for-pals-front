import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import SpeedDialMenu from './SpeedDialMenu';
import BottomNav from './BottomNav'
import PetCardContainer from './PetCardContainer';
import ModalContainer from './ModalContainer';
import '../App.css';
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
  const [pet, setPet] = useState({});

  console.log(options)
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
    const less = data.length - 1 - liked - disliked;
    console.log('less: ', less)
    setPet(less >= 0 ? data[less] : {})
  }
  const onClickActions = {
    changeOptions: () => setModal(true),
    getDogs: () => setOptions({...options, type: 'Dog'}),
    getCats: () => setOptions({...options, type: 'Cat'}),
  };
  useEffect(() => {
    removeHash();
    handleLogin();
  }, []);
  console.log(selected)
  return (
    <div className='App'>
      {!modal ? (
        <TopBar
          isAuthenticated={isAuthenticated}
          user={user}
          handleLogout={handleLogout}
        />
      ) : null}
      <header className='Content'>
        {!modal ? (
          <PetCardContainer
            key={options.type}
            type={options.type}
            options={options}
            handlePet={handlePet}
            pet={pet}
            selected={selected}
          />
        ) : (
          <ModalContainer
            open={modal}
            setOpen={setModal}
            setOptions={setOptions}
            initialOptions={options}
          />
        )}
        <SpeedDialMenu onClickActions={onClickActions} />
      </header>
      <BottomNav selected={selected} setSelected={setSelected} pet={pet} />
    </div>
  );
}

export default App;
