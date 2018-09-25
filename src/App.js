import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Leaderboard from './helpers/Leaderboard';
import ScoreInput from './components/ScoreInput';

class App extends Component {
  constructor() {

    super();

    this.state = {
      leaderboard: new Leaderboard
    }
  }

  render() {
    return (
      <div className="App">
        < ScoreInput />
      </div>
    );
  }
}

export default App;
