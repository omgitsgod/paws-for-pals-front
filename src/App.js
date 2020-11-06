import React, { useState, useEffect } from 'react';
import { Backdrop } from '@material-ui/core'
import TopNav from './TopNav';
import SpeedDialMenu from './SpeedDialMenu';
import PetCardContainer from './PetCardContainer';
import ZipCodeModal from './ZipCodeModal';
import './App.css';

function App() {
  const [backdropStatus, setBackdropStatus] = useState(false);
  const [zip, setZip] = useState('');
  const [openZip, setOpenZip] = useState(true);
  const handleBackdrop = (bool) => {
    setBackdropStatus(bool);
  };
  const wakeUp = () => {
    fetch(process.env.REACT_APP_BACK_HOST)
  }
  const onClickActions = {
    changeLocation: () => setZip(''),
    getDogs: () => console.log('dogs'),
    getCats: () => console.log('cats'),
  }

  useEffect(() => {
    wakeUp()
  }, [])
  return (
    <div className='App'>
      <Backdrop open={backdropStatus} />
      <TopNav />
      <header className='App-header'>
        {zip.length ? <PetCardContainer zip={zip}/> : <ZipCodeModal open={openZip} setOpen={setOpenZip} setZip={setZip}/>}
        <SpeedDialMenu handleBackdrop={handleBackdrop} onClickActions={onClickActions} />
      </header>
    </div>
  );
}

export default App;
