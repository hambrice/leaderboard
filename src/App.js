import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Leaderboard from './helpers/Leaderboard';
import ScoreInput from './components/ScoreInput';
import RankInput from './components/PlayerRank';

class App extends Component {
  constructor() {

    super();

    this.state = {
      leaderboard: new Leaderboard,
      currentPlayerID: null,
      currentPlayerAverage: null,
      currentRankings: null
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

  handleRankSubmit = event => {

    event.preventDefault();
    const rankAmount = parseInt(event.target.getElementsByTagName("input")[0].value)
    const rankings = this.state.leaderboard.top(rankAmount)
    this.setState({
      currentRankings: rankings
    })
  }

  render() {
    return (
      <div className="App">
        < ScoreInput handleSubmit={this.handleScoreSubmit} playerID={this.state.currentPlayerID} average={this.state.currentPlayerAverage}/>
        < RankInput handleSubmit={this.handleRankSubmit} rankings={this.state.currentRankings} />
      </div>
    );
  }
}

export default App;
