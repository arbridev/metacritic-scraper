import React from 'react';

import store from './storage/store';
import { Provider } from 'react-redux';
import AlbumList from './components/AlbumList';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Globalized store

console.log("Initial store state:", store.getState());
store.subscribe(() => console.log(store.getState()));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Metacritic's Music Albums</h1>
          <h2>Filterer</h2>
        </header>
        <main>
          <AlbumList/>
        </main>
      </div>
    </Provider>
  );
}

export default App;
