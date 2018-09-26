import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Leaderboard from './helpers/Leaderboard';
import ScoreInput from './components/ScoreInput';
import RankInput from './components/PlayerRank';
import ResetPlayer from './components/ResetPlayer';
import NavBar from './components/NavBar';

class App extends Component {
  constructor() {

    super();

    this.state = {
      leaderboard: new Leaderboard,
      currentPlayerID: null,
      currentPlayerAverage: null,
      currentRankings: null,
      firstScoreEntered: false,
      resetValid: null
    }
  }

  handleScoreSubmit = event => {

    event.preventDefault();
    const playerID = parseInt(event.target.getElementsByTagName("input")[0].value)
    const score = parseInt(event.target.getElementsByTagName("input")[1].value)
    const average = this.state.leaderboard.addScore(playerID, score)
    this.setState({
      currentPlayerID: playerID,
      currentPlayerAverage: average,
      firstScoreEntered: true
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

  handleResetSubmit = event => {

    event.preventDefault();
    const playerReset = parseInt(event.target.getElementsByTagName("input")[0].value)
    this.state.leaderboard.reset(playerReset)
    this.setState({
      resetValid: "is-valid"
    })
  }

  handleResetChange = event => {

    const playerID = parseInt(event.target.value)

    if (!this.state.leaderboard.players[playerID] && playerID) {
      this.setState({
        resetValid: "is-invalid"
      })
      document.getElementById("resetSubmit").disabled = true;
    } else {
      this.setState({
        resetValid: null
      })
      document.getElementById("resetSubmit").disabled = false;
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        < ScoreInput handleSubmit={this.handleScoreSubmit} playerID={this.state.currentPlayerID} average={this.state.currentPlayerAverage}/>
        {this.state.firstScoreEntered ?
          <div>
        < RankInput handleSubmit={this.handleRankSubmit} rankings={this.state.currentRankings} />
        < ResetPlayer handleSubmit={this.handleResetSubmit} handleChange={this.handleResetChange} inputValid={this.state.resetValid}/>
        </div>
        : null
        }
      </div>
    );
  }
}

export default App;
