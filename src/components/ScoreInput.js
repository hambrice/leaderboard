import React from 'react';

const ScoreInput = props =>
  <div className = "score-input">
    <h3>Input the unique player ID for a new or existing player and their latest score. </h3>
    <form onSubmit={props.handleSubmit}>
      <label>Player ID</label>
      <input type="number" name="player-id" />
      <label>Latest Score</label>
      <input type="number" name="score" />
      <input type="submit" value="Submit Score" />
    </form>

    {props.playerID ? < DisplayPlayerAverage playerID={props.playerID} average={props.average} /> : null}

  </div>

  const DisplayPlayerAverage = props =>

  <div className="player-average">
  <h5>Currently, player number {props.playerID} has an average score of {props.average} </h5>
  </div>

export default ScoreInput;
