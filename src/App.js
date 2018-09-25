import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Leaderboard from './helpers/Leaderboard';
import ScoreInput from './components/ScoreInput';

class App extends Component {
  constructor() {

    super();

    this.state = {
      leaderboard: new Leaderboard,
      currentPlayerID: null,
      currentPlayerAverage: null,
    }
  }

  handleScoreSubmit = event => {

    event.preventDefault();
    const playerID = parseInt(event.target.getElementsByTagName("input")[0].value)
    const score = parseInt(event.target.getElementsByTagName("input")[1].value)
    const average = this.state.leaderboard.addScore(playerID, score)
    this.setState({
      currentPlayerID: playerID,
      currentPlayerAverage: average
    })
  }

  render() {
    return (
      <div className="App">
        < ScoreInput handleSubmit={this.handleScoreSubmit} playerID={this.state.currentPlayerID} average={this.state.currentPlayerAverage}/>
      </div>
    );
  }
}

export default App;
