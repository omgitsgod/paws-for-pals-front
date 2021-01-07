import React, { useState, useEffect } from 'react';
import useGetPets from './useGetPets';
import TopNav from './TopNav';
import SpeedDialMenu from './SpeedDialMenu';
import PetCardContainer from './PetCardContainer';
import ModalContainer from './ModalContainer';
import './App.css';

function App() {
  const [type, setType] = useState('Dog');
  const [options, setOptions] = useState({});
  const [modal, setModal] = useState(true);
  console.log(options)
  const wakeUp = () => {
    fetch(process.env.REACT_APP_BACK_HOST);
  };
  const onClickActions = {
    changeLocation: () => setModal(true),
    getDogs: () => setType('Dog'),
    getCats: () => setType('Cat'),
  };
  useEffect(() => {
    wakeUp();
  }, []);

  return (
    <div className='App'>
      <TopNav />
      <header className='App-header'>
        {!modal ? (
          <PetCardContainer type={type} options={options} />
        ) : (
          <ModalContainer open={modal} setOpen={setModal} setOptions={setOptions} setAnimal={setType}/>
        )}
        <SpeedDialMenu onClickActions={onClickActions} />
      </header>
    </div>
  );
}

export default App;
