import React from 'react';
import logo from './paws.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" data-testid="paws" alt="paws" />
        <p>
          paws for pals
        </p>
      </header>
    </div>
  );
}

export default App;
