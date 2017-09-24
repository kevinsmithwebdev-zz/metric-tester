import React, { Component } from 'react';
import './index.css';

import Header from './Header';
import Game from './Game';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Game />
        <Footer />
      </div>
    );
  }
}

export default App;
