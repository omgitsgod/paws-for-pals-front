import React, { useState, useEffect } from 'react';
import useGetPets from './useGetPets';
import TopNav from './TopNav';
import SpeedDialMenu from './SpeedDialMenu';
import PetCardContainer from './PetCardContainer';
import ZipCodeModal from './ZipCodeModal';
import './App.css';

function App() {
  const [zip, setZip] = useState('');
  const [type, setType] = useState('Dog');
  const [openZip, setOpenZip] = useState(true);
  const wakeUp = () => {
    fetch(process.env.REACT_APP_BACK_HOST);
  };
  const onClickActions = {
    changeLocation: () => setZip(''),
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
        {zip.length ? (
          <PetCardContainer zip={zip} type={type} />
        ) : (
          <ZipCodeModal open={openZip} setOpen={setOpenZip} setZip={setZip} />
        )}
        <SpeedDialMenu onClickActions={onClickActions} />
      </header>
    </div>
  );
}

export default App;
