import React, { useState } from 'react';
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
  return (
    <div className='App'>
      <Backdrop open={backdropStatus} />
      <TopNav />
      <header className='App-header'>
        {zip.length ? <PetCardContainer zip={zip}/> : <ZipCodeModal open={openZip} setZip={setZip}/>}
        <SpeedDialMenu handleBackdrop={handleBackdrop} />
      </header>
    </div>
  );
}

export default App;
