import React from 'react';
import './App.css';
import AlbumList from './components/AlbumList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Metacritic's Music Albums</h1>
      </header>
      <main>
        <AlbumList/>
      </main>
    </div>
  );
}

export default App;
