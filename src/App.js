import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import SpeedDialMenu from './SpeedDialMenu';
import PetCardContainer from './PetCardContainer';
import ModalContainer from './ModalContainer';
import './App.css';

function App() {
  const [options, setOptions] = useState({
    type: 'Dog',
    age: {
      baby: true,
      young: true,
      adult: true,
      senior: true,
    },
  });
  const [modal, setModal] = useState(true);
  console.log(options)
  const wakeUp = () => {
    fetch(process.env.REACT_APP_BACK_HOST);
  };
  const onClickActions = {
    changeOptions: () => setModal(true),
    getDogs: () => setOptions({...options, type: 'Dog'}),
    getCats: () => setOptions({...options, type: 'Cat'}),
  };
  useEffect(() => {
    wakeUp();
  }, []);

  return (
    <div className='App'>
      {!modal ? <TopBar /> : null}
      <header className='Content'>
        {!modal ? (
          <PetCardContainer key={options.type} type={options.type} options={options} />
        ) : (
          <ModalContainer open={modal} setOpen={setModal} setOptions={setOptions} initialOptions={options} />
        )}
        <SpeedDialMenu onClickActions={onClickActions} />
      </header>
    </div>
  );
}

export default App;
