import React, { useState } from 'react';
import { Backdrop } from '@material-ui/core'
import TopNav from './TopNav';
import SpeedDialMenu from './SpeedDialMenu';
import PetCardContainer from './PetCardContainer';
import './App.css';

function App() {
  const [backdropStatus, setBackdropStatus] = useState(false)
  const handleBackdrop = (bool) => {
    setBackdropStatus(bool);
  };
  return (
    <div className='App'>
      <Backdrop open={backdropStatus} />
      <TopNav />
      <header className='App-header'>
        <PetCardContainer />
        <SpeedDialMenu handleBackdrop={handleBackdrop} />
      </header>
    </div>
  );
}

export default App;
