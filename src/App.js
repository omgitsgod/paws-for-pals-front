import React, { useState } from 'react';
import { Backdrop } from '@material-ui/core'
import TopNav from './TopNav';
import SpeedDialMenu from './SpeedDialMenu';
import logo from './paws.png';
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
        <img src={logo} className='App-logo' data-testid='paws' alt='paws' />
        <p>paws for pals</p>
      </header>
      <SpeedDialMenu handleBackdrop={handleBackdrop} />
    </div>
  );
}

export default App;
